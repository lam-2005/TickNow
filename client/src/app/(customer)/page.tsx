"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Slideshow from "@/components/Slideshow/Slideshow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from "@/components/CustomSlider/CustomSlider";
import Link from "next/link";
import Offer from "@/components/Offer/Offer";
import { MovieType } from "@/interfaces/movie.interface";
import MovieLoading from "@/components/Loading/MovieLoading";
import MovieContainer from "@/components/Movie/MovieContainer";
import OfferLoading from "@/components/Loading/OfferLoading";
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data1, setData1] = useState<MovieType[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:5000/movies?_limit=10&status=2"
        );
        const getData = await res.json();
        setData1(getData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Slideshow />
      <div className="">
        <section className="bg-background py-10 ">
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
            {!loading ? <MovieContainer data={data1} /> : <MovieLoading />}
          </div>
        </section>
        <section className="bg-[url('/background.jpg')] bg-top bg-cover py-10">
          <div className="container flex flex-col">
            <h2
              className="self-center mb-5 uppercase text-white"
              data-aos="fade-up"
            >
              Phim Sắp Chiếu
            </h2>
            {!loading ? (
              <MovieContainer data={data1} textColor="text-white" />
            ) : (
              <MovieLoading />
            )}
            <Button
              title="Xem tất cả"
              dataAos="fade-up"
              dataAosDelay={0}
              className="self-center mt-10"
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
                href={"/post"}
                data-aos="fade-left"
                className="hover:text-primary transition-colors duration-500"
              >
                Xem tất cả
              </Link>
            </div>
            {!loading ? (
              <CustomSlider
                slidesToScroll={4}
                slidesToShow={4}
                xl={3}
                lg={2}
                md={2}
                sm={1}
              >
                {data1.map((item: MovieType, index: number) => (
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
            ) : (
              <OfferLoading />
            )}
          </div>
        </article>
      </div>
    </>
  );
}
