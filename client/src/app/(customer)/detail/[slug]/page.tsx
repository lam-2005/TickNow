import CommentContainer from "@/components/DetailPageComponents/CommentComponent/CommentContainer";
import MovieInfo from "@/components/DetailPageComponents/MovieInfo";
import ShowtimeSelect from "@/components/DetailPageComponents/ShowtimeUI/ShowtimeSelect";
import { getLocationList } from "@/services/cinema.service";
import { getMovieList } from "@/services/movie.service";
import { getScreeningList } from "@/services/screening.service";
import React from "react";

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
  console.log(locations);

  return (
    <div>
      <MovieInfo movie={movie} />
      <div className="container mt-10 space-y-10">
        <ShowtimeSelect
          listData={{ showtimes: showtimes, locations: locations }}
          slug={slug}
        />
        <CommentContainer />
      </div>
    </div>
  );
};

export default Movie;
