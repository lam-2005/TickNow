"use client";
import React from "react";

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const AddPopup: React.FC<Props> = ({ title, onClose, children }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "add-popup-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="add-popup-overlay"
      className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AddPopup;
