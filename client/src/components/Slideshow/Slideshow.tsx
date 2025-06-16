"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import Slider from "react-slick";
import { SampleArrow } from "../CustomSlider/Arrow";
import { MovieType } from "@/interfaces/movie.interface";
import { stopVideo } from "@/utils/handleUX";
import * as movieService from "@/services/movie.service";
import env from "@/configs/environment";
const Slideshow = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<MovieType[] | []>([]);
  const [fade, setFade] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    data.forEach((_, index) => {
      if (currentSlide !== index) {
        stopVideo(index);
      }
    });
  }, [currentSlide, data]);
  useEffect(() => {
    const handleResize = () => {
      setFade(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getMovieNow = async () => {
    try {
      const res = await movieService.getMovieList();
      setData(res?.data);
    } catch (error) {
      console.error("Fetch movies failed:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovieNow();
  }, []);
  const settings = {
    customPaging: function (i: number) {
      const item = data[i];
      return (
        <div
          className="lg:w-43 xl:w-55 lg:aspect-video relative lg:rounded-[6px] lg:overflow-hidden lg:transition-transform lg:duration-500 lg:shadow-white 
        md:w-2.75 max-md:w-2.5 md:aspect-square max-md:aspect-square
          "
          data-aos="zoom-in"
          data-aos-delay={(i + 1) * 100}
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
    <div className=" w-screen max-h-screen aspect-[16/9] relative z-1 *:text-white ">
      {!loading ? (
        <Slider {...settings} lazyLoad="ondemand" fade={fade}>
          {data.map((item: MovieType, i: number) => (
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
                  loading="lazy"
                />
              </div>
              <div className="w-full h-full absolute top-0 left-0 brightness-40 backdrop-blur-[0px] z-1"></div>
              <div className="container absolute left-1/2 lg:-translate-y-1/2 lg:top-9/20 -translate-x-1/2 z-2 flex items-center max-lg:bottom-10">
                <div className="lg:w-[40%] flex flex-col items-start gap-4 max-md:gap-2">
                  <h1
                    className="line-clamp-2"
                    title="Phim"
                    data-aos="fade-right"
                    data-aos-delay={100}
                  >
                    {item.name}
                  </h1>
                  <div className="flex items-center gap-2.5 text-white ">
                    <span
                      data-aos="fade-up"
                      data-aos-delay={100}
                      className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white"
                    >
                      {item.age}+
                    </span>
                    <span
                      data-aos="fade-up"
                      data-aos-delay={200}
                      className="w-px h-3.5 bg-subtitle block"
                      aria-hidden="true"
                    ></span>

                    <span
                      data-aos="fade-up"
                      data-aos-delay={300}
                      className="text-white"
                    >
                      {item.duration} phút
                    </span>
                    <span
                      data-aos="fade-up"
                      data-aos-delay={200}
                      className="w-px h-3.5 bg-subtitle block"
                      aria-hidden="true"
                    ></span>
                    <span
                      data-aos="fade-up"
                      className="text-white"
                      data-aos-delay={400}
                    >
                      {"Đang cập nhật"}
                    </span>
                  </div>
                  <p
                    title="Phim"
                    className="text-white line-clamp-5 text-justify font-medium max-lg:hidden
                "
                    data-aos="fade-right"
                    data-aos-delay={300}
                  >
                    {item.description}
                  </p>
                  <div className="flex gap-5">
                    <Button
                      dataAos="fade-up"
                      dataAosDelay={100}
                      title="Đặt vé ngay"
                      className="text-xl font-semibold lg:w-[200px] relative"
                    />
                    <Button
                      dataAos="fade-up"
                      dataAosDelay={100}
                      title="Xem trailer"
                      className="text-xl  bg-transparent border-1 border-white lg:hidden"
                    />
                  </div>
                </div>
                <div
                  className="flex-1 flex gap-5 justify-end max-lg:hidden"
                  data-aos="fade-left"
                  data-aos-delay={200}
                >
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
      ) : (
        <div className="relative w-full h-full bg-loading animate-pulse"></div>
      )}
    </div>
  );
};

export default Slideshow;
