import React from "react";
import LocationItem from "./Location";
import { Cinema } from "@/interfaces/cinema.interface";

const CinemaList = ({ cinemas }: { cinemas: Cinema[] }) => {
  return (
    <div className="mt-17.5 container max-sm:mt-0">
      <h2 className="text-center mt-20 max-sm:mt-5">
        Hiển thị {cinemas?.length} rạp
      </h2>
      <div className="mt-7.5 grid grid-cols-1 justify-center gap-7.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
        {cinemas?.map((cinema: Cinema) => (
          <LocationItem key={cinema._id} data={cinema} />
        ))}
      </div>
    </div>
  );
};

export default CinemaList;
