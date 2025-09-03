"use client";

import { dailyRoutine } from "./drillsData";
import { HiArrowRight } from "react-icons/hi";

export default function DailyRoutine() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border-t-4 border-red-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Suggested Daily Flow
      </h2>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {dailyRoutine.map((item, index) => (
          <>
            <div
              key={item.name}
              className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 flex-1 w-full"
            >
              <div className="text-red-600 font-bold text-lg">
                {item.duration} mins
              </div>
              <div className="text-gray-800 font-semibold mt-1">
                {item.name}
              </div>
              <div className="text-xs text-gray-500">{item.details}</div>
            </div>
            {index < dailyRoutine.length - 1 && (
              <HiArrowRight className="text-gray-300 text-2xl hidden sm:block" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
