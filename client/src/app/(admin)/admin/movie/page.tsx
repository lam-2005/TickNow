import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import MovieList from "@/admin_components/MovieManagementComponents/MovieList";
import AddMovieBtn from "@/admin_components/MovieManagementComponents/AddForm/ButtonOpenForm";
import * as movieService from "@/services/movie.service";
import { getGenreList } from "@/services/genre.service";

export const getMovieData = async (page: number, limit: number) => {
  const res = await movieService.getMovieList(`?page=${page}&limit=${limit}`);
  return {
    movies: res?.data.movie,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

const getGerne = async () => {
  const res = await getGenreList();
  return res.genres;
};
const MovieManagement = async () => {
  const movieData = await getMovieData(1, 5);
  const genres = getGerne();
  console.log("Genres:", genres);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Phim">
        <AddMovieBtn genre={genres}/>
      </HeadingCard>
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <MovieList initData={movieData} />
      </Suspense>
    </div>
  );
};

export default MovieManagement;
