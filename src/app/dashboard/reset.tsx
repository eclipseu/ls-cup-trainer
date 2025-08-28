"use client";

interface ResetProps {
  onReset: () => void;
}

export default function Reset({ onReset }: ResetProps) {
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all your progress? This cannot be undone."
    );
    if (confirmReset) onReset();
  };

  return (
    <button
      onClick={handleReset}
      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
    >
      Reset Data
    </button>
  );
}
