"use client";
import React, { use, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterPopup from "./FilterPopup";
import { Cinema } from "@/interfaces/cinema.interface";

const FIlterRoom = ({ data }: { data: Promise<Cinema[]> }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const cinemas = use(data);
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
        <FilterPopup data={cinemas} closeForm={() => setOpenPopup(false)} />
      )}
    </>
  );
};

export default FIlterRoom;
