"use client";

import { useState, useEffect } from "react";
import { Task, Week } from "../app/dashboard/types";
import { defaultTasks, initialWeeks } from "../app/dashboard/lib/data";

const getCurrentDateGMT8 = () => {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const gmt8 = new Date(utc + 8 * 60 * 60 * 1000);
  return gmt8.toISOString().split("T")[0];
};

export function useDashboardState() {
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
    if (savedWeeks) setWeeks(JSON.parse(savedWeeks));
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedLastDate) setLastStreakDate(savedLastDate);
    if (savedLastTaskResetDate) setLastTaskResetDate(savedLastTaskResetDate);

    const today = getCurrentDateGMT8();
    if (savedLastTaskResetDate !== today) {
      resetDailyTasks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-tasks", JSON.stringify(tasks));
    localStorage.setItem("dashboard-weeks", JSON.stringify(weeks));
    localStorage.setItem("dashboard-stats", JSON.stringify(stats));
    localStorage.setItem("dashboard-streak", String(streak));
    if (lastStreakDate)
      localStorage.setItem("dashboard-lastStreakDate", lastStreakDate);
    if (lastTaskResetDate)
      localStorage.setItem("dashboard-lastTaskResetDate", lastTaskResetDate);
  }, [tasks, weeks, stats, streak, lastStreakDate, lastTaskResetDate]);

  const resetDailyTasks = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
    const today = getCurrentDateGMT8();
    setLastTaskResetDate(today);
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setStats((prev) => ({
      timePracticed: task.completed
        ? Math.max(0, prev.timePracticed - task.timeEstimate)
        : prev.timePracticed + task.timeEstimate,
      questionsAnswered: task.completed
        ? Math.max(0, prev.questionsAnswered - 3)
        : prev.questionsAnswered + 3,
    }));

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
          const updatedWeeks = [...weeks];
          updatedWeeks[currentWeekIndex] = {
            ...updatedWeeks[currentWeekIndex],
            completed: true,
            current: false,
          };
          if (currentWeekIndex + 1 < updatedWeeks.length) {
            updatedWeeks[currentWeekIndex + 1].current = true;
          }
          setWeeks(updatedWeeks);
        }
        resetDailyTasks();
      }
    }
  };

  const resetAllData = () => {
    setTasks(defaultTasks);
    setWeeks(initialWeeks);
    setStats({ timePracticed: 0, questionsAnswered: 0 });
    setStreak(0);
    setLastStreakDate(null);
    setLastTaskResetDate(null);
    localStorage.removeItem("dashboard-tasks");
    localStorage.removeItem("dashboard-weeks");
    localStorage.removeItem("dashboard-stats");
    localStorage.removeItem("dashboard-streak");
    localStorage.removeItem("dashboard-lastStreakDate");
    localStorage.removeItem("dashboard-lastTaskResetDate");
  };

  return {
    tasks,
    weeks,
    stats,
    streak,
    toggleTask,
    resetAllData,
  };
}
