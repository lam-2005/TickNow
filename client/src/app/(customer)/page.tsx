// "use client";
import React, { Suspense } from "react";
import Button from "@/components/Button/Button";
import Slideshow from "@/components/Slideshow/Slideshow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import MovieLoading from "@/components/Loading/MovieLoading";
import MovieContainer from "@/components/Movie/MovieContainer";
import * as movieService from "@/services/movie.service";
const getMovieNow = async () => {
  try {
    const res = await movieService.getMovieList("?status=1&limit=10");
    console.log(res);
    return res?.data.movie;
  } catch (error) {
    console.error("Fetch movie failed:", error);
  }
};
const getMovieComingSoon = async () => {
  try {
    const res = await movieService.getMovieList("?status=2&limit=10");
    return res?.data.movie;
  } catch (error) {
    console.error("Fetch movie failed:", error);
  }
};
export default function Home() {
  const moviesNow = getMovieNow();
  const moviesComingSoon = getMovieComingSoon();
  return (
    <>
      <Slideshow />
      <div className="">
        <section className="bg-background py-10 ">
          <div className="container flex flex-col ">
            <div className="flex justify-between items-center mb-5 px-2">
              <h2 className="self-start uppercase">Phim Đang Chiếu</h2>
              <Link
                href={"#"}
                className="hover:text-primary transition-colors duration-500"
              >
                Xem tất cả
              </Link>
            </div>

            <Suspense fallback={<MovieLoading />}>
              <MovieContainer data={moviesNow} />
            </Suspense>
          </div>
        </section>
        <section className="bg-[url('/background.webp')] bg-top bg-cover py-10">
          <div className="container flex flex-col">
            <h2 className="self-center mb-5 uppercase text-white">
              Phim Sắp Chiếu
            </h2>
            <Suspense fallback={<MovieLoading />}>
              <MovieContainer data={moviesComingSoon} textColor="text-white" />
            </Suspense>
            <Button title="Xem tất cả" className="self-center mt-10" />
          </div>
        </section>
        <article>
          <div className="container flex flex-col py-10">
            <div className="flex justify-between items-center mb-5 px-2">
              <h2 className="self-start uppercase">Khuyến Mãi</h2>
              <Link
                href={"/post"}
                className="hover:text-primary transition-colors duration-500"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
