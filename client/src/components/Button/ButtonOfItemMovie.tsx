import React from "react";
import { FaPlay } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";

const ButtonInfo = () => {
  return (
    <button
      className="group/button bg-primary rounded-full sm:size-11.25 max-sm:size-9 flex-center shadow-lg shadow-black/20
      hover:bg-white transition-colors duration-500"
    >
      <span className="group-hover/button:text-primary block transition-colors duration-500 text-2xl text-white">
        <TiInfoLarge />
      </span>
    </button>
  );
};
const ButtonPlay = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="group/button bg-primary rounded-full sm:size-11.25 max-sm:size-9 flex-center shadow-lg shadow-black/20
      hover:bg-white transition-colors duration-500"
      onClick={onClick}
    >
      <span className="text-[1rem] group-hover/button:text-primary block transition-colors duration-500 text-white">
        <FaPlay />
      </span>
    </button>
  );
};
export { ButtonInfo, ButtonPlay };
