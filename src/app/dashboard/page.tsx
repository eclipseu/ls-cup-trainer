"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Reset from "./reset"; // adjust the path if needed

import {
  HiCheckCircle,
  HiClock,
  HiAcademicCap,
  HiChartBar,
  HiArrowRight,
  HiCalendar,
  HiFire,
} from "react-icons/hi";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  timeEstimate: number;
}

interface Week {
  number: number;
  title: string;
  completed: boolean;
  current: boolean;
}

export default function Dashboard() {
  const resetAllData = () => {
    // Reset tasks
    setTasks(defaultTasks);

    // Reset weeks
    setWeeks(initialWeeks);

    // Reset stats
    setStats({ timePracticed: 0, questionsAnswered: 0 });

    // Reset streak
    setStreak(0);

    // Clear last streak and last reset dates
    setLastStreakDate(null);
    setLastTaskResetDate(null);

    // Clear localStorage
    localStorage.removeItem("dashboard-tasks");
    localStorage.removeItem("dashboard-weeks");
    localStorage.removeItem("dashboard-stats");
    localStorage.removeItem("dashboard-streak");
    localStorage.removeItem("dashboard-lastStreakDate");
    localStorage.removeItem("dashboard-lastTaskResetDate");
  };

  const defaultTasks: Task[] = [
    {
      id: 1,
      title: "Practice Q&A Session + Answer 3 Questions",
      completed: false,
      timeEstimate: 30,
    },
    {
      id: 2,
      title: "Breathing Exercises + Answer 3 Questions",
      completed: false,
      timeEstimate: 10,
    },
    {
      id: 3,
      title: "Speech Drills + Answer 3 Questions",
      completed: false,
      timeEstimate: 15,
    },
    {
      id: 4,
      title: "Review Advocacy Plan + Answer 3 Questions",
      completed: false,
      timeEstimate: 20,
    },
    {
      id: 5,
      title: "Watch Expert Q&A Videos + Answer 3 Questions",
      completed: false,
      timeEstimate: 25,
    },
  ];

  const initialWeeks: Week[] = [
    {
      number: 1,
      title: "Foundation Building",
      completed: false,
      current: true,
    },
    {
      number: 2,
      title: "Core Skills Development",
      completed: false,
      current: false,
    },
    {
      number: 3,
      title: "Advanced Techniques",
      completed: false,
      current: false,
    },
    {
      number: 4,
      title: "Mock Practice Sessions",
      completed: false,
      current: false,
    },
    {
      number: 5,
      title: "Refinement & Polish",
      completed: false,
      current: false,
    },
    { number: 6, title: "Final Preparation", completed: false, current: false },
  ];

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [stats, setStats] = useState({
    timePracticed: 0,
    questionsAnswered: 0,
  });
  const [streak, setStreak] = useState<number>(0);
  const [lastStreakDate, setLastStreakDate] = useState<string | null>(null);
  const [lastTaskResetDate, setLastTaskResetDate] = useState<string | null>(
    null
  );

  const getCurrentDateGMT8 = () => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const gmt8 = new Date(utc + 8 * 60 * 60 * 1000);
    return gmt8.toISOString().split("T")[0];
  };

  const resetDailyTasks = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
    const today = getCurrentDateGMT8();
    setLastTaskResetDate(today);
    localStorage.setItem("dashboard-lastTaskResetDate", today);
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setStats((prev) => {
      let newTime = prev.timePracticed;
      let newQuestions = prev.questionsAnswered;

      if (!task.completed) {
        // Task is now completed → add stats (no max cap anymore)
        newTime = prev.timePracticed + task.timeEstimate;
        newQuestions = prev.questionsAnswered + 3;
      } else {
        // Task is now uncompleted → subtract stats (keep floor at 0)
        newTime = Math.max(prev.timePracticed - task.timeEstimate, 0);
        newQuestions = Math.max(prev.questionsAnswered - 3, 0);
      }

      return {
        timePracticed: newTime,
        questionsAnswered: newQuestions,
      };
    });

    const allCompleted = updatedTasks.every((t) => t.completed);
    const today = getCurrentDateGMT8();

    if (allCompleted && lastStreakDate !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastStreakDate(today);

      if (newStreak >= 7) {
        setStreak(0);

        const currentWeekIndex = weeks.findIndex((w) => w.current);
        if (currentWeekIndex !== -1) {
          const updatedWeeksCopy = [...weeks];
          updatedWeeksCopy[currentWeekIndex].completed = true;
          updatedWeeksCopy[currentWeekIndex].current = false;
          if (currentWeekIndex + 1 < updatedWeeksCopy.length) {
            updatedWeeksCopy[currentWeekIndex + 1].current = true;
          }
          setWeeks(updatedWeeksCopy);
        }

        resetDailyTasks();
      }
    }
  };
  const progress = Math.round(
    (weeks.filter((w) => w.completed).length / weeks.length) * 100
  );
  const tasksCompleted = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  useEffect(() => {
    const savedTasks = localStorage.getItem("dashboard-tasks");
    const savedWeeks = localStorage.getItem("dashboard-weeks");
    const savedStats = localStorage.getItem("dashboard-stats");
    const savedStreak = localStorage.getItem("dashboard-streak");
    const savedLastDate = localStorage.getItem("dashboard-lastStreakDate");
    const savedLastTaskResetDate = localStorage.getItem(
      "dashboard-lastTaskResetDate"
    );

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedWeeks) {
      const weeksData: Week[] = JSON.parse(savedWeeks);

      // Force Week 1 as current on first load
      const updatedWeeks = weeksData.map((w) => ({
        ...w,
        current: w.number === 1,
        completed: false, // optional: reset completed
      }));

      setWeeks(updatedWeeks);
    }

    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedLastDate) setLastStreakDate(savedLastDate);
    if (savedLastTaskResetDate) setLastTaskResetDate(savedLastTaskResetDate);

    const today = getCurrentDateGMT8();
    if (savedLastTaskResetDate !== today) resetDailyTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-tasks", JSON.stringify(tasks));
    localStorage.setItem("dashboard-weeks", JSON.stringify(weeks));
    localStorage.setItem("dashboard-stats", JSON.stringify(stats));
    localStorage.setItem("dashboard-streak", String(streak));
    if (lastStreakDate)
      localStorage.setItem("dashboard-lastStreakDate", lastStreakDate);
  }, [tasks, weeks, stats, streak, lastStreakDate]);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">
            Training Dashboard
          </h1>
          <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <HiAcademicCap className="text-green-600" />
            <span>Week {weeks.find((w) => w.current)?.number} of 6</span>
          </div>
        </div>

        {/* Streak */}
        <div className="flex justify-end mb-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center space-x-2">
            <HiFire className="text-green-600" />
            <span>Streak: {streak} / 7</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-green-100">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Program Progress
          </h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-green-700 font-medium">
                {progress}% Complete
              </span>
              <span className="text-gray-500">
                {weeks.filter((w) => w.completed).length}/6 Weeks
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
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
                    ? "bg-green-500 text-white border-green-600 shadow-lg"
                    : week.current
                    ? "bg-green-100 text-green-800 border-green-300 shadow-md"
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                <div className="text-2xl font-bold mb-1">{week.number}</div>
                <div className="text-xs font-medium">Week</div>
                {week.completed && (
                  <HiCheckCircle className="mx-auto mt-2 text-white text-lg" />
                )}
                {week.current && (
                  <HiFire className="mx-auto mt-2 text-green-600 text-lg" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Tasks */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Today's Tasks
            </h2>
            <p className="text-gray-600 mb-6">
              Complete your daily training to stay on track
            </p>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div
                    className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-4 ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {task.completed && <HiCheckCircle className="text-xs" />}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        task.completed
                          ? "text-green-700 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <HiClock className="mr-1" />
                      <span>{task.timeEstimate} mins</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {tasksCompleted} of {totalTasks} tasks completed
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(tasksCompleted / totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics and Quick Actions */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-green-100">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Your Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {stats.timePracticed}
                  </div>
                  <div className="text-sm text-green-600">
                    Minutes Practiced
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {stats.questionsAnswered}
                  </div>
                  <div className="text-sm text-green-600">
                    Questions Answered
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/practice"
                  className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-all"
                >
                  <div className="flex items-center">
                    <div className="bg-green-500 p-2 rounded-lg mr-4">
                      <HiAcademicCap className="text-white text-xl" />
                    </div>
                    <span className="font-medium text-green-800">
                      Practice Q&A
                    </span>
                  </div>
                  <HiArrowRight className="text-green-500" />
                </Link>
                <Link
                  href="/advocacy"
                  className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-all"
                >
                  <div className="flex items-center">
                    <div className="bg-green-500 p-2 rounded-lg mr-4">
                      <HiChartBar className="text-white text-xl" />
                    </div>
                    <span className="font-medium text-green-800">
                      Advocacy Planning
                    </span>
                  </div>
                  <HiArrowRight className="text-green-500" />
                </Link>
                <Link
                  href="/mock"
                  className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-all"
                >
                  <div className="flex items-center">
                    <div className="bg-green-500 p-2 rounded-lg mr-4">
                      <HiCalendar className="text-white text-xl" />
                    </div>
                    <span className="font-medium text-green-800">
                      Mock Session
                    </span>
                  </div>
                  <HiArrowRight className="text-green-500" />
                </Link>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2">
                    {/* Reset Button */}
                    <div
                      className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-all cursor-pointer mt-2"
                      onClick={resetAllData}
                    >
                      <div className="flex items-center">
                        <div className="bg-red-500 p-2 rounded-lg mr-4">
                          <HiFire className="text-white text-xl" />
                        </div>
                        <span className="font-medium text-red-800">
                          Reset Data
                        </span>
                      </div>
                      <HiArrowRight className="text-red-500" />
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
