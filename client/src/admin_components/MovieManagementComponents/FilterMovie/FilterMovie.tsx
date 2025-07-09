"use client";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterPopup from "./FilterPopup";
import Genre from "@/interfaces/genre.interface";

const FilterMovie = ({ data }: { data: Promise<Genre[]> }) => {
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
        <FilterPopup data={genres} closeForm={() => setOpenPopup(false)} />
      )}
    </>
  );
};

export default FilterMovie;
