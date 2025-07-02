import React, { Suspense } from "react";
import * as movieService from "@/services/movie.service";
import MovieList from "./MovieList";

export const getMovieData = async (page: number, limit: number) => {
  const res = await movieService.getMovieList(`?page=${page}&limit=${limit}`);
  return {
    movies: res?.data.movie,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

const MovieManagement = async () => {
  const res = await getMovieData(1, 5);

  return (
    <div className="card">
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <MovieList initData={res} />
      </Suspense>
    </div>
  );
};

export default MovieManagement;
