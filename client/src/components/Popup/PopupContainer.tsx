import React from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const PopupContainer = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return createPortal(
    <div className="min-w-screen min-h-screen w-full h-full fixed top-0 left-0 z-1500">
      <div
        className="w-full h-full bg-[rgba(0,0,0,0.7)] backdrop-blur-xs"
        onClick={onClose}
      ></div>
      <div className="max-w-[880px] absolute top-1/2 left-1/2 -translate-1/2 w-full flex-column items-center gap-2.5 p-5 rounded-[10px] bg-background-card">
        <button
          className="absolute top-0 right-0 translate-y-5 -translate-x-5"
          onClick={onClose}
        >
          <span className="text-2xl">
            <IoMdClose />
          </span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default PopupContainer;
