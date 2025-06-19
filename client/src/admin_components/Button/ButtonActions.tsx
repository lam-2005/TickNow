// ActionButton.tsx
import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: (id: string | number) => void;
  bgColor: string; 
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
    if (id !== undefined) {
      onClick(id);
    }
  };
  return (
    <button
      className={`px-3 py-1 ${bgColor} text-white rounded hover:brightness-70 transition-all duration-200 ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;