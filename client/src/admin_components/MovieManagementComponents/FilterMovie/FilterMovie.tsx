"use client";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterPopup from "./FilterPopup";
import Genre from "@/interfaces/genre.interface";
import { MovieType } from "@/interfaces/movie.interface";

const FilterMovie = ({
  data,
  movies,
}: {
  data: Promise<Genre[]>;
  movies: MovieType[];
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    data.then((res) => setGenres(res));
  }, [data]);

  return (
    <>
      <button
        onClick={() => setOpenPopup(true)}
        className="border-1 border-primary flex-center gap-2 p-2 text-primary w-fit rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors"
      >
        <FaFilter />
        Bộ lọc
      </button>
      {openPopup && (
        <FilterPopup
          data={genres}
          closeForm={() => setOpenPopup(false)}
          movies={movies}
        />
      )}
    </>
  );
};

export default FilterMovie;
