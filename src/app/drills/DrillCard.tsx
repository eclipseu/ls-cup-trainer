"use client";

import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 border-2 relative overflow-hidden ${
        isCompleted
          ? "border-green-500 bg-green-50/80"
          : "border-transparent hover:border-red-500 hover:shadow-2xl"
      }`}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-blue-50/30"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`p-3 rounded-full mr-4 ${
              isCompleted ? "bg-green-200" : "bg-red-100"
            }`}
          >
            <Icon
              className={`text-2xl ${
                isCompleted ? "text-green-700" : "text-red-600"
              }`}
            />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800">{drill.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{drill.description}</p>
      </div>
      
      <div className="flex justify-between items-center mt-4 relative z-10">
        <span className="text-sm font-semibold text-gray-500">
          {drill.duration} mins
        </span>
        {isCompleted ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex items-center text-green-600 font-semibold"
          >
            <HiCheckCircle className="mr-2 text-xl" />
            Completed
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart(drill)}
            className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <HiPlay className="mr-1" />
            Start
          </motion.button>
        )}
      </div>

      {/* Completion indicator line */}
      {isCompleted && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-1 bg-green-500"
        />
      )}
    </motion.div>
  );
}
