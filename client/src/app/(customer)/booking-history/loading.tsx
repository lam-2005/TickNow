import LoadingSpin from "@/components/LoadingAPI/LoadingSpin";
import React from "react";

const Loading = () => {
  return (
    <div className="flex-center flex-col mt-20 mb-20">
      <LoadingSpin />
      <p>Đang tải dữ liệu</p>
    </div>
  );
};

export default Loading;
