import React from "react";

export const SkeletonLoading = () => (
  <div className="group w-full flex-column items-center gap-2.5 animate-pulse">
    <div className="w-full aspect-[2/3] relative z-9 bg-loading rounded-xl "></div>
    <h3 className="text-transparent bg-loading w-full  aspect-[10/1] h-4"></h3>
  </div>
);

const MovieLoading = () => {
  return (
    <div
      className={`grid gap-4 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 `}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className={`
        ${index >= 2 && "hidden md:block"}
        ${index >= 3 && "md:hidden lg:block"}
        ${index >= 4 && "lg:hidden xl:block"}
        ${index >= 5 && "xl:hidden"}
      `}
          key={index}
        >
          <SkeletonLoading />
        </div>
      ))}
    </div>
    // <div className="[&>slick-track]:flex!">
    //   <CustomSlider xl={4} lg={3} md={2} sm={2}>
    //     <div className="px-2">
    //       <SkeletonLoading />
    //     </div>
    //     <div className="px-2">
    //       <SkeletonLoading />
    //     </div>
    //     <div className="px-2">
    //       <SkeletonLoading />
    //     </div>
    //     <div className="px-2">
    //       <SkeletonLoading />
    //     </div>
    //     <div className="px-2">
    //       <SkeletonLoading />
    //     </div>
    //   </CustomSlider>
    // </div>
  );
};

export default MovieLoading;
