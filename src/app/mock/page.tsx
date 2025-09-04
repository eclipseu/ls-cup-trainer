"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { questionsData, type Question } from "../practice/questionsData";
import { getMockDataClient } from "@/lib/data.client";
import { usePracticeState } from "../practice/hooks/usePracticeState";

type ChecklistKey = "clarity" | "structure" | "relevance" | "confidence";

interface Evaluation {
  [questionId: number]: Partial<Record<ChecklistKey, boolean>>;
}

const ONE_MINUTE = 60;

function pickRandomQuestions(source: Question[], count: number): Question[] {
  const copy = [...source];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default function MockSessionPage() {
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(ONE_MINUTE);
  const [running, setRunning] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<Evaluation>({});
  const timerRef = useRef<number | null>(null);
  const [mockQuestions, setMockQuestions] = useState<Question[] | null>(null);
  const { customQuestions } = usePracticeState();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordings, setRecordings] = useState<Record<number, string>>({});

  const currentQuestion = useMemo(
    () => sessionQuestions[currentIndex] || null,
    [sessionQuestions, currentIndex]
  );

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    timerRef.current = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [running, timeLeft]);

  // Load custom mock questions from Supabase
  useEffect(() => {
    (async () => {
      const data = await getMockDataClient();
      if (data && Array.isArray(data.mockQuestions)) {
        setMockQuestions(data.mockQuestions as Question[]);
      } else {
        setMockQuestions([]);
      }
    })();
  }, []);

  const startSession = () => {
    const count = Math.min(Math.max(questionCount, 3), 5);
    // Build available questions: prefer mockQuestions if present; always include user's customQuestions
    const base =
      mockQuestions && mockQuestions.length > 0 ? mockQuestions : questionsData;
    const mergedMap = new Map<number, Question>();
    base.forEach((q) => mergedMap.set(q.id, q));
    (customQuestions || []).forEach((q) => mergedMap.set(q.id, q));
    const available = Array.from(mergedMap.values());

    let qs: Question[];
    if (selectedIds.size > 0) {
      const chosen = available.filter((q) => selectedIds.has(q.id));
      qs = chosen.slice(0, count);
      if (qs.length < count) {
        const remaining = available.filter((q) => !selectedIds.has(q.id));
        qs = [...qs, ...pickRandomQuestions(remaining, count - qs.length)];
      }
    } else {
      qs = pickRandomQuestions(available, count);
    }
    setSessionQuestions(qs);
    setCurrentIndex(0);
    setTimeLeft(ONE_MINUTE);
    setRunning(true);
    setEvaluations({});
    // keep previous recordings irrelevant for new session
    setRecordings({});
  };

  const stopSession = () => {
    setRunning(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    // ensure recording is stopped when session ends
    if (isRecording) {
      void stopRecording();
    }
  };

  const handleNext = () => {
    // auto-stop recording before moving on
    if (isRecording) {
      void stopRecording();
    }
    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setTimeLeft(ONE_MINUTE);
    } else {
      stopSession();
    }
  };

  const toggleChecklist = (questionId: number, key: ChecklistKey) => {
    setEvaluations((prev) => {
      const q = prev[questionId] || {};
      const next = { ...q, [key]: !q[key] };
      return { ...prev, [questionId]: next };
    });
  };

  const summary = useMemo(() => {
    const totals: Record<ChecklistKey, number> = {
      clarity: 0,
      structure: 0,
      relevance: 0,
      confidence: 0,
    };
    sessionQuestions.forEach((q) => {
      const e = evaluations[q.id] || {};
      (Object.keys(totals) as ChecklistKey[]).forEach((k) => {
        if (e[k]) totals[k] += 1;
      });
    });
    return totals;
  }, [evaluations, sessionQuestions]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  async function startRecording() {
    try {
      // Request mic access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const q = sessionQuestions[currentIndex];
        if (q) {
          setRecordings((prev) => {
            // Revoke old URL if exists
            const existing = prev[q.id];
            if (existing) URL.revokeObjectURL(existing);
            return { ...prev, [q.id]: url };
          });
        }
        // Cleanup stream tracks
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        chunksRef.current = [];
      };
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
      setIsRecording(false);
    }
  }

  async function stopRecording() {
    try {
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }
    } finally {
      setIsRecording(false);
    }
  }

  // Revoke all blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(recordings).forEach((url) => URL.revokeObjectURL(url));
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Mock Session | Timed Q&A</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="pt-20 text-4xl font-bold text-red-800 mb-2">
            Mock Session
          </h1>
          <p className="text-red-600">
            Timed Q&A practice with a 1-minute limit per question
          </p>
        </header>

        {/* Setup / Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Questions per session
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                disabled={running}
                className="border border-red-200 rounded-lg p-2 bg-white text-gray-800"
              >
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              {!running ? (
                <button
                  onClick={startSession}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Start Session
                </button>
              ) : (
                <button
                  onClick={stopSession}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  End Session
                </button>
              )}
            </div>
          </div>
          {/* Select specific questions (includes your custom questions) */}
          {!running && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-red-700 mb-2">
                Select Questions (optional)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Selected questions will be used; otherwise we pick randomly.
              </p>
              <div className="max-h-64 overflow-auto space-y-2 border border-red-100 rounded-lg p-3 bg-red-50">
                {(() => {
                  const base =
                    mockQuestions && mockQuestions.length > 0
                      ? mockQuestions
                      : questionsData;
                  const mergedMap = new Map<number, Question>();
                  base.forEach((q) => mergedMap.set(q.id, q));
                  (customQuestions || []).forEach((q) =>
                    mergedMap.set(q.id, q)
                  );
                  const available = Array.from(mergedMap.values());
                  return available.map((q) => {
                    const checked = selectedIds.has(q.id);
                    return (
                      <label
                        key={q.id}
                        className="flex items-center gap-2 bg-white rounded-md p-2 border border-red-100"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            setSelectedIds((prev) => {
                              const next = new Set(prev);
                              if (e.target.checked) next.add(q.id);
                              else next.delete(q.id);
                              return next;
                            });
                          }}
                          className="accent-red-500"
                        />
                        <span className="text-gray-800">{q.text}</span>
                        <span className="ml-auto text-xs text-red-700">
                          {q.category}
                        </span>
                      </label>
                    );
                  });
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Active Question */}
        {running && currentQuestion && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-red-800">
                Question {currentIndex + 1} of {sessionQuestions.length}
              </h2>
              <div
                className={`text-xl font-mono font-bold ${
                  timeLeft <= 10 ? "text-red-500" : "text-red-600"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
            </div>
            <p className="text-gray-800 bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
              {currentQuestion.text}
            </p>

            {/* Recording controls */}
            <div className="mb-6 flex items-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  Stop Recording
                </button>
              )}
              {recordings[currentQuestion.id] && (
                <div className="flex items-center gap-3">
                  <audio
                    controls
                    src={recordings[currentQuestion.id]}
                    className="h-10"
                  />
                  <a
                    href={recordings[currentQuestion.id]}
                    download={`answer-q${currentQuestion.id}.webm`}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>

            {/* Evaluation checklist */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-red-700">Evaluation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    "clarity",
                    "structure",
                    "relevance",
                    "confidence",
                  ] as ChecklistKey[]
                ).map((k) => {
                  const checked = Boolean(evaluations[currentQuestion.id]?.[k]);
                  const label =
                    k === "clarity"
                      ? "Clarity (clear delivery)"
                      : k === "structure"
                      ? "Structure (intro, body, close)"
                      : k === "relevance"
                      ? "Relevance (answers the question)"
                      : "Confidence (tone and pacing)";
                  return (
                    <label
                      key={k}
                      className="inline-flex items-center gap-2 p-2 rounded-lg border border-red-100 hover:bg-red-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChecklist(currentQuestion.id, k)}
                        className="accent-red-500"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                {currentIndex + 1 < sessionQuestions.length ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        )}

        {/* Summary */}
        {!running && sessionQuestions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-red-800 mb-4">
              Session Summary
            </h2>
            <p className="text-gray-600 mb-4">
              Checklist items met (out of {sessionQuestions.length} questions):
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-900">
                Clarity: {summary.clarity}
              </li>
              <li className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-900">
                Structure: {summary.structure}
              </li>
              <li className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-900">
                Relevance: {summary.relevance}
              </li>
              <li className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-900">
                Confidence: {summary.confidence}
              </li>
            </ul>
            {/* Recorded answers list */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Recorded Answers
              </h3>
              <div className="space-y-3">
                {sessionQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-lg border border-red-100 bg-red-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-700">
                        Question {idx + 1}
                      </span>
                      {recordings[q.id] && (
                        <a
                          href={recordings[q.id]}
                          download={`answer-q${q.id}.webm`}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                        >
                          Download
                        </a>
                      )}
                    </div>
                    {recordings[q.id] ? (
                      <audio
                        controls
                        src={recordings[q.id]}
                        className="w-full"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No recording
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
