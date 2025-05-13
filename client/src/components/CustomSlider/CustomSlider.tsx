import React from "react";
import Slider from "react-slick";
import { SampleArrow } from "./Arrow";
import SliderProps from "@/interfaces/slider.interface";

const CustomSlider = ({
  slidesToShow = 5,
  slidesToScroll = 5,
  infinite = false,
  children,
  xl,
  lg,
  md,
  sm,
  dots,
  appendDots,
  customPaging,
}: SliderProps) => {
  const settings = {
    infinite,
    centerMode: false,
    speed: 500,
    slidesToShow,
    dots,
    slidesToScroll,
    initialSlide: 0,
    nextArrow: (
      <SampleArrow
        type={0}
        styleBtn="sm:size-11.25 max-sm:size-9 lg:bg-[rgba(255,255,255,.3)] bg-white
      text-lg rounded-[50%] absolute top-1/2 right-0 z-10 -translate-y-[70px] sm:translate-x-[20px] max-sm:translate-x-[15px]
      flex-center text-black hover:bg-white "
      />
    ),
    prevArrow: (
      <SampleArrow
        type={1}
        styleBtn="sm:size-11.25 max-sm:size-9 lg:bg-[rgba(255,255,255,.3)] bg-white text-lg rounded-[50%] 
      flex-center text-black hover:bg-white absolute top-1/2 left-0 z-10
      -translate-y-[70px] sm:-translate-x-[20px] max-sm:-translate-x-[10px]"
      />
    ),
    appendDots,
    customPaging,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: xl,
          initialSlide: 0,
          slidesToScroll: xl,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: lg,
          slidesToScroll: lg,
          initialSlide: 0,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: md,
          initialSlide: 0,
          slidesToScroll: md,
          infinite: false,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm,
          initialSlide: 0,
          infinite: false,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default CustomSlider;
