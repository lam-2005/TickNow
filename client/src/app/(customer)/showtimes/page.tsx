import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import { Screening } from "@/interfaces/screening.interface";
import { getCinemaList } from "@/services/cinema.service";
import { getMovieList } from "@/services/movie.service";
import { getScreeningList } from "@/services/screening.service";
import React from "react";

const getListDateShowtime = async () => {
  const res = await getScreeningList();
  return res.data.result;
};
const getListCinema = async () => {
  const res = await getCinemaList();
  return res.cinema;
};
const getListMovie = async () => {
  const res = await getMovieList("?status=1");
  return res?.data.movie;
};
const Showtimes = async () => {
  const [showtimes, cinemas, movies] = await Promise.all([
    getListDateShowtime(),
    getListCinema(),
    getListMovie(),
  ]);
  const getDate = [
    ...new Set(showtimes.map((item: Screening) => item.date)),
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

  return (
    <div>
      <Showtimelist listFilter={{ cinemas, movies, showtimes: getDate }} />
    </div>
  );
};

export default Showtimes;
