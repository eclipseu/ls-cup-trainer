"use client";

import { ChangeEvent } from "react";

interface EditableSectionProps {
  title?: string;
  subtitle?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  isTextarea?: boolean;
  className?: string;
}

export default function EditableSection({
  title,
  subtitle,
  value,
  onChange,
  hint,
  isTextarea = true,
  className = "",
}: EditableSectionProps) {
  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(e.target.value);
    if (isTextarea) {
      // Auto-resize textarea
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const inputStyles = `w-full bg-transparent focus:outline-none resize-none p-2 -m-2 rounded-md 
focus:bg-gray-100 transition-colors duration-200 text-gray-800 ${className}`;

  return (
    <div className="mb-12 print:mb-6">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 print:text-xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <h3 className="text-xl font-semibold text-gray-700 mb-3 print:text-lg">
          {subtitle}
        </h3>
      )}
      {isTextarea ? (
        <textarea
          value={value}
          onChange={handleInputChange}
          className={`${inputStyles} leading-relaxed text-lg min-h-[120px] print:min-h-0 print:text-base`}
          style={{ lineHeight: "2" }}
          placeholder={hint}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className={`${inputStyles} text-center`}
          placeholder={hint}
        />
      )}
      {hint && isTextarea && (
        <p className="text-sm text-gray-400 mt-2 italic print:hidden">{hint}</p>
      )}
    </div>
  );
}
