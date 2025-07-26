import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import { SkeletonLoading } from "@/components/Loading/MovieLoading";
import React from "react";

const Loading = () => {
  return (
    <div>
      {" "}
      <BackgroundPage
        image="background_movie.webp"
        title="Phim chiếu rạp"
      ></BackgroundPage>
      <div className="grid container grid-cols-5 gap-5 mt-20 max-sm:mt-5">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    </div>
  );
};

export default Loading;
