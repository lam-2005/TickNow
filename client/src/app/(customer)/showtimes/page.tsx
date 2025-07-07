import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import FilterShowtime from "@/components/ShowtimeList/FilterShowtime";
import Showtimelist from "@/components/ShowtimeList/Showtimelist";
import { Screening } from "@/interfaces/screening.interface";
import { getCinemaList } from "@/services/cinema.service";
import { getMovieList } from "@/services/movie.service";
import { getScreeningList } from "@/services/screening.service";
import React from "react";
const getListShowtime = async (
  date: string,
  movieId: string,
  cinemaId: string
) => {
  const res = await getMovieList(
    `/schedue?date=${date}&movie=${movieId}&cinema=${cinemaId}`
  );
  return res?.data.data;
};
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
const Showtimes = async ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; movie?: string; cinema?: string }>;
}) => {
  const { cinema, date, movie } = await searchParams;
  const [showtimeList, showtimes, cinemas, movies] = await Promise.all([
    getListShowtime(date || "", movie || "", cinema || ""),
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
      <BackgroundPage image="background_movie.webp" title="Lịch chiếu phim">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <FilterShowtime
            cinemas={cinemas}
            movies={movies}
            showtimes={getDate}
          />
        </div>
      </BackgroundPage>

      <Showtimelist data={showtimeList} date={date || getDate[0].value} />
    </div>
  );
};

export default Showtimes;
