"use client";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Option from "@/components/Select/Option";
import Select, { SelectField } from "@/components/Select/Select";
import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import React, { useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";

const Showtimes = () => {
  const [isActived, setIsActived] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<(string | number)[]>([]);

  const handleToggleItem = (id: string | number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => setCheckedItems([]);
  const handleToggle = (id: string) => {
    setIsActived((prev) => (prev === id ? null : id));
  };
  return (
    <div>
      <BackgroundPage image="background_movie.webp" title="Lịch chiếu phim">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <Select>
            <SelectField
              icon={<FaCalendarAlt />}
              label="Hôm nay (27/05)"
              id="date"
              isOpen={isActived === "date"}
              onToggle={handleToggle}
              onClose={() => setIsActived(null)}
            >
              <Option
                label="Chọn ngày chiếu"
                checkedItems={checkedItems}
                onToggleItem={handleToggleItem}
                onReset={handleReset}
              />
            </SelectField>
            <SelectField
              icon={<BiSolidMoviePlay />}
              label="Chọn phim"
              id="movie"
              isOpen={isActived === "movie"}
              onToggle={handleToggle}
              onClose={() => setIsActived(null)}
            >
              <Option label="Chọn Phim" />
            </SelectField>
            <SelectField
              icon={<RiMapPin2Fill />}
              label="Chọn rạp"
              id="cinema"
              isOpen={isActived === "cinema"}
              onToggle={handleToggle}
              onClose={() => setIsActived(null)}
            >
              <Option label="Chọn rạp chiếu" />
            </SelectField>
          </Select>
        </div>
      </BackgroundPage>
      <Showtimelist />
    </div>
  );
};

export default Showtimes;
