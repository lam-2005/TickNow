import React from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
const SkeletonLoading = () => (
  <div className="w-full group animate-pulse">
    <div className="relative w-full aspect-[7/4] rounded-2xl overflow-hidden bg-loading"></div>
    <div className="px-2 mt-2 flex-column gap-[5px]">
      <div className="bg-loading w-[40%] h-5  rounded-full"></div>
      <div className="w-full aspect-[10/1] bg-loading rounded-full"></div>
      <div className="w-full aspect-[10/1] bg-loading rounded-full"></div>
    </div>
  </div>
);
const OfferLoading = () => {
  return (
    <CustomSlider
      slidesToScroll={4}
      slidesToShow={4}
      xl={3}
      lg={2}
      md={2}
      sm={1}
    >
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

export default OfferLoading;
