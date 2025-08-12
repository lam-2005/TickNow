"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
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
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-2000 bottom-7.5 right-5 size-12.5 rounded-full bg-foreground text-primary flex-center"
        >
          <FaArrowUp size={25} />
        </button>
      )}
    </>
  );
}

export default GoToTopButton;
