"use client";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Location } from "@/interfaces/cinema.interface";
import {
  CinemaShowtimeType,
  Screening,
} from "@/interfaces/screening.interface";
import { getMovieList } from "@/services/movie.service";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import CinemaShowtimeContainer from "./CinemaShowtimeContainer";
import { useRouter, useSearchParams } from "next/navigation";

type ListDataSelect = {
  showtimes: Screening[];
  locations: Location[];
};

type ShowtimeSelectTypes = {
  listData: ListDataSelect;
  slug: string;
};
const ShowtimeSelect = ({ listData, slug }: ShowtimeSelectTypes) => {
  const { showtimes, locations } = listData;
  const router = useRouter();

  const getDate: { value: string; label: string }[] = [
    ...new Set(showtimes.map((item) => item.date)),
  ].map((date) => {
    const d = new Date(date as string);
    const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    const label = `${weekday}, ${day}/${month}/${year}`;
    return {
      value: d.toISOString().split("T")[0],
      label: label,
    };
  });
  const searchParams = useSearchParams();
  const getDateParams = searchParams.get("date");
  const getLoactionParams = searchParams.get("location");
  const [selectedDate, setSelectedDate] = useState(
    getDateParams || getDate[0].value
  );
  const [selectedLocation, setSelectedLocation] = useState(
    getLoactionParams || locations[0]._id
  );
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
    router.push(`?date=${selectedDate}&location=${selectedLocation}`, {
      scroll: false,
    });
  }, [slug, selectedDate, selectedLocation]);

  return (
    <>
      <div className="flex-column items-center gap-7.5">
        <h1>Lịch chiếu phim</h1>
        <SelectContainer>
          <SelectComponent
            leftIcon={<FaCalendarAlt className="text-foreground" size={20} />}
            getLabel={(item) => item.label}
            data={getDate}
            defaultValue={selectedDate}
            getValue={(item) => item.value}
            onChange={(date) => setSelectedDate(date)}
          />
          <SelectComponent
            leftIcon={<RiMapPin2Fill className="text-foreground" size={20} />}
            getLabel={(item) => item.name}
            data={locations}
            defaultValue={selectedLocation}
            getValue={(item) => item._id}
            onChange={(location) => setSelectedLocation(location)}
          />
        </SelectContainer>
      </div>
      <CinemaShowtimeContainer data={dataCinemaShowtimes} loading={loading} />
    </>
  );
};

export default ShowtimeSelect;
