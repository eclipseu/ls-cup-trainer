import { Week } from "../types";
import { HiCheckCircle, HiFire } from "react-icons/hi";

interface ProgressSectionProps {
  weeks: Week[];
}

export default function ProgressSection({ weeks }: ProgressSectionProps) {
  const progress = Math.round(
    (weeks.filter((w) => w.completed).length / weeks.length) * 100
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-red-100">
      <h2 className="text-xl font-semibold text-red-800 mb-4">
        Program Progress
      </h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-red-700 font-medium">{progress}% Complete</span>
          <span className="text-gray-500">
            {weeks.filter((w) => w.completed).length}/6 Weeks
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {weeks.map((week) => (
          <div
            key={week.number}
            className={`p-4 rounded-xl text-center border-2 transition-all ${
              week.completed
                ? "bg-red-500 text-white border-red-600 shadow-lg"
                : week.current
                ? "bg-red-100 text-red-800 border-red-300 shadow-md"
                : "bg-gray-100 text-gray-500 border-gray-200"
            }`}
          >
            <div className="text-2xl font-bold mb-1">{week.number}</div>
            <div className="text-xs font-medium">Week</div>
            {week.completed && (
              <HiCheckCircle className="mx-auto mt-2 text-white text-lg" />
            )}
            {week.current && (
              <HiFire className="mx-auto mt-2 text-red-600 text-lg" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
