"use client";
import env from "@/configs/environment";
import { MovieType } from "@/interfaces/movie.interface";
import { stopVideo } from "@/utils/handleUX";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { SampleArrow } from "../CustomSlider/Arrow";
import Slider from "react-slick";
import Button from "../Button/Button";

const SliderList = ({ data }: { data: Promise<MovieType[]> }) => {
  const getMovie = use(data);
  const [fade, setFade] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  useEffect(() => {
    getMovie.forEach((_, index) => {
      if (currentSlide !== index) {
        stopVideo(index);
      }
    });
  }, [currentSlide, getMovie]);
  useEffect(() => {
    const handleResize = () => {
      setFade(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    customPaging: function (i: number) {
      const item = getMovie[i];
      return (
        <div
          className="lg:w-43 xl:w-55 lg:aspect-video relative lg:rounded-[6px] lg:overflow-hidden lg:transition-transform lg:duration-500 lg:shadow-white 
        md:w-2.75 max-md:w-2.5 md:aspect-square max-md:aspect-square
          "
        >
          <Image
            src={`${env.IMG_API_URL}/banner/${item.banner}`}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 180px, 250px"
            className="brightness-25 object-cover max-lg:hidden"
          />
          <p className="line-clamp-2 absolute bottom-[10px] left-0 px-4 text-center w-full font-bold transition-all text-subtitle max-lg:hidden">
            {item.name}
          </p>
          <div className="lg:hidden xl:hidden size-full bg-white rounded-[50%]"></div>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    initialSlide: 0,
    autoplaySpeed: 5000,
    autoplay: true,
    lazyLoad: "progressive",
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
    nextArrow: (
      <SampleArrow
        type={0}
        styleBtn="absolute top-1/2 right-0 z-800 -translate-x-[10px] [&_span]:text-5xl -translate-y-1/2 [&_span]:max-[730px]:text-3xl [&_span]:max-sm:text-2xl max-[670px]:translate-x-[10px] lg:hidden [&_span]:text-white"
      />
    ),
    prevArrow: (
      <SampleArrow
        type={1}
        styleBtn="absolute top-1/2 left-0 z-800 translate-x-[10px] [&_span]:text-5xl -translate-y-1/2 [&_span]:max-[730px]:text-3xl [&_span]:max-sm:text-2xl max-[670px]:translate-x-[-5px] lg:hidden [&_span]:text-white"
      />
    ),
  };
  return (
    <Slider {...settings} lazyLoad="ondemand" fade={fade}>
      {getMovie.map((item: MovieType, i: number) => (
        <div
          key={item._id}
          className="relative w-full h-full max-h-screen aspect-[16/9]"
        >
          <div className="w-full h-full relative">
            <Image
              src={`${env.IMG_API_URL}/banner/${item.banner}`}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              loading={i !== 0 ? "lazy" : undefined}
              priority={i === 0}
            />
          </div>
          <div className="w-full h-full absolute top-0 left-0 brightness-40 backdrop-blur-[0px] z-1"></div>
          <div className="container absolute left-1/2 lg:-translate-y-1/2 lg:top-9/20 -translate-x-1/2 z-2 flex items-center max-lg:bottom-10">
            <div className="lg:w-[40%] flex flex-col items-start gap-4 max-md:gap-2">
              <h1 className="line-clamp-2" title="Phim">
                {item.name}
              </h1>
              <div className="flex items-center gap-2.5 text-white ">
                <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                  {item.age}+
                </span>
                <span
                  className="w-px h-3.5 bg-subtitle block"
                  aria-hidden="true"
                ></span>

                <span className="text-white">{item.duration} phút</span>
                <span
                  className="w-px h-3.5 bg-subtitle block"
                  aria-hidden="true"
                ></span>
                <span className="text-white">{"Đang cập nhật"}</span>
              </div>
              <p
                title="Phim"
                className="text-white line-clamp-5 text-justify font-medium max-lg:hidden
                "
              >
                {item.description}
              </p>
              <div className="flex gap-5">
                <Button
                  title="Đặt vé ngay"
                  className="text-xl font-semibold lg:w-[200px] relative"
                />
                <Button
                  title="Xem trailer"
                  className="text-xl  bg-transparent border-1 border-white lg:hidden"
                />
              </div>
            </div>
            <div className="flex-1 flex gap-5 justify-end max-lg:hidden">
              <iframe
                id={`iframe-${i}`}
                className={`rounded-2xl aspect-[16/9] lg:w-[450px] xl:w-[560px] `}
                src={`${item.trailer}?autoplay=1&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;  encrypted-media;"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SliderList;
