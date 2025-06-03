import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import React from "react";

const Showtimes = () => {
  return (
    <div>
      <BackgroundPage title="Lịch chiếu phim" image="background_movie.jpg" />
      <Showtimelist />
    </div>
  );
};

export default Showtimes;
