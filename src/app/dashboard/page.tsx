"use client";

import { HiAcademicCap, HiFire } from "react-icons/hi";
import { useDashboardState } from "../../hooks/useDashboardState";
import ProgressSection from "../dashboard/components/ProgressSection";
import DailyTasks from "../dashboard/components/DailyTasks";
import StatsAndActions from "../dashboard/components/StatsAndActions";

export default function Dashboard() {
  const { tasks, weeks, stats, streak, toggleTask, resetAllData } =
    useDashboardState();

  const currentWeekNumber = weeks.find((w) => w.current)?.number || 1;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-white to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-800">
            Training Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full flex items-center space-x-2">
              <HiFire className="text-red-600" />
              <span>Streak: {streak} / 7</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
              <HiAcademicCap className="text-red-600" />
              <span>Week {currentWeekNumber} of 6</span>
            </div>
          </div>
        </div>

        <ProgressSection weeks={weeks} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailyTasks tasks={tasks} toggleTask={toggleTask} />
          <StatsAndActions stats={stats} resetAllData={resetAllData} />
        </div>
      </div>
    </div>
  );
}
