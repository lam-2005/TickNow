import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import { getMovieList } from "@/services/movie.service";
import React, { use } from "react";
const getListShowtime = async () => {
  try {
    const res = await getMovieList("/schedue");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
const Showtimes = () => {
  const showtimeList = getListShowtime();

  return (
    <div>
      <BackgroundPage image="background_movie.webp" title="Lịch chiếu phim">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"></div>
      </BackgroundPage>
      <Showtimelist />
    </div>
  );
};

export default Showtimes;
