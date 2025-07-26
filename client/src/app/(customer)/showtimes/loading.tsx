import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import LoadingSkeleton from "@/components/ShowtimeList/LoadingSkeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <BackgroundPage
        image="background_movie.webp"
        title="Lịch chiếu phim"
      ></BackgroundPage>

      <LoadingSkeleton className="mt-20 max-sm:mt-5" />
    </>
  );
};

export default Loading;
