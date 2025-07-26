import CommentContainer from "@/components/DetailPageComponents/CommentComponent/CommentContainer";
import MovieInfo from "@/components/DetailPageComponents/MovieInfo";
import ShowtimeSelect from "@/components/DetailPageComponents/ShowtimeUI/ShowtimeSelect";
import { getLocationList } from "@/services/location.service";
import { getMovieList } from "@/services/movie.service";
import { getRateList } from "@/services/rate.service";
import { getIdFromSlug } from "@/utils/convertSlug";
import React from "react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = getIdFromSlug(slug);
  const res = await getMovieList(`/${id}`);
  const movie = res?.data?.movie;

  if (!movie) {
    return {
      title: "Không tìm thấy phim",
      description: "Trang phim không tồn tại hoặc đã bị xoá.",
    };
  }

  return {
    title: `${movie.name} - Thông tin & lịch chiếu`,
    description:
      movie.description?.slice(0, 150) ||
      "Xem thông tin chi tiết và lịch chiếu của bộ phim.",
  };
}

const Movie = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const id = getIdFromSlug(slug);

  const res = await getMovieList(`/${id}`);
  const movie = res?.data.movie;
  const rates = await getRateList(`/movie/${id}`);

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
    <div className="transition-all">
      <MovieInfo movie={movie} />
      <div className="container mt-10 max-sm:mt-5 space-y-10 max-sm:space-y-5">
        <ShowtimeSelect listData={{ locations: locations }} slug={id} />
        <CommentContainer rate={rates?.data} movie={movie} />
      </div>
    </div>
  );
};

export default Movie;
