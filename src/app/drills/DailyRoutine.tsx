"use client";

import { motion } from "framer-motion";
import { dailyRoutine } from "./drillsData";
import { HiArrowRight } from "react-icons/hi";

export default function DailyRoutine() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-12 border-t-4 border-red-500 relative overflow-hidden"
    >
      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-50/30 via-transparent to-blue-50/30"
        animate={{
          x: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Suggested Daily Flow
        </motion.h2>
        
        {/* Mobile layout - vertical stack */}
        <div className="block sm:hidden space-y-4">
          {dailyRoutine.map((item, index) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="text-center p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 cursor-pointer transition-all duration-300"
            >
              <div className="text-red-600 font-bold text-lg">
                {item.duration} mins
              </div>
              <div className="text-gray-800 font-semibold mt-1">
                {item.name}
              </div>
              <div className="text-xs text-gray-500">{item.details}</div>
            </motion.div>
          ))}
        </div>

        {/* Desktop layout - horizontal with arrows */}
        <div className="hidden sm:flex items-center justify-center space-x-6">
          {dailyRoutine.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="text-center p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 cursor-pointer transition-all duration-300 min-w-[140px]"
              >
                <div className="text-red-600 font-bold text-lg">
                  {item.duration} mins
                </div>
                <div className="text-gray-800 font-semibold mt-1">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500">{item.details}</div>
              </motion.div>
              
              {/* Arrow between items */}
              {index < dailyRoutine.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  className="mx-4"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-red-400"
                  >
                    <HiArrowRight className="text-3xl" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
