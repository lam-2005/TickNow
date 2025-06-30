import React, { Suspense } from "react";
import * as movieService from "@/services/movie.service";
import SliderList from "./Slider";

const getMovieNow = async () => {
  try {
    const res = await movieService.getMovieList("?status=1&limit=5");
    return res?.data.movie;
  } catch (error) {
    console.error("Fetch movies failed:", error);
  }
};
const Slideshow = () => {
  const getMovieSlide = getMovieNow();

  return (
    <div className=" w-screen max-h-screen aspect-[16/9] relative z-1 *:text-white ">
      <Suspense
        fallback={
          <div className="relative w-full h-full bg-loading animate-pulse"></div>
        }
      >
        <SliderList data={getMovieSlide} />
      </Suspense>
    </div>
  );
};

export default Slideshow;
