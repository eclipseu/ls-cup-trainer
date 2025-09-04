"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { questionsData } from "../practice/questionsData";
import { getMockDataClient } from "@/lib/data.client";
import { usePracticeState } from "../practice/hooks/usePracticeState";
import { Question } from "@/types";

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
  const { customQuestions } = usePracticeState();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordings, setRecordings] = useState<Record<number, string>>({});

  const currentQuestion = useMemo(
    () => sessionQuestions[currentIndex] || null,
    [sessionQuestions, currentIndex],
  );

  const stopSession = useCallback(() => {
    setRunning(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setTimeLeft(ONE_MINUTE);
    } else {
      stopSession();
    }
  }, [currentIndex, sessionQuestions.length, stopSession]);

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
  }, [running, timeLeft, handleNext]);

  // This effect is now just for potential future use, not setting state
  useEffect(() => {
    (async () => {
      await getMockDataClient();
      // You can use the data for logging or other purposes
    })();
  }, []);

  const allQuestions = useMemo(() => {
    const merged = new Map<number, Question>();
    questionsData.forEach((q) => merged.set(q.id, q));
    customQuestions.forEach((q) => merged.set(q.id, q));
    return Array.from(merged.values());
  }, [customQuestions]);

  const startSession = () => {
    const count = Math.min(Math.max(questionCount, 3), 5);
    let qs: Question[];

    if (selectedIds.size > 0) {
      const chosen = allQuestions.filter((q) => selectedIds.has(q.id));
      qs = chosen.slice(0, count);
      if (qs.length < count) {
        const remaining = allQuestions.filter((q) => !selectedIds.has(q.id));
        qs = [...qs, ...pickRandomQuestions(remaining, count - qs.length)];
      }
    } else {
      qs = pickRandomQuestions(allQuestions, count);
    }

    setSessionQuestions(qs);
    setCurrentIndex(0);
    setTimeLeft(ONE_MINUTE);
    setRunning(true);
    setEvaluations({});
    setRecordings({});
  };

  const handleEvaluation = (key: ChecklistKey) => {
    if (!currentQuestion) return;
    setEvaluations((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        [key]: !prev[currentQuestion.id]?.[key],
      },
    }));
  };

  const startRecording = async () => {
    if (!currentQuestion) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => ({ ...prev, [currentQuestion.id]: url }));
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert(
        "Could not start recording. Please ensure you have given microphone permissions.",
      );
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
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

  // Revoke all blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(recordings).forEach((url) => URL.revokeObjectURL(url));
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [recordings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="pt-20 text-4xl font-bold text-red-800 mb-2">
            Mock Session
          </h1>
          <p className="text-red-600">
            Timed Q&amp;A practice with a 1-minute limit per question
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
                {allQuestions.map((q) => {
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
                })}
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
