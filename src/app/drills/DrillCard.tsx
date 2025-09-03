"use client";

import { Drill } from "./drillsData";
import { HiCheckCircle, HiPlay } from "react-icons/hi";

interface DrillCardProps {
  drill: Drill;
  onStart: (drill: Drill) => void;
  isCompleted: boolean;
}

export default function DrillCard({
  drill,
  onStart,
  isCompleted,
}: DrillCardProps) {
  const Icon = drill.icon;

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all duration-300 border-2 ${
        isCompleted
          ? "border-green-500 bg-green-50"
          : "border-transparent hover:shadow-xl hover:border-red-500"
      }`}
    >
      <div>
        <div className="flex items-center mb-4">
          <div
            className={`p-3 rounded-full mr-4 ${
              isCompleted ? "bg-green-200" : "bg-red-100"
            }`}
          >
            <Icon
              className={`text-2xl ${
                isCompleted ? "text-green-700" : "text-red-600"
              }`}
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{drill.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{drill.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-semibold text-gray-500">
          {drill.duration} mins
        </span>
        {isCompleted ? (
          <div className="flex items-center text-green-600 font-semibold">
            <HiCheckCircle className="mr-2 text-xl" />
            Completed
          </div>
        ) : (
          <button
            onClick={() => onStart(drill)}
            className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            <HiPlay className="mr-1" />
            Start
          </button>
        )}
      </div>
    </div>
  );
}
