"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { MovieType } from "@/interfaces/movie.interface";
import FilterPopup from "./FilterPopup";

const FilterTicket = ({ movies }: { movies: MovieType[] }) => {
  const [openPopup, setOpenPopup] = useState(false);
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
        <FilterPopup movies={movies} closeForm={() => setOpenPopup(false)} />
      )}
    </>
  );
};

export default FilterTicket;
