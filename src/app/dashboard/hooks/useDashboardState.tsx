"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Task, Week, DashboardData } from "@/types";
import { defaultTasks, initialWeeks } from "../lib/data";
import {
  getProfileDataClient as getProfileData,
  updateProfileDataClient as updateProfileData,
} from "@/lib/data.client";
import debounce from "lodash/debounce";

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
  const [isLoaded, setIsLoaded] = useState(false);

  // Debounced function to save data to Supabase
  const debouncedSave = useMemo(
    () =>
      debounce(async (dataToSave: DashboardData) => {
        await updateProfileData({ dashboard_data: dataToSave });
      }, 1000),
    []
  );

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        try {
          const localTasks = window.localStorage.getItem("dashboard-tasks");
          const localWeeks = window.localStorage.getItem("dashboard-weeks");
          const localStats = window.localStorage.getItem("dashboard-stats");
          const localStreak = window.localStorage.getItem("dashboard-streak");
          const localLast = window.localStorage.getItem(
            "dashboard-lastStreakDate"
          );
          const localReset = window.localStorage.getItem(
            "dashboard-lastTaskResetDate"
          );

          if (localTasks) setTasks(JSON.parse(localTasks));
          if (localWeeks) setWeeks(JSON.parse(localWeeks));
          if (localStats) setStats(JSON.parse(localStats));
          if (localStreak) setStreak(Number(localStreak));
          if (localLast) setLastStreakDate(localLast);
          if (localReset) setLastTaskResetDate(localReset);
        } catch {}
      }

      const profile = await getProfileData();
      if (profile && profile.dashboard_data) {
        const {
          tasks,
          weeks,
          stats,
          streak,
          lastStreakDate,
          lastTaskResetDate,
        } = profile.dashboard_data;
        setTasks(tasks || defaultTasks);
        setWeeks(weeks || initialWeeks);
        setStats(stats || { timePracticed: 0, questionsAnswered: 0 });
        setStreak(streak || 0);
        setLastStreakDate(lastStreakDate || null);
        setLastTaskResetDate(lastTaskResetDate || null);

        if (typeof window !== "undefined") {
          window.localStorage.setItem("dashboard-tasks", JSON.stringify(tasks));
          window.localStorage.setItem("dashboard-weeks", JSON.stringify(weeks));
          window.localStorage.setItem("dashboard-stats", JSON.stringify(stats));
          window.localStorage.setItem("dashboard-streak", String(streak || 0));
          if (lastStreakDate !== null && lastStreakDate !== undefined) {
            window.localStorage.setItem(
              "dashboard-lastStreakDate",
              lastStreakDate
            );
          } else {
            window.localStorage.removeItem("dashboard-lastStreakDate");
          }
          if (lastTaskResetDate !== null && lastTaskResetDate !== undefined) {
            window.localStorage.setItem(
              "dashboard-lastTaskResetDate",
              lastTaskResetDate
            );
          } else {
            window.localStorage.removeItem("dashboard-lastTaskResetDate");
          }
        }
      } else if (profile) {
        const initialData = {
          tasks: defaultTasks,
          weeks: initialWeeks,
          stats: { timePracticed: 0, questionsAnswered: 0 },
          streak: 0,
          lastStreakDate: null,
          lastTaskResetDate: null,
        };
        await updateProfileData({ dashboard_data: initialData });
      }

      setIsLoaded(true);
    })();
  }, []);

  const resetDailyTasks = useCallback(() => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
    const today = getCurrentDateGMT8();
    setLastTaskResetDate(today);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const today = getCurrentDateGMT8();
    if (lastTaskResetDate !== today) {
      resetDailyTasks();
    }
  }, [isLoaded, lastTaskResetDate, resetDailyTasks]);

  useEffect(() => {
    if (isLoaded) {
      const dataToSave = {
        tasks,
        weeks,
        stats,
        streak,
        lastStreakDate,
        lastTaskResetDate,
      };
      // Persist to localStorage immediately
      if (typeof window !== "undefined") {
        window.localStorage.setItem("dashboard-tasks", JSON.stringify(tasks));
        window.localStorage.setItem("dashboard-weeks", JSON.stringify(weeks));
        window.localStorage.setItem("dashboard-stats", JSON.stringify(stats));
        window.localStorage.setItem("dashboard-streak", String(streak));
        if (lastStreakDate !== null && lastStreakDate !== undefined) {
          window.localStorage.setItem(
            "dashboard-lastStreakDate",
            lastStreakDate
          );
        } else {
          window.localStorage.removeItem("dashboard-lastStreakDate");
        }
        if (lastTaskResetDate !== null && lastTaskResetDate !== undefined) {
          window.localStorage.setItem(
            "dashboard-lastTaskResetDate",
            lastTaskResetDate
          );
        } else {
          window.localStorage.removeItem("dashboard-lastTaskResetDate");
        }
      }
      debouncedSave(dataToSave);
    }
  }, [
    tasks,
    weeks,
    stats,
    streak,
    lastStreakDate,
    lastTaskResetDate,
    isLoaded,
    debouncedSave,
  ]);

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

  const resetAllData = async () => {
    const initialData = {
      tasks: defaultTasks,
      weeks: initialWeeks,
      stats: { timePracticed: 0, questionsAnswered: 0 },
      streak: 0,
      lastStreakDate: null,
      lastTaskResetDate: null,
    };
    setTasks(initialData.tasks);
    setWeeks(initialData.weeks);
    setStats(initialData.stats);
    setStreak(initialData.streak);
    setLastStreakDate(initialData.lastStreakDate);
    setLastTaskResetDate(initialData.lastTaskResetDate);
    await updateProfileData({ dashboard_data: initialData });
  };

  return {
    tasks,
    weeks,
    stats,
    streak,
    toggleTask,
    resetAllData,
    isLoaded,
  };
}
