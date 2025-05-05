"use client";
import React from "react";
import Button from "./components/Button/Button";
import Movie from "./components/Movie/Movie";
import Slideshow from "./components/Slideshow/Slideshow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from "./components/CustomSlider/CustomSlider";
import Link from "next/link";
import Offer from "./components/Offer/Offer";
export default function Home() {
  return (
    <>
      <Slideshow />
      <div className="">
        <section className="bg-background py-10">
          <div className="container flex flex-col ">
            <h2 className="self-center mb-5">Phim Đang Chiếu</h2>
            <CustomSlider xl={4} lg={3} md={2} sm={2}>
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
              className="mt-10 self-center bg-transparent border-primary border-2 before:border-primary 
              text-primary  hover:text-white hover:shadow-primary hover:bg-primary"
            />
          </div>
        </section>
        <section className="bg-[url('/background.jpg')] bg-top bg-cover py-10">
          <div className="container flex flex-col">
            <h2 className="self-center mb-5">Phim Sắp Chiếu</h2>
            <CustomSlider xl={4} lg={3} md={2} sm={2}>
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
            <div className="flex justify-between items-center mb-5 px-2">
              <h2 className="self-start">Khuyến Mãi</h2>
              <Link
                href={"#"}
                className="hover:text-primary transition-colors duration-500"
              >
                Xem tất cả
              </Link>
            </div>
            <CustomSlider
              slidesToScroll={4}
              slidesToShow={4}
              xl={3}
              lg={2}
              md={2}
              sm={1}
            >
              <div className="px-2">
                <Offer />
              </div>
              <div className="px-2">
                <Offer />
              </div>
              <div className="px-2">
                <Offer />
              </div>
              <div className="px-2">
                <Offer />
              </div>
              <div className="px-2">
                <Offer />
              </div>
            </CustomSlider>
          </div>
        </article>
      </div>
    </>
  );
}
