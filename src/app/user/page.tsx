"use client";

import { useMemo, useState } from "react";
import Head from "next/head";
import { usePracticeState } from "../practice/hooks/usePracticeState";
import type { Question } from "../practice/questionsData";
// Mock management removed from user page per request

export default function UserContentPage() {
  const { customQuestions, setPracticeState } = usePracticeState();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Custom");

  const categories = useMemo(() => {
    const set = new Set<string>([
      "Custom",
      ...(customQuestions || []).map((q) => q.category),
    ]);
    return Array.from(set);
  }, [customQuestions]);

  const addQuestion = () => {
    const trimmed = text.trim();
    const cat = category.trim() || "Custom";
    if (!trimmed) return;
    const nextId = Date.now();
    const newQ: Question = {
      id: nextId,
      text: trimmed,
      category: cat,
      sampleAnswer: "",
    };
    setPracticeState({ customQuestions: [...(customQuestions || []), newQ] });
    setText("");
  };

  const removeQuestion = (id: number) => {
    setPracticeState({
      customQuestions: (customQuestions || []).filter((q) => q.id !== id),
    });
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

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="user-categories"
              placeholder="Category"
              className="border border-red-200 rounded-lg p-2 bg-white text-gray-800"
            />
            <datalist id="user-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <button
              onClick={addQuestion}
              className="sm:col-span-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Your Questions
          </h2>
          {(customQuestions || []).length === 0 ? (
            <p className="text-gray-500">No custom questions yet.</p>
          ) : (
            <ul className="space-y-3">
              {(customQuestions || []).map((q) => (
                <li
                  key={q.id}
                  className="p-3 rounded-lg border border-red-100 bg-red-50 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-gray-800">{q.text}</p>
                    <p className="text-xs text-red-700 mt-1">{q.category}</p>
                  </div>
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
