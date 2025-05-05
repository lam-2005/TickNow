"use client";
import React from "react";
import Button from "./components/Button/Button";
import Movie from "./components/Movie/Movie";
import Slideshow from "./components/Slideshow/Slideshow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from "./components/CustomSlider/CustomSlider";
export default function Home() {
  return (
    <>
      <Slideshow />
      <div className="">
        <section className="bg-background py-10">
          <div className="container flex flex-col ">
            <h2 className="self-center">Phim Đang Chiếu</h2>
            <div
              className="grid gap-x-5 gap-y-10 mt-5 grid-cols-2
            md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4"
            >
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
            </div>
            <Button
              title="Xem tất cả"
              className="mt-10 self-center bg-transparent border-primary border-2 before:border-primary 
              text-primary  hover:text-white hover:shadow-primary hover:bg-primary"
            />
          </div>
        </section>
        <section className="bg-[url('/background.jpg')] bg-top bg-cover py-10">
          <div className="container flex flex-col">
            <h2 className="self-center">Phim Sắp Chiếu</h2>
            <CustomSlider>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
              <div className="px-2">
                <Movie />
              </div>
            </CustomSlider>
            <Button
              title="Xem tất cả"
              className="mt-10 self-center bg-primary border-primary border-0 before:border-white 
              text-white  hover:text-primary hover:shadow-white hover:bg-white"
            />
          </div>
        </section>
        <article>
          <div className="container flex flex-col py-10">
            <h2 className="self-start">Khuyến Mãi</h2>
          </div>
        </article>
      </div>
    </>
  );
}
