// import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import React from "react";
import Location from "./Location";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Select, { SelectField } from "@/components/Select/Select";
import { RiMapPin2Fill } from "react-icons/ri";
const Cinema = () => {
  return (
    <div>
      <BackgroundPage image="background_cinema.jpg" title="Rạp chiếu">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <Select>
            <SelectField icon={<RiMapPin2Fill />} label="Toàn quốc" />
          </Select>
        </div>
      </BackgroundPage>
      <div className="mt-17.5 container">
        <h2 className="text-center mt-20">Hiển thị 6 rạp</h2>
        <div className="mt-7.5 grid grid-cols-4 justify-items-center gap-7.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <Location />
          <Location />
          <Location />
          <Location />
          <Location />
          <Location />
        </div>
      </div>
    </div>
  );
};

export default Cinema;
