// PracticePage.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import CoreMessageBank from "./CoreMessageBank";
import QuestionBank from "./QuestionBank";
import FrameworkGuide from "./FrameworkGuide";
import {
  questionsData,
  categories as builtInCategories,
  Question,
} from "./questionsData";
import { usePracticeState } from "./hooks/usePracticeState";

export default function PracticePage() {
  const {
    selectedCategory,
    selectedQuestion,
    userAnswer,
    coreMessages,
    customQuestions,
    isLoading,
    error,
    setPracticeState,
  } = usePracticeState();

  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const allQuestions: Question[] = useMemo(() => {
    return [...questionsData, ...(customQuestions || [])];
  }, [customQuestions]);

  const categories = useMemo(() => {
    const set = new Set<string>(builtInCategories);
    (customQuestions || []).forEach((q) => set.add(q.category));
    return Array.from(set);
  }, [customQuestions]);

  const categoryQuestions =
    selectedCategory && !isLoading
      ? allQuestions.filter((q) => q.category === selectedCategory)
      : [];

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(120);
    setTimerActive(true);
    setShowSampleAnswer(false);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resetPractice = () => {
    stopTimer();
    setPracticeState({ selectedQuestion: null, userAnswer: "" });
    setShowSampleAnswer(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-gray-500">
          Loading Practice Session...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-2xl font-bold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Practice Q&A | Interview Prep</title>
        <meta
          name="description"
          content="Practice structured interview responses"
        />
      </Head>

      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="pt-20 text-4xl font-bold text-red-800 mb-4">
            Q&A Practice
          </h1>
          <p className="text-lg text-red-600 max-w-2xl mx-auto">
            Hone your Q&A skills with our structured response practice.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <QuestionBank
            categories={categories}
            selectedCategory={selectedCategory || null}
            setSelectedCategory={(category) =>
              setPracticeState({ selectedCategory: category })
            }
            categoryQuestions={categoryQuestions}
            selectedQuestion={selectedQuestion || null}
            setSelectedQuestion={(question) =>
              setPracticeState({ selectedQuestion: question })
            }
            stopTimer={stopTimer}
            setUserAnswer={(answer) => setPracticeState({ userAnswer: answer })}
            setShowSampleAnswer={setShowSampleAnswer}
          />

          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 card-hover animate-fadeInUp">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-red-800">
                  Practice Session
                </h2>
                <div className="flex items-center space-x-4">
                  <div
                    className={`text-xl font-mono font-bold ${
                      timeLeft < 30 ? "text-red-500" : "text-red-600"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex space-x-2">
                    {!timerActive ? (
                      <button
                        onClick={startTimer}
                        disabled={!selectedQuestion}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start Practice
                      </button>
                    ) : (
                      <button
                        onClick={stopTimer}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                      >
                        Stop
                      </button>
                    )}
                    <button
                      onClick={resetPractice}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {selectedQuestion ? (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-red-700 mb-2">
                    Question:
                  </h3>
                  <p className="text-gray-800 bg-red-50 p-4 rounded-lg border border-red-100">
                    {selectedQuestion.text}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Select a question from the question bank to begin practicing
                </div>
              )}

              {selectedQuestion && <FrameworkGuide />}

              {selectedQuestion && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-red-700 mb-2">
                    Your Answer:
                  </h3>
                  <textarea
                    value={userAnswer || ""}
                    onChange={(e) =>
                      setPracticeState({ userAnswer: e.target.value })
                    }
                    placeholder="Type your answer here..."
                    className="w-full h-40 p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black bg-white"
                  />
                </div>
              )}

              {selectedQuestion && !timerActive && (
                <div className="text-center">
                  <button
                    onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
                  >
                    {showSampleAnswer
                      ? "Hide Sample Answer"
                      : "Show Sample Answer"}
                  </button>
                </div>
              )}
            </div>

            {showSampleAnswer && selectedQuestion && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  Sample Answer
                </h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedQuestion.sampleAnswer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gray-50 shadow-md">
        <CoreMessageBank
          coreMessages={coreMessages || []}
          onMessagesChange={(messages) =>
            setPracticeState({ coreMessages: messages })
          }
        />
      </div>
    </div>
  );
}
