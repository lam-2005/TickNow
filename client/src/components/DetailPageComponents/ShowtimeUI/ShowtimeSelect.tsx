"use client";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Location } from "@/interfaces/cinema.interface";
import { CinemaShowtimeType } from "@/interfaces/screening.interface";
import { getMovieList } from "@/services/movie.service";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import CinemaShowtimeContainer from "./CinemaShowtimeContainer";

type ListDataSelect = {
  showtimes: { value: string; label: string }[];
  locations: Location[];
};

type ShowtimeSelectTypes = {
  listData: ListDataSelect;
  slug: string;
};
const ShowtimeSelect = ({ listData, slug }: ShowtimeSelectTypes) => {
  const { showtimes, locations } = listData;
  const [selectedDate, setSelectedDate] = useState(showtimes[0].value);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]._id);
  const [dataCinemaShowtimes, setDataCinemaShowtimes] = useState<
    CinemaShowtimeType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getMovieList(
          `/${slug}?date=${selectedDate}&location=${selectedLocation}`
        );
        setDataCinemaShowtimes(res?.data.cinemas);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu lịch chiếu: ", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [slug, selectedDate, selectedLocation]);

  return (
    <>
      <div className="flex-column items-center gap-7.5">
        <h1>Lịch chiếu phim</h1>
        <SelectContainer>
          <SelectComponent
            leftIcon={<FaCalendarAlt className="text-foreground" size={20} />}
            labelKey={"label"}
            data={showtimes}
            defaultValue={showtimes[0].value}
            valueKey={"value"}
            onChange={(date) => setSelectedDate(date)}
          />
          <SelectComponent
            leftIcon={<RiMapPin2Fill className="text-foreground" size={20} />}
            labelKey={"name"}
            data={locations}
            defaultValue={locations[0]._id}
            valueKey={"_id"}
            onChange={(location) => setSelectedLocation(location)}
          />
        </SelectContainer>
      </div>
      <CinemaShowtimeContainer data={dataCinemaShowtimes} loading={loading} />
    </>
  );
};

export default ShowtimeSelect;
