// QuestionBank.tsx
"use client";

import { Question } from "./questionsData";

interface QuestionBankProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  categoryQuestions: Question[];
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question) => void;
  stopTimer: () => void;
  setUserAnswer: (answer: string) => void;
  setShowSampleAnswer: (show: boolean) => void;
}

export default function QuestionBank({
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryQuestions,
  selectedQuestion,
  setSelectedQuestion,
  stopTimer,
  setUserAnswer,
  setShowSampleAnswer,
}: QuestionBankProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 card-hover animate-slideInRight">
      <h2 className="text-2xl font-semibold text-red-800 mb-4">
        Question Bank
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-red-700 mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium mobile-gesture-zone interactive ${
                selectedCategory === category
                  ? "bg-red-500 text-white transform scale-105"
                  : "bg-red-100 text-red-800 hover:bg-red-200 hover:transform hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {selectedCategory && (
        <div>
          <h3 className="text-lg font-medium text-red-700 mb-2">Questions</h3>
          <div className="space-y-3">
            {categoryQuestions.map((question) => (
              <div
                key={question.id}
                onClick={() => {
                  setSelectedQuestion(question);
                  stopTimer();
                  setUserAnswer("");
                  setShowSampleAnswer(false);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-all mobile-gesture-zone interactive ${
                  selectedQuestion?.id === question.id
                    ? "bg-red-100 border-l-4 border-red-500 transform scale-105"
                    : "bg-gray-50 hover:bg-red-50 hover:transform hover:scale-105"
                }`}
              >
                <p className="text-sm text-gray-700">{question.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
