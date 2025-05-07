import React from "react";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./Arrow";
interface SliderProps {
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  children: React.ReactNode;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
}
const CustomSlider = ({
  slidesToShow = 5,
  slidesToScroll = 5,
  infinite = false,
  children,
  xl,
  lg,
  md,
  sm,
}: SliderProps) => {
  const settings = {
    infinite,
    centerMode: false,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: xl,
          slidesToScroll: xl,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: lg,
          slidesToScroll: lg,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: md,
          slidesToScroll: md,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm,
          initialSlide: 1,
          infinite: false,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default CustomSlider;
