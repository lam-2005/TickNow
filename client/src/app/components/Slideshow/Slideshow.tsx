"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import Slider from "react-slick";

export interface Movies {
  id?: number | string;
  name: string;
  date: string;
  director: string;
  nation: string;
  age: number | string;
  category: string;
  language: string;
  time: number | string;
  text_summary: string;
  status: number | string;
  image: File | null;
  banner: File | null;
  trailer: string;
}

const Slideshow = () => {
  const [data, setData] = useState<Movies[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/movies?_limit=5");
      const getData = await res.json();
      setData(getData);
    };
    fetchData();
  }, []);
  if (!data) return <p>Loading</p>;
  console.log(data);
  const settings = {
    customPaging: function (i: number) {
      const item = data[i];
      return (
        <div
          className="max-xl:w-43 xl:w-55 aspect-video relative rounded-[6px] overflow-hidden transition-transform duration-500 shadow-white"
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <Image
            src={`/banner/${item.banner}`}
            alt=""
            fill
            className="brightness-25 object-cover"
          />
          <p className="line-clamp-2 absolute bottom-[10px] left-0 px-4 text-center w-full font-bold transition-all text-subtitle">
            {item.name}
          </p>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" w-full max-h-screen aspect-[16/9] relative z-1">
      <Slider
        {...settings}
        fade={true}
        initialSlide={0}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {data.map((item: Movies) => (
          <div key={item.id} className="w-full  max-h-screen aspect-[16/9]">
            <div className="w-full h-full">
              <Image
                src={`/banner/${item.banner}`}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-full absolute top-0 left-0 brightness-40 backdrop-blur-[0px] z-1"></div>
            <div className="container absolute left-1/2 lg:-translate-y-1/2 lg:top-9/20 -translate-x-1/2 z-2 flex items-center max-lg:bottom-5">
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
                    className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic"
                  >
                    {item.age}+
                  </span>
                  <span
                    data-aos="fade-up"
                    data-aos-delay={200}
                    className="w-px h-3.5 bg-subtitle block"
                    aria-hidden="true"
                  ></span>

                  <span data-aos="fade-up" data-aos-delay={300}>
                    {item.time}min
                  </span>
                  <span
                    data-aos="fade-up"
                    data-aos-delay={200}
                    className="w-px h-3.5 bg-subtitle block"
                    aria-hidden="true"
                  ></span>
                  <span data-aos="fade-up" data-aos-delay={400}>
                    {item.category}
                  </span>
                </div>
                <p
                  title="Phim"
                  className="text-white line-clamp-5 text-justify font-medium max-lg:hidden
                "
                  data-aos="fade-right"
                  data-aos-delay={300}
                >
                  {item.text_summary}
                </p>
                <div className="flex gap-5">
                  <Button
                    title="Đặt vé ngay"
                    dataAos="fade-up"
                    dataAosDelay={300}
                    className="text-xl font-semibold lg:w-[200px]"
                  />
                  <Button
                    dataAos="fade-up"
                    dataAosDelay={400}
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
                  className="rounded-2xl  aspect-[16/9] lg:w-[450px] xl:w-[560px]"
                  src={item.trailer}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
