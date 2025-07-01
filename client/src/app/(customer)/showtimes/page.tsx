"use client";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import React, { useState } from "react";

const Showtimes = () => {
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
