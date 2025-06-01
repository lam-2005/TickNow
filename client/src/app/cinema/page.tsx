import React from "react";
import Location from "./Location";
const Cinema = () => {
  return <div className="mt-17.5">
      <h2 className="text-center mt-20">Hiển thị 6 rạp</h2>
      <div className="mt-[4.375rem] grid grid-cols-4 justify-items-center gap-7.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"> 
        <Location />
        <Location />
        <Location />
        <Location />
        <Location />
        <Location />
      </div>
    </div>;


};

export default Cinema;
