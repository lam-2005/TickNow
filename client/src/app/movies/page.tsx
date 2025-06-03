"use client";
import React, { useState, useEffect } from "react";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Link from "next/link";
import MovieLoading from "@/components/Loading/MovieLoading";
import MovieContainer from "@/components/Movie/MovieContainer";
import { MovieType } from "@/interfaces/movie.interface";
const Movies = () => {
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
    <div className="">
      <BackgroundPage title="Phim chiếu rạp" image="background_movie.jpg" />
      <div className="container flex flex-col">
        <div className="flex justify-between items-center mb-5 px-2">
          <div className="flex gap-3 ">
            <h1 className="text-primary">PHIM ĐANG CHIẾU</h1>
            <h1>PHIM SẮP CHIẾU</h1>
          </div>
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
    </div>
  );
};

export default Movies;
