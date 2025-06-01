import React from "react";

const Movies = () => {
  return (
    <div className="">
      <div className="relative w-screen h-[40vh] max-lg:h-[50vh] bg-[url('/background_cinema.jpg')] bg-cover bg-center bg-no-repeat flex ">
        <div className="w-full h-full backdrop-blur-xs brightness-50 absolute top-0 left-0 z-10"></div>
        <h1 className="absolute-center text-white z-11 text-4xl font-medium text-nowrap">
          Phim chiếu rạp
        </h1>
        <div
          className="md:w-[650px] lg:h-[70px] md:h-[65px] sm:w-[600px] h-[55px] w-[90vw] rounded-[99px] bg-background-card absolute z-11 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 overflow-hidden flex shadow-black/50
        shadow-lg dark:shadow-gray-500/50"
        >
          <div className="w-1/3 h-full  cursor-pointer"></div>
          <div className="w-px h-full bg-subtitle"></div>
          <div className="w-1/3 h-full  cursor-pointer"></div>
          <div className="w-px h-full bg-subtitle"></div>
          <div className="w-1/3 h-full  cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
