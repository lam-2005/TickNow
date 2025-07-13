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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
  const getDateParams = searchParams.get("date") || getDate[0].value;
  const getLocationParams = searchParams.get("location") || locations[0]._id;
  const [selectedDate, setSelectedDate] = useState(getDateParams);
  const [selectedLocation, setSelectedLocation] = useState(getLocationParams);
  const [dataCinemaShowtimes, setDataCinemaShowtimes] = useState<
    CinemaShowtimeType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // setLoading(true);
    const getData = async () => {
      try {
        setLoading(true);
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
  const changDate = (date: string) => {
    setSelectedDate(date);
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", date);
    // Xóa param showtime nếu có
    if (params.has("showtime")) {
      params.delete("showtime");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const changeLocation = (location: string) => {
    setSelectedLocation(location);
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", location);
    // Xóa param showtime nếu có
    if (params.has("showtime")) {
      params.delete("showtime");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
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
            onChange={(date) => changDate(date)}
          />
          <SelectComponent
            leftIcon={<RiMapPin2Fill className="text-foreground" size={20} />}
            getLabel={(item) => item.name}
            data={locations}
            defaultValue={selectedLocation}
            getValue={(item) => item._id}
            onChange={(location) => changeLocation(location)}
          />
        </SelectContainer>
      </div>
      <CinemaShowtimeContainer data={dataCinemaShowtimes} loading={loading} />
    </>
  );
};

export default ShowtimeSelect;
