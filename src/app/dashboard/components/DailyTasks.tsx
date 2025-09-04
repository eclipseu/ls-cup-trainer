"use client";

import { motion } from "framer-motion";
import { Task } from "../types";
import { HiCheckCircle, HiClock } from "react-icons/hi";

interface DailyTasksProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
}

export default function DailyTasks({ tasks, toggleTask }: DailyTasksProps) {
  const tasksCompleted = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  const taskVariants = {
    hidden: { opacity: 0, x: -20 },
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="bg-white rounded-2xl shadow-sm p-6 border border-red-100"
    >
      <h2 className="text-xl font-semibold text-red-800 mb-4">
        Today&apos;s Tasks
      </h2>
      <p className="text-gray-600 mb-6">
        Complete your daily training to stay on track
      </p>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            custom={index}
            variants={taskVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              x: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
            className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
              task.completed
                ? "bg-red-50 border-red-200"
                : "bg-white border-gray-200 hover:border-red-300"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-4 ${
                task.completed
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {task.completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <HiCheckCircle className="text-xs" />
                </motion.div>
              )}
            </motion.div>
            <div className="flex-1">
              <h3
                className={`font-medium ${
                  task.completed ? "text-red-700 line-through" : "text-gray-800"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <HiClock className="mr-1" />
                <span>{task.timeEstimate} mins</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            {tasksCompleted} of {totalTasks} tasks completed
          </span>
          <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(tasksCompleted / totalTasks) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" as const, delay: 0.5 }}
              className="bg-red-500 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
