"use client";
import { useTheme } from "@/hooks/contexts/useTheme";
import React, { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

export const SelectField = ({
  icon,
  label,
  children,
  onToggle,
  isOpen,
  id,
  onClose,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  onToggle: (id: string) => void;
  isOpen: boolean;
  id: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-dropdown="${id}"]`)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, id, onClose]);
  return (
    <div className="relative select-none" data-dropdown={id}>
      <div
        className="h-full flex items-center w-[330px] justify-between px-5 gap-5 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
      >
        <span className="text-xl">{icon}</span>
        <span className="line-clamp-1">{label}</span>
        <span>
          <FaChevronDown />
        </span>
      </div>
      {isOpen && children}
    </div>
  );
};
const Select = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-[80px] bg-background-card rounded-[100px] w-fit flex [&>div]:not-first:border-l-1 [&>div]:not-first:border-foreground shadow-foreground  ${
        theme === "light" && "shadow-lg"
      }`}
    >
      {children}
    </div>
  );
};

export default Select;
