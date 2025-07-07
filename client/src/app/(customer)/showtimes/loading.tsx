import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import LoadingSkeleton from "@/components/ShowtimeList/LoadingSkeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <BackgroundPage image="background_movie.webp" title="Lịch chiếu phim">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"></div>
      </BackgroundPage>

      <LoadingSkeleton className="mt-20" />
    </>
  );
};

export default Loading;
