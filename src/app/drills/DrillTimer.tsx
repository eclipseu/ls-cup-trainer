"use client";

import { useState, useEffect } from "react";
import { HiX, HiPlay, HiPause, HiRefresh } from "react-icons/hi";

interface DrillTimerProps {
  title: string;
  durationInMinutes: number;
  examples?: string[];
  onClose: () => void;
  onComplete: () => void;
}

export default function DrillTimer({
  title,
  durationInMinutes,
  examples,
  onClose,
  onComplete,
}: DrillTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationInMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || secondsLeft === 0) {
      if (secondsLeft === 0) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => setSecondsLeft(durationInMinutes * 60);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const progress =
    ((durationInMinutes * 60 - secondsLeft) / (durationInMinutes * 60)) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <HiX className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">Focus on the drill.</p>

        {examples && examples.length > 0 && (
          <div className="text-left bg-gray-50 p-4 rounded-lg mb-6 max-h-40 overflow-y-auto">
            <h4 className="font-bold text-gray-700 mb-2">Examples:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className="text-red-500"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={
                2 * Math.PI * 45 - (progress / 100) * (2 * Math.PI * 45)
              }
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-800">
            {formatTime(secondsLeft)}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
          >
            {isActive ? (
              <HiPause className="text-3xl" />
            ) : (
              <HiPlay className="text-3xl" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 bg-gray-200 text-gray-700 rounded-full shadow-lg hover:bg-gray-300"
          >
            <HiRefresh className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
