"use client";

import { useRef, useEffect, useState } from "react";
import { drillsData, Drill } from "./drillsData";
import DrillCard from "./DrillCard";
import DrillTimer from "./DrillTimer";
import DailyRoutine from "./DailyRoutine";
import { HiOutlineSparkles } from "react-icons/hi";

export default function DrillsPage() {
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);
  const timerRef = useRef<HTMLDivElement | null>(null);

  const handleStartDrill = (drill: Drill) => {
    setSelectedDrill(drill);
  };

  useEffect(() => {
    if (selectedDrill && timerRef.current) {
      // Step 1: scroll to top first
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Step 2: after a short delay, do the halfway scroll
      const timeout = setTimeout(() => {
        const element = timerRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const absoluteElementTop = rect.top + window.pageYOffset;
        const offset = 80; // header height or desired offset

        const centerTarget =
          absoluteElementTop -
          window.innerHeight / 2 +
          rect.height / 2 -
          offset;

        const currentScroll = window.pageYOffset;
        const halfWay = currentScroll + (centerTarget - currentScroll) * 0.45;

        window.scrollTo({ top: halfWay, behavior: "smooth" });
      }, 500); // adjust delay if needed

      return () => clearTimeout(timeout);
    }
  }, [selectedDrill]);

  const handleTimerComplete = () => {
    if (selectedDrill) {
      setCompletedDrills((prev) => [...prev, selectedDrill.title]);
      setSelectedDrill(null);
    }
  };

  const handleGenerateRandom = () => {
    const allDrills = drillsData.flatMap((category) => category.drills);
    const randomDrill = allDrills[Math.floor(Math.random() * allDrills.length)];
    handleStartDrill(randomDrill);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="pt-20 text-4xl font-bold text-gray-800">
              Practice Drills
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Sharpen your skills with targeted exercises.
            </p>
          </div>
          <button
            onClick={handleGenerateRandom}
            className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            <HiOutlineSparkles className="mr-2 text-xl" />
            Random Drill
          </button>
        </div>

        <DailyRoutine />

        {drillsData.map((category) => (
          <div key={category.title} className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-red-500 pl-4">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.drills.map((drill) => (
                <DrillCard
                  key={drill.title}
                  drill={drill}
                  onStart={handleStartDrill}
                  isCompleted={completedDrills.includes(drill.title)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedDrill && (
        <div ref={timerRef}>
          <DrillTimer
            title={selectedDrill.title}
            durationInMinutes={selectedDrill.duration}
            examples={selectedDrill.examples}
            onComplete={handleTimerComplete}
            onClose={() => setSelectedDrill(null)}
          />
        </div>
      )}
    </div>
  );
}
