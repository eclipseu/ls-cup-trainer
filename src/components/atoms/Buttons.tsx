interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string; // Add this line
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "", // Add this line with default value
}: ButtonProps) {
  const base = "px-4 py-2 rounded-md font-medium";
  const styles =
    variant === "primary"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
