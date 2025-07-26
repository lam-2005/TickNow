import { SkeletonLoading } from "@/components/Loading/OfferLoading";
import React from "react";

const Loading = () => {
  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Khuyến mãi và Ưu đãi
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    </div>
  );
};

export default Loading;
