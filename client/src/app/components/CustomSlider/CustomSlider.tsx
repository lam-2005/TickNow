import React from "react";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./Arrow";
interface SliderProps {
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  children: React.ReactNode;
}
const CustomSlider = ({
  slidesToShow = 5,
  slidesToScroll = 5,
  infinite = false,
  children,
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
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default CustomSlider;
