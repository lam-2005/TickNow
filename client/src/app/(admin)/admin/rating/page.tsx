import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import * as rateService from "@/services/rate.service";
import RatingList from "@/admin_components/RatingManagermentComponents/RateList";
import FilterRating from "@/admin_components/RatingManagermentComponents/FilterRating/FilterRating";
import { ReviewType } from "@/interfaces/rating.interface";

const getRateData = async (page: number, limit: number) => {
  const res = await rateService.getRateList(`?page=${page}&limit=${limit}`);
  const ratings: ReviewType[] = res?.data.rate || [];

  // Lấy danh sách phim gồm id và tên
  const movieMap = new Map<string, string>();
  ratings.forEach((r) => {
    if (!movieMap.has(r.id_movie)) {
      movieMap.set(r.id_movie, r.movieName);
    }
  });

  const movieList = Array.from(movieMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));

  return {
    ratings,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    movies: movieList,
  };
};

const RateManagement = async () => {
  const res = await getRateData(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Đánh Giá" />
      <FilterRating movies={res.movies} />
      {/* <OptionTable /> */}
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <RatingList initData={res} />
      </Suspense>
    </div>
  );
};

export default RateManagement;
