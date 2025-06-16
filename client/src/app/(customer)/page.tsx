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
import * as movieService from "@/services/movie.service";
export default function Home() {
  const [loadingNow, setLoadingNow] = useState<boolean>(true);
  const [loadingComingSoon, setLoadingComingSoon] = useState<boolean>(true);
  const [moviesNow, setMoviesNow] = useState<MovieType[] | []>([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState<MovieType[] | []>(
    []
  );

  const getMovieNow = async () => {
    try {
      const res = await movieService.getMovieList("?status=Đang Chiếu");
      setMoviesNow(res?.data);
    } catch (error) {
      console.error("Fetch movie failed:", error);
    } finally {
      setLoadingNow(false);
    }
  };

  const getMovieComingSoon = async () => {
    try {
      const res = await movieService.getMovieList("?status=Sắp Chiếu");
      setMoviesComingSoon(res?.data);
    } catch (error) {
      console.error("Fetch movie failed:", error);
    } finally {
      setLoadingComingSoon(false);
    }
  };
  useEffect(() => {
    getMovieNow();
  }, []);
  useEffect(() => {
    getMovieComingSoon();
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
            {!loadingNow ? (
              <MovieContainer data={moviesNow} />
            ) : (
              <MovieLoading />
            )}
          </div>
        </section>
        <section className="bg-[url('/background.webp')] bg-top bg-cover py-10">
          <div className="container flex flex-col">
            <h2
              className="self-center mb-5 uppercase text-white"
              data-aos="fade-up"
            >
              Phim Sắp Chiếu
            </h2>
            {!loadingComingSoon ? (
              <MovieContainer data={moviesComingSoon} textColor="text-white" />
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
            {!loadingComingSoon ? (
              <CustomSlider
                slidesToScroll={4}
                slidesToShow={4}
                xl={3}
                lg={2}
                md={2}
                sm={1}
              >
                {moviesComingSoon.map((item: MovieType, index: number) => (
                  <div
                    className="px-2"
                    key={item._id}
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
