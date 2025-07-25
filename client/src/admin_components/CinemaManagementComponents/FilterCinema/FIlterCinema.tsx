"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterPopup from "./FilterPopup";
import { LocationRes } from "@/interfaces/cinema.interface";

const FilterCinema = ({ locations }: { locations: LocationRes[] }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenPopup(true)}
        className="border-1 border-primary flex-center gap-2 p-2 text-primary w-fit rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors"
      >
        <FaFilter />
        Bộ lọc rạp
      </button>
      {openPopup && (
        <FilterPopup
          locations={locations} 
          closeForm={() => setOpenPopup(false)}
        />
      )}
    </>
  );
};

export default FilterCinema;
