"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionsData } from "../practice/questionsData";
import { getMockDataClient } from "@/lib/data.client";
import { usePracticeState } from "../practice/hooks/usePracticeState";
import { Question } from "@/types";
import { HiPlay, HiStop, HiCheck, HiX, HiClock, HiMicrophone, HiDownload, HiRefresh } from "react-icons/hi";

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
  const [showQuestionSelector, setShowQuestionSelector] = useState<boolean>(false);

  const currentQuestion = useMemo(
    () => sessionQuestions[currentIndex] || null,
    [sessionQuestions, currentIndex]
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

  useEffect(() => {
    (async () => {
      await getMockDataClient();
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
    setShowQuestionSelector(false);
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
        "Could not start recording. Please ensure you have given microphone permissions."
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

  useEffect(() => {
    return () => {
      Object.values(recordings).forEach((url) => URL.revokeObjectURL(url));
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [recordings]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const questionCardVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.header
          variants={itemVariants}
          className="text-center mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-20 text-4xl font-bold text-red-800 mb-2"
          >
            Mock Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-red-600 text-lg"
          >
            Timed Q&A practice with a 1-minute limit per question
          </motion.p>
        </motion.header>

        {/* Setup / Controls */}
        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-red-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Questions per session
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  disabled={running}
                  className="border-2 border-red-200 rounded-xl p-3 bg-white text-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                >
                  <option value={3}>3 Questions</option>
                  <option value={4}>4 Questions</option>
                  <option value={5}>5 Questions</option>
                </select>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuestionSelector(!showQuestionSelector)}
                disabled={running}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 transition-all duration-200 flex items-center gap-2"
              >
                <HiCheck className="w-4 h-4" />
                {selectedIds.size > 0 ? `${selectedIds.size} Selected` : 'Select Questions'}
              </motion.button>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!running ? (
                <button
                  onClick={startSession}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg font-semibold"
                >
                  <HiPlay className="w-5 h-5" />
                  Start Session
                </button>
              ) : (
                <button
                  onClick={stopSession}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg font-semibold"
                >
                  <HiStop className="w-5 h-5" />
                  End Session
                </button>
              )}
            </motion.div>
          </div>

          {/* Enhanced Question Selector */}
          <AnimatePresence>
            {showQuestionSelector && !running && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-6 overflow-hidden"
              >
                <div className="border-t border-red-100 pt-6">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2"
                  >
                    <HiCheck className="w-5 h-5" />
                    Select Specific Questions
                  </motion.h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose questions for your session, or leave unselected for random selection.
                  </p>
                  
                  <div className="max-h-80 overflow-auto space-y-3 border border-red-100 rounded-xl p-4 bg-red-50/50">
                    {allQuestions.map((q, index) => {
                      const checked = selectedIds.has(q.id);
                      return (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => {
                            setSelectedIds((prev) => {
                              const next = new Set(prev);
                              if (checked) {
                                next.delete(q.id);
                              } else {
                                next.add(q.id);
                              }
                              return next;
                            });
                          }}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            checked
                              ? "border-red-500 bg-red-100 shadow-md"
                              : "border-red-200 bg-white hover:border-red-300 hover:bg-red-50"
                          }`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              checked
                                ? "border-red-500 bg-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            {checked && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <HiCheck className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium ${
                              checked ? "text-red-800" : "text-gray-800"
                            }`}>
                              {q.text}
                            </span>
                          </div>
                          
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              checked
                                ? "bg-red-200 text-red-800"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {q.category}
                          </motion.span>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedIds.size} of {allQuestions.length} questions selected
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedIds(new Set())}
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-1"
                    >
                      <HiRefresh className="w-3 h-3" />
                      Clear All
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Active Question */}
        <AnimatePresence mode="wait">
          {running && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              variants={questionCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-red-100"
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold text-red-800"
                >
                  Question {currentIndex + 1} of {sessionQuestions.length}
                </motion.h2>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-xl ${
                    timeLeft <= 10 
                      ? "bg-red-100 text-red-600 border-2 border-red-300 animate-pulse"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  <HiClock className="w-5 h-5" />
                  {formatTime(timeLeft)}
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-800 bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-100 mb-6 text-lg leading-relaxed"
              >
                {currentQuestion.text}
              </motion.p>

              {/* Enhanced Recording Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                  <HiMicrophone className="w-5 h-5" />
                  Recording Controls
                </h3>
                
                <div className="flex flex-wrap items-center gap-4">
                  {!isRecording ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startRecording}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
                    >
                      <HiPlay className="w-5 h-5" />
                      Start Recording
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopRecording}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
                    >
                      <HiStop className="w-5 h-5" />
                      Stop Recording
                    </motion.button>
                  )}

                  {recordings[currentQuestion.id] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring" }}
                      className="flex items-center gap-3"
                    >
                      <audio
                        controls
                        src={recordings[currentQuestion.id]}
                        className="h-12 rounded-lg"
                      />
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={recordings[currentQuestion.id]}
                        download={`answer-q${currentQuestion.id}.webm`}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                      >
                        <HiDownload className="w-4 h-4" />
                        Download
                      </motion.a>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Enhanced Evaluation Checklist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-red-700 mb-4">Self-Evaluation Checklist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      "clarity",
                      "structure",
                      "relevance",
                      "confidence",
                    ] as ChecklistKey[]
                  ).map((k, index) => {
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
                      <motion.label
                        key={k}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => toggleChecklist(currentQuestion.id, k)}
                        className={`inline-flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          checked
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-red-100 hover:border-red-300 hover:bg-red-50"
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            checked
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {checked && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <HiCheck className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                        <span className={`font-medium ${
                          checked ? "text-green-800" : "text-gray-700"
                        }`}>
                          {label}
                        </span>
                      </motion.label>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg font-semibold"
                >
                  {currentIndex + 1 < sessionQuestions.length ? "Next Question" : "Finish Session"}
                  <HiPlay className="w-5 h-5 rotate-90" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Summary */}
        <AnimatePresence>
          {!running && sessionQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-red-100"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-red-800 mb-6"
              >
                Session Summary
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mb-6"
              >
                Checklist items met (out of {sessionQuestions.length} questions):
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              >
                {[
                  { key: "clarity", label: "Clarity", value: summary.clarity, color: "green" },
                  { key: "structure", label: "Structure", value: summary.structure, color: "blue" },
                  { key: "relevance", label: "Relevance", value: summary.relevance, color: "purple" },
                  { key: "confidence", label: "Confidence", value: summary.confidence, color: "orange" },
                ].map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      item.color === "green" ? "border-green-200 bg-green-50" :
                      item.color === "blue" ? "border-blue-200 bg-blue-50" :
                      item.color === "purple" ? "border-purple-200 bg-purple-50" :
                      "border-orange-200 bg-orange-50"
                    }`}
                  >
                    <div className={`text-2xl font-bold mb-1 ${
                      item.color === "green" ? "text-green-700" :
                      item.color === "blue" ? "text-blue-700" :
                      item.color === "purple" ? "text-purple-700" :
                      "text-orange-700"
                    }`}>
                      {item.value}
                    </div>
                    <div className={`text-sm font-medium ${
                      item.color === "green" ? "text-green-600" :
                      item.color === "blue" ? "text-blue-600" :
                      item.color === "purple" ? "text-purple-600" :
                      "text-orange-600"
                    }`}>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recorded Answers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <HiMicrophone className="w-5 h-5" />
                  Recorded Answers
                </h3>
                <div className="space-y-3">
                  {sessionQuestions.map((q, idx) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className="p-4 rounded-xl border border-red-100 bg-red-50/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-red-700">
                          Question {idx + 1}
                        </span>
                        {recordings[q.id] && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={recordings[q.id]}
                            download={`answer-q${q.id}.webm`}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1"
                          >
                            <HiDownload className="w-3 h-3" />
                            Download
                          </motion.a>
                        )}
                      </div>
                      {recordings[q.id] ? (
                        <audio
                          controls
                          src={recordings[q.id]}
                          className="w-full rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-500 text-sm flex items-center gap-2">
                          <HiX className="w-4 h-4" />
                          No recording
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
