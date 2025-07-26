import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import * as rateService from "@/services/rate.service";
import RatingList from "@/admin_components/RatingManagermentComponents/RateList";
import FilterRating from "@/admin_components/RatingManagermentComponents/FilterRating/FilterRating";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lí đánh giá",
};

const RateManagement = async () => {
  const res = await rateService.getRateData(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Đánh Giá" />
      <FilterRating movies={res.movies} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <RatingList initData={res} />
      </Suspense>
    </div>
  );
};

export default RateManagement;
