import { Cinema } from "@/interfaces/cinema.interface";
import React from "react";

const CinemaList = ({ cinemas }: { cinemas: Cinema[] }) => {
  return (
    <ul className=" mt-2 max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 space-y-4">
      {cinemas.map((cinema) => (
        <li
          key={cinema._id}
          className="hover:underline hover:text-blue-500 text-background text-sm break-words whitespace-pre-line "
        >
          {cinema.name}
        </li>
      ))}
    </ul>
  );
};

export default CinemaList;
