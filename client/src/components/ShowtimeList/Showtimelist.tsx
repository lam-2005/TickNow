import React from "react";
import ShowtimeCard from "./ShowtimeCard";

const Showtimelist = () => {
  return (
    <div className="flex-column gap-7.5 mt-20">
      <ShowtimeCard />
      <ShowtimeCard />
      <ShowtimeCard />
    </div>
  );
};

export default Showtimelist;
