import React from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
const SkeletonLoading = () => (
  <div className="group w-full flex-column items-center gap-2.5 animate-pulse">
    <div className="w-full aspect-[2/3] relative z-9 bg-loading rounded-xl "></div>
    <h3 className="text-transparent bg-loading w-full  aspect-[10/1] h-4"></h3>
  </div>
);

const MovieLoading = () => {
  return (
    <CustomSlider xl={4} lg={3} md={2} sm={2}>
      <div className="px-2">
        <SkeletonLoading />
      </div>
      <div className="px-2">
        <SkeletonLoading />
      </div>
      <div className="px-2">
        <SkeletonLoading />
      </div>
      <div className="px-2">
        <SkeletonLoading />
      </div>
      <div className="px-2">
        <SkeletonLoading />
      </div>
    </CustomSlider>
  );
};

export default MovieLoading;
