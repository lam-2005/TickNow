// ActionButton.tsx
import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: (id?: string | number) => void;
  bgColor?: "warning" | "success" | "error" | "bg-yellow-500";
  id?: string | number;
  className?: string;
}
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  bgColor,
  id,
  className = "",
}) => {
  const handleClick = () => {
    onClick(id);
  };
  let colorBtn = "bg-primary";
  if (bgColor === "warning") {
    colorBtn = "bg-warning";
  } else if (bgColor === "success") {
    colorBtn = "bg-success";
  } else if (bgColor === "error") {
    colorBtn = "bg-error";
  }
  return (
    <button
      className={`px-3 py-1 text-nowrap ${colorBtn} text-white rounded hover:brightness-70 transition-all duration-200 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
