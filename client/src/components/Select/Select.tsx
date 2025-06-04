"use client";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";

export const SelectField = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="h-full flex items-center w-[330px] justify-between px-5 gap-5">
      <span className="text-xl">{icon}</span>
      <span className="line-clamp-1">{label}</span>
      <span>
        <FaChevronDown />
      </span>
    </div>
  );
};
const Select = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`h-[80px] bg-background-card rounded-[100px] w-fit flex [&_div]:not-first:border-l-1 [&_div]:not-first:border-foreground shadow-foreground  ${
        theme === "light" && "shadow-lg"
      }`}
    >
      {children}
    </div>
  );
};

export default Select;
