"use client";
import { useTheme } from "@/hooks/contexts/useTheme";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button
        className="transition-colors duration-300 flex-center"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <FaMoon className="bg-black text-white size-8 p-1.5 rounded-full transition-colors duration-300" />
        ) : (
          <FaSun className="bg-white text-black size-8 p-1.5 rounded-full transition-colors duration-300" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
