import MovieTable from "@/admin_components/Dashboard/StatisticsMovie/MovieTable";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import { getDashboardData } from "@/services/dashboard.service";
import React from "react";
import { Metadata } from "next";
import { getMovieList } from "@/services/movie.service";
export const metadata: Metadata = {
  title: "Doanh thu theo phim",
};

const StatisticsMovie = async () => {
  const getMovieData = await getDashboardData(`/movieDay?start=&end=`);
  const resMovie = await getMovieList("?status=1&status=2");
  const movies = resMovie?.data.movie;
  return (
    <div className="card">
      <HeadingCard title="Doanh thu theo phim" />

      <MovieTable data={getMovieData} movies={movies} />
    </div>
  );
};

export default StatisticsMovie;
