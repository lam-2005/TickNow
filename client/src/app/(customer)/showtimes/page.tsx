import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import { getCinemaList } from "@/services/cinema.service";
import { getMovieList } from "@/services/movie.service";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Lịch Chiếu Phim",
  description:
    "Xem lịch chiếu phim tại các rạp trên toàn quốc. Dễ dàng tìm kiếm phim đang chiếu và sắp chiếu theo rạp, ngày và giờ.",
};
const getListCinema = async () => {
  const res = await getCinemaList();
  return res?.data.cinema;
};
const getListMovie = async () => {
  const res = await getMovieList("?status=1&status=2");
  return res?.data.movie;
};
const Showtimes = async () => {
  const [cinemas, movies] = await Promise.all([
    getListCinema(),
    getListMovie(),
  ]);

  function getNext7DaysWithLabels() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();

      const label = `${weekday}, ${day}/${month}/${year}`;
      const value = `${year}-${month}-${day}`;

      days.push({ value, label });
    }

    return days;
  }
  const getDate = getNext7DaysWithLabels();
  return (
    <div>
      <Showtimelist listFilter={{ cinemas, movies, showtimes: getDate }} />
    </div>
  );
};

export default Showtimes;
