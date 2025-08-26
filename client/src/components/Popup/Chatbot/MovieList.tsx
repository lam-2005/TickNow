import { MovieType } from "@/interfaces/movie.interface";
import React from "react";
import convertSlug from "@/utils/convertSlug";
import Link from "next/link";
const MovieList = ({ data }: { data: MovieType[] }) => {
  return (
    <ol className="list-decimal list-inside mt-2 max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 space-y-4">
      {data.map((movie) => (
        <li key={movie._id} className="">
          <Link
            href={`/detail/${convertSlug(movie.name)}-${movie._id}`}
            className=" hover:underline hover:text-blue-500 text-background text-sm break-words whitespace-pre-line "
          >
            {movie.name}
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default MovieList;
