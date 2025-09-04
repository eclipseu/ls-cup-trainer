import Link from "next/link";
import {
  HiAcademicCap,
  HiChartBar,
  HiArrowRight,
  HiCalendar,
  HiFire,
} from "react-icons/hi";

interface StatsAndActionsProps {
  stats: {
    timePracticed: number;
    questionsAnswered: number;
  };
  resetAllData: () => void;
}

export default function StatsAndActions({
  stats,
  resetAllData,
}: StatsAndActionsProps) {
  const actionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-red-100">
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          Your Statistics
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-red-700 mb-1">
              {stats.timePracticed}
            </div>
            <div className="text-sm text-red-600">Minutes Practiced</div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-red-700 mb-1">
              {stats.questionsAnswered}
            </div>
            <div className="text-sm text-red-600">Questions Answered</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-100">
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          Quick Actions
        </h2>
        <div className="space-y-3">
          <Link
            href="/practice"
            className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all"
          >
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-4">
                <HiAcademicCap className="text-white text-xl" />
              </div>
              <span className="font-medium text-red-800">Practice Q&A</span>
            </div>
            <HiArrowRight className="text-red-500" />
          </Link>
          <Link
            href="/advocacy"
            className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all"
          >
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-4">
                <HiChartBar className="text-white text-xl" />
              </div>
              <span className="font-medium text-red-800">
                Advocacy Planning
              </span>
            </div>
            <HiArrowRight className="text-red-500" />
          </Link>
          <Link
            href="/mock"
            className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all"
          >
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-4">
                <HiCalendar className="text-white text-xl" />
              </div>
              <span className="font-medium text-red-800">Mock Session</span>
            </div>
            <HiArrowRight className="text-red-500" />
          </Link>
          <div
            className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all cursor-pointer mt-2"
            onClick={resetAllData}
          >
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-4">
                <HiFire className="text-white text-xl" />
              </div>
              <span className="font-medium text-red-800">Reset Data</span>
            </div>
            <HiArrowRight className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
