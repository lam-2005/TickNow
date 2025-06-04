import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Select, { SelectField } from "@/components/Select/Select";
import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import React from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";

const Showtimes = () => {
  return (
    <div>
      <BackgroundPage image="background_movie.jpg" title="Lịch chiếu phim">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <Select>
            <SelectField icon={<FaCalendarAlt />} label="Hôm nay (27/05)" />
            <SelectField icon={<BiSolidMoviePlay />} label="Chọn phim" />
            <SelectField icon={<RiMapPin2Fill />} label="Chọn rạp" />
          </Select>
        </div>
      </BackgroundPage>
      <Showtimelist />
    </div>
  );
};

export default Showtimes;
