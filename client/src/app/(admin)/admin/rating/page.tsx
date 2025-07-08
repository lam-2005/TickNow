import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import RatingList from "./RateList";
import * as rateService from "@/services/rate.service";

const getRatingData = async (page: number, limit: number) => {
  const res = await rateService.getRateList(`?page=${page}&limit=${limit}`);
  return {
    ratings: res?.data.rate,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

const RatingManagement = async () => {
  const res = await getRatingData(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Đánh Giá" />
      <OptionTable />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <RatingList initData={res} />
      </Suspense>
    </div>
  );
};

export default RatingManagement;
