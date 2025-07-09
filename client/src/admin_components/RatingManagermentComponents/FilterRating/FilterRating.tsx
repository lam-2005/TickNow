"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import RatingFilterPopup from "./FilterPopup";

const FilterRating = ({
  movies,
}: {
  movies: { id: string; name: string }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border-1 border-primary flex-center gap-2 p-2 text-primary w-fit rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors"
      >
        <FaFilter />
        Bộ lọc
      </button>
      {open && (
        <RatingFilterPopup
          closeForm={() => setOpen(false)}
          movies={movies}
        />
      )}
    </>
  );
};

export default FilterRating;
