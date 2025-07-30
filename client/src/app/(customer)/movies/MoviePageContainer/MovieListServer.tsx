import { getMovieList } from "@/services/movie.service";
import React from "react";
import MovieList from "./MovieList";

const MovieListServer = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    date?: string;
    cinema?: string;
  }>;
}) => {
  const { status, cinema, date } = await searchParams;
  const resMovieShowing = await getMovieList(
    `${
      status && status === "dang-chieu"
        ? `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
        : status === "sap-chieu"
        ? "?status=2"
        : `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
    }`
  );
  const movies = resMovieShowing?.data.movie;
  return movies.length > 0 ? (
    <MovieList data={movies} />
  ) : (
    <p className="text-center bg-background-card rounded-2xl container p-5 mt-20 max-sm:mt-5 w-4/5">
      Không có phim nào được chiếu
    </p>
  );
};

export default MovieListServer;
