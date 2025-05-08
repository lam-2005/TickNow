"use client";
import React, { useState } from "react";
import Button from "./components/Button/Button";
import Movie from "./components/Movie/Movie";
import Slideshow, { Movies } from "./components/Slideshow/Slideshow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from "./components/CustomSlider/CustomSlider";
import Link from "next/link";
import Offer from "./components/Offer/Offer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    AOS.init({
      offset: 70,
      duration: 600,
      easing: "ease-in-sine",
      delay: 0,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);
  const [data1, setData1] = useState<Movies[] | []>([]);
  const [data2, setData2] = useState<Movies[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5000/movies?_limit=10&status=2"
      );
      const getData = await res.json();
      setData1(getData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData1 = async () => {
      const res = await fetch(
        "http://localhost:5000/movies?_limit=10&status=1"
      );
      const getData = await res.json();
      setData2(getData);
    };
    fetchData1();
  }, []);

  // if (!data1) return <p>Loading</p>;
  // if (!data2) return <p>Loading</p>;

  return (
    <>
      <Slideshow />
      <div className="">
        <section className="bg-background py-10">
          <div className="container flex flex-col ">
            <div className="flex justify-between items-center mb-5 px-2">
              <h2 className="self-start uppercase" data-aos="fade-right">
                Phim Đang Chiếu
              </h2>
              <Link
                href={"#"}
                data-aos="fade-left"
                className="hover:text-primary transition-colors duration-500"
              >
                Xem tất cả
              </Link>
            </div>
            {data1.length > 0 && (
              <CustomSlider xl={4} lg={3} md={2} sm={2}>
                {data1.map((item: Movies, index: number) => (
                  <div
                    className="px-2"
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >
                    <Movie />
                  </div>
                ))}
              </CustomSlider>
            )}
          </div>
        </section>
        <section className="bg-[url('/background.jpg')] bg-top bg-cover py-10">
          <div className="container flex flex-col">
            <h2 className="self-center mb-5 uppercase" data-aos="fade-up">
              Phim Sắp Chiếu
            </h2>
            {data2.length > 0 && (
              <CustomSlider xl={4} lg={3} md={2} sm={2}>
                {data1.map((item: Movies, index: number) => (
                  <div
                    className="px-2"
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >
                    <Movie />
                  </div>
                ))}
              </CustomSlider>
            )}
            <Button
              title="Xem tất cả"
              dataAos="fade-up"
              dataAosDelay={0}
              className="mt-10 self-center bg-primary border-primary border-0 before:border-white 
              text-white  hover:text-primary hover:shadow-white hover:bg-white"
            />
          </div>
        </section>
        <article>
          <div className="container flex flex-col py-10">
            <div className="flex justify-between items-center mb-5 px-2">
              <h2 className="self-start uppercase" data-aos="fade-right">
                Khuyến Mãi
              </h2>
              <Link
                href={"#"}
                data-aos="fade-left"
                className="hover:text-primary transition-colors duration-500"
              >
                Xem tất cả
              </Link>
            </div>
            {data2.length > 0 && (
              <CustomSlider
                slidesToScroll={4}
                slidesToShow={4}
                xl={3}
                lg={2}
                md={2}
                sm={1}
              >
                {data2.map((item: Movies, index: number) => (
                  <div
                    className="px-2"
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >
                    <Offer />
                  </div>
                ))}
              </CustomSlider>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
