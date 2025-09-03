// FrameworkGuide.tsx
"use client";

export default function FrameworkGuide() {
  const steps = [
    { label: "A", title: "Acknowledge", desc: "That’s a great question..." },
    { label: "M", title: "Main Idea", desc: "It's about solving problems..." },
    { label: "C", title: "Connection", desc: "As a Lasallian..." },
    { label: "I", title: "Impact", desc: "Not just a student of tech..." },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-red-700 mb-2">
        A→M→C→I Framework Guide
      </h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        {steps.map((step) => (
          <div key={step.label} className="bg-red-100 p-3 rounded-lg">
            <div className="w-8 h-8 mx-auto rounded-full bg-red-500 text-white flex items-center justify-center font-bold mb-1">
              {step.label}
            </div>
            <p className="text-xs font-medium text-red-800">{step.title}</p>
            <p className="text-xs text-red-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
