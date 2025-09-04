"use client";

import { useMemo, useState } from "react";
import Head from "next/head";
import { usePracticeState } from "../practice/hooks/usePracticeState";
import type { Question } from "../practice/questionsData";
import { categories as defaultQuestionCategories } from "../practice/questionsData";
// Mock management removed from user page per request

export default function UserContentPage() {
  const { customQuestions, setPracticeState } = usePracticeState();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal Excellence & Character");
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);
  const [editingSampleAnswer, setEditingSampleAnswer] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>([
      ...defaultQuestionCategories,
      "Custom",
      ...(customQuestions || []).map((q) => q.category),
    ]);
    return Array.from(set);
  }, [customQuestions]);

  const addQuestion = () => {
    const trimmed = text.trim();
    const cat = category.trim() || "Personal Excellence & Character";
    if (!trimmed) return;
    const nextId = Date.now();
    const newQ: Question = {
      id: nextId,
      text: trimmed,
      category: cat,
      sampleAnswer: "",
      timeLimit: "1 minute",
    };
    setPracticeState({ customQuestions: [...(customQuestions || []), newQ] });
    setText("");
  };

  const removeQuestion = (id: number) => {
    setPracticeState({
      customQuestions: (customQuestions || []).filter((q) => q.id !== id),
    });
  };

  const startEditingSampleAnswer = (question: Question) => {
    setEditingQuestion(question.id);
    setEditingSampleAnswer(question.sampleAnswer || "");
  };

  const saveSampleAnswer = (questionId: number) => {
    const updatedQuestions = (customQuestions || []).map((q) =>
      q.id === questionId
        ? { ...q, sampleAnswer: editingSampleAnswer }
        : q
    );
    setPracticeState({ customQuestions: updatedQuestions });
    setEditingQuestion(null);
    setEditingSampleAnswer("");
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setEditingSampleAnswer("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>User | Manage Questions</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="pt-20 text-4xl font-bold text-red-800 mb-2">User</h1>
          <p className="text-red-600">Manage custom practice questions</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 card-hover animate-fadeInUp">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Add Question
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your question"
              className="sm:col-span-3 border border-red-200 rounded-lg p-2 bg-white text-gray-800"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-red-200 rounded-lg p-2 bg-white text-gray-800"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={addQuestion}
              className="sm:col-span-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 btn-animated interactive mobile-gesture-zone"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-slideInRight">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Your Questions
          </h2>
          {(customQuestions || []).length === 0 ? (
            <p className="text-gray-500">No custom questions yet.</p>
          ) : (
            <ul className="space-y-4">
              {(customQuestions || []).map((q) => (
                <li
                  key={q.id}
                  className="p-4 rounded-lg border border-red-100 bg-red-50 card-hover animate-fadeInUp"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{q.text}</p>
                      <p className="text-xs text-red-700 mt-1">{q.category}</p>
                    </div>
                    <button
                      onClick={() => removeQuestion(q.id)}
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 interactive mobile-gesture-zone"
                    >
                      Remove
                    </button>
                  </div>
                  
                  {/* Sample Answer Section */}
                  <div className="border-t border-red-200 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-red-800">Sample Answer</h4>
                      {editingQuestion !== q.id && (
                        <button
                          onClick={() => startEditingSampleAnswer(q)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 interactive mobile-gesture-zone"
                        >
                          {q.sampleAnswer ? "Edit" : "Add Sample Answer"}
                        </button>
                      )}
                    </div>
                    
                    {editingQuestion === q.id ? (
                      <div className="space-y-2 bg-red-50 p-3 rounded-md border border-red-200">
                        <textarea
                          value={editingSampleAnswer}
                          onChange={(e) => setEditingSampleAnswer(e.target.value)}
                          placeholder="Enter a sample answer for this question..."
                          className="w-full h-24 p-2 border border-red-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-800"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveSampleAnswer(q.id)}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 btn-animated interactive mobile-gesture-zone"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 interactive mobile-gesture-zone"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 bg-white p-2 rounded border border-red-100 min-h-[60px]">
                        {q.sampleAnswer ? (
                          <p className="whitespace-pre-wrap">{q.sampleAnswer}</p>
                        ) : (
                          <p className="text-gray-400 italic">No sample answer provided</p>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
