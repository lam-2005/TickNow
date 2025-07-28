import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import MovieList from "@/admin_components/MovieManagementComponents/MovieList";
import AddMovieBtn from "@/admin_components/MovieManagementComponents/AddForm/ButtonOpenForm";
import * as movieService from "@/services/movie.service";
import { getGenreList } from "@/services/genre.service";
import FilterMovie from "@/admin_components/MovieManagementComponents/FilterMovie/FilterMovie";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lí phim",
};

const getGerne = async () => {
  const res = await getGenreList();
  return res.genres;
};

const MovieManagement = async () => {
  const movieData = movieService.getMovieData(1, 5);
  const genres = getGerne();
  const movies = await movieService.getMovieList();

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Phim">
        <AddMovieBtn genre={genres} />
      </HeadingCard>
      <FilterMovie data={genres} movies={movies.data.movie} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <MovieList initData={movieData} genre={genres} />
      </Suspense>
    </div>
  );
};

export default MovieManagement;
