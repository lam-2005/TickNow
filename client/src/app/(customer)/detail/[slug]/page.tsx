import { Screening } from "@/interfaces/screening.interface";
import { getLocationList } from "@/services/cinema.service";
import { getMovieList } from "@/services/movie.service";
import { getScreeningList } from "@/services/screening.service";
import React from "react";
import CommentContainer from "./CommentComponent/CommentContainer";
import MovieInfo from "./MovieInfo";
import ShowtimeSelect from "./ShowtimeUI/ShowtimeSelect";

const Movie = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const res = await getMovieList(`/${slug}`);
  const movie = res?.data.movie;
  // dữ liệu suất
  const fetchShowtimes = async () => {
    try {
      const res = await getScreeningList();
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải suất chiếu:", error);
    }
  };
  const showtimes = await fetchShowtimes();
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

  // dữ liệu rạp

  const fetchLocation = async () => {
    try {
      const res = await getLocationList();
      return res?.location;
    } catch (error) {
      console.error("Lỗi khi tải địa chỉ:", error);
    }
  };
  const locations = await fetchLocation();

  return (
    <div>
      <MovieInfo movie={movie} />
      <div className="container mt-10 space-y-10">
        <ShowtimeSelect
          listData={{ showtimes: getDate, locations: locations }}
          slug={slug}
        />
        <CommentContainer />
      </div>
    </div>
  );
};

export default Movie;
