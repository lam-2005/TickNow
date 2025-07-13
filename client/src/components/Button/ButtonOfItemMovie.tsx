"use client";
import usePopup from "@/hooks/usePopup";
import React from "react";
import { FaPlay } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";
import TrailerPopup from "../Popup/TrailerPopup";
import InfoPopup from "../Popup/InfoPopup";
import { MovieType } from "@/interfaces/movie.interface";

const ButtonInfo = ({
  className,
  info,
}: {
  className?: string;
  info: MovieType;
}) => {
  const { infoPopup, closeInfo, openInfo } = usePopup();
  return (
    <>
      {infoPopup && <InfoPopup info={info} onClose={closeInfo} />}
      <button
        className={`group/button bg-primary rounded-full sm:size-11.25 max-sm:size-9 flex-center shadow-lg shadow-black/20
        hover:bg-white transition-colors duration-500 ${className}`}
        onClick={openInfo}
      >
        <span className="group-hover/button:text-primary block transition-colors duration-500 text-2xl text-white">
          <TiInfoLarge />
        </span>
      </button>
    </>
  );
};
const ButtonPlay = ({
  className,
  nameMovie,
  trailer,
}: {
  className?: string;
  nameMovie: string;
  trailer: string;
}) => {
  const { trailerPopup, openTrailer, closeTrailer } = usePopup();
  return (
    <>
      {trailerPopup && (
        <TrailerPopup name={nameMovie} url={trailer} onClose={closeTrailer} />
      )}
      <button
        className={`group/button bg-primary rounded-full sm:size-11.25 max-sm:size-9 flex-center shadow-lg shadow-black/20
        hover:bg-white transition-colors duration-500 ${className}`}
        onClick={openTrailer}
      >
        <span className="text-[1rem] group-hover/button:text-primary block transition-colors duration-500 text-white">
          <FaPlay />
        </span>
      </button>
    </>
  );
};
export { ButtonInfo, ButtonPlay };
