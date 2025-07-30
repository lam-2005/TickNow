"use client";
import Movie from "@/components/Movie/Movie";
import { MovieType } from "@/interfaces/movie.interface";
import React, { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const MovieList = ({ data }: { data: MovieType[] }) => {
  const [sortOrder, setSortOrder] = useState<boolean>(false);
  const sortedMovies = [...data].sort((a, b) => {
    const nameA = a.name?.toLowerCase() || "";
    const nameB = b.name?.toLowerCase() || "";
    return sortOrder ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
  });
  const handleSortMovie = () => {
    setSortOrder(!sortOrder);
  };
  return (
    <>
      <div className="mt-5 space-y-5">
        <button
          onClick={handleSortMovie}
          className="group flex rounded-[5px] items-center gap-2 border-2 border-white py-2.5 px-5 hover:border-primary hover:text-primary transition-colors text-foreground max-md:text-sm max-sm:text-xs text-nowrap"
        >
          {sortOrder ? (
            <>
              <FaSortAlphaDown /> A-Z
            </>
          ) : (
            <>
              <FaSortAlphaUp /> Z-A
            </>
          )}
        </button>

        <div className="grid grid-cols-5 gap-5 max-sm:grid-cols-2 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-5">
          {sortedMovies.map((movie) => (
            <Movie key={movie._id} info={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
