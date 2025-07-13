import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import MovieList from "@/admin_components/MovieManagementComponents/MovieList";
import AddMovieBtn from "@/admin_components/MovieManagementComponents/AddForm/ButtonOpenForm";
import * as movieService from "@/services/movie.service";
import { getGenreList } from "@/services/genre.service";
import FilterMovie from "@/admin_components/MovieManagementComponents/FilterMovie/FilterMovie";

const getGerne = async () => {
  const res = await getGenreList();
  return res.genres;
};

const MovieManagement = async () => {
  const movieData = await movieService.getMovieData(1, 5);
  const genres = getGerne();
  console.log("Genres:", genres);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Phim">
        <AddMovieBtn genre={genres} />
      </HeadingCard>
      <FilterMovie data={genres} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <MovieList initData={movieData} genre={genres} />
      </Suspense>
    </div>
  );
};

export default MovieManagement;
