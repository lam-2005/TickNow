import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupContainer = ({
  closeForm,
  title,
  children,
}: {
  closeForm: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed z-1000 w-screen h-screen bg-[rgba(0,_0,_0,_0.5)] inset-0">
      <div
        className="absolute inset-0 w-full h-full z-1001"
        onClick={closeForm}
      ></div>
      <div className="bg-background-card absolute-center w-fit max-h-9/10 rounded-2xl flex-column z-1002 min-w-2xs">
        <button
          className="absolute top-0 right-0 translate-y-5 -translate-x-5 cursor-pointer"
          onClick={closeForm}
        >
          <span className="text-2xl">
            <IoMdClose />
          </span>
        </button>
        <h1 className="text-2xl uppercase font-bold p-5 text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PopupContainer;
