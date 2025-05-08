import React from "react";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./Arrow";

interface SliderProps {
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  dots?: boolean;
  customPaging?: (i?: number) => React.ReactElement;
  appendDots?: (dots: React.ReactNode) => React.ReactElement;

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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
