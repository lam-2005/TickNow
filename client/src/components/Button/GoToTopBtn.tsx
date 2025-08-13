"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-[2000] bottom-7.5 right-5 size-12.5 rounded-full bg-foreground text-primary flex-center
        transition-all duration-300 ease-in-out
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
    >
      <FaArrowUp size={25} />
    </button>
  );
}

export default GoToTopButton;
