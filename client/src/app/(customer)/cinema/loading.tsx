import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import React from "react";

const Loading = () => {
  return (
    <>
      <BackgroundPage
        image="background_cinema.webp"
        title="Rạp chiếu"
      ></BackgroundPage>
      <div className="mt-17.5 container">
        <h2 className="text-center mt-20 max-sm:mt-5 w-[200px] bg-loading animate-pulse"></h2>
        <div className="mt-7.5 grid grid-cols-4 justify-center gap-7.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <div className="w-full bg-loading animate-pulse rounded-md h-[325px]"></div>
          <div className="w-full bg-loading animate-pulse rounded-md h-[325px]"></div>
          <div className="w-full bg-loading animate-pulse rounded-md h-[325px]"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
