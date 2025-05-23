import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import { FaPlay } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";
const Movie = ({
  name,
  image,
  textColor,
}: {
  name: string;
  image: string;
  textColor?: string;
}) => {
  return (
    <div className="group w-full flex-column items-center gap-2.5">
      <div
        className="w-full aspect-[2/3] relative z-9 
    "
      >
        <div className="w-full h-full relative rounded-xl overflow-hidden">
          <Image
            fill
            src={`/movies/${image}`}
            alt="Phim"
            sizes="300px"
            className="object-cover 
        group-hover:scale-110 transition-transform duration-300 "
          />
        </div>
        <div className=" flex absolute -bottom-5 w-full justify-evenly z-10">
          <button
            className="group/button bg-primary rounded-full sm:size-11.25 max-sm:size-9 flex-center shadow-lg shadow-black/20
      hover:bg-white transition-colors duration-500"
          >
            <span className="text-[1rem] group-hover/button:text-primary block transition-colors duration-500 text-white">
              <FaPlay />
            </span>
          </button>
          <button
            className="group/button bg-primary rounded-full sm:size-11.25 max-sm:size-9 flex-center shadow-lg shadow-black/20
      hover:bg-white transition-colors duration-500"
          >
            <span className="group-hover/button:text-primary block transition-colors duration-500 text-2xl text-white">
              <TiInfoLarge />
            </span>
          </button>
        </div>
      </div>
      <h3
        className={`font-semibold line-clamp-1 px-2.5 
    group-hover:text-primary transition-colors duration-500 mt-4 ${textColor}`}
      >
        {name}
      </h3>
      <Button title="Đặt vé ngay" />
    </div>
  );
};

export default Movie;
