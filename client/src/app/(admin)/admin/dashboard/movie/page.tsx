import MovieTable from "@/admin_components/Dashboard/StatisticsMovie/MovieTable";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import { getDashboardData } from "@/services/dashboard.service";
import React from "react";

const StatisticsMovie = async () => {
  const getMovieData = await getDashboardData(`/movieDay?start=&end=`);

  return (
    <div className="card">
      <HeadingCard title="Doanh thu theo phim" />

      <MovieTable data={getMovieData} />
    </div>
  );
};

export default StatisticsMovie;
