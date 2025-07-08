"use client";
import React, { use, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterPopup from "./FilterPopup";
import { Location } from "@/interfaces/cinema.interface";

const FilterCinema = ({ locations }:  { locations: Promise<Location[]> }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const locationList = use(locations);

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
          locations={locationList}
          closeForm={() => setOpenPopup(false)}
        />
      )}
    </>
  );
};

export default FilterCinema;
