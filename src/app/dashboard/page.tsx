"use client";

import { motion } from "framer-motion";
import { HiAcademicCap, HiFire } from "react-icons/hi";
import { useDashboardState } from "../dashboard/hooks/useDashboardState";
import ProgressSection from "../dashboard/components/ProgressSection";
import DailyTasks from "../dashboard/components/DailyTasks";
import StatsAndActions from "../dashboard/components/StatsAndActions";

export default function Dashboard() {
  const { tasks, weeks, stats, streak, toggleTask, resetAllData } =
    useDashboardState();

  const currentWeekNumber = weeks.find((w) => w.current)?.number || 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-white to-red-50 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-red-800"
          >
            Training Dashboard
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-full flex items-center space-x-2"
            >
              <HiFire className="text-red-600" />
              <span>Streak: {streak} / 7</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full"
            >
              <HiAcademicCap className="text-red-600" />
              <span>Week {currentWeekNumber} of 6</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProgressSection weeks={weeks} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <DailyTasks tasks={tasks} toggleTask={toggleTask} />
          <StatsAndActions stats={stats} resetAllData={resetAllData} />
        </motion.div>
      </motion.div>
    </div>
  );
}
