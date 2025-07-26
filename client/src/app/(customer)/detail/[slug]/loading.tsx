import LoadingSpin from "@/components/LoadingAPI/LoadingSpin";
import React from "react";

const Loading = () => {
  return (
    <div className="transition-all">
      <div className="flex-center flex-col mt-20 mb-20">
        <LoadingSpin /> <p>Đang tải dữ liệu</p>
      </div>
    </div>
  );
};

export default Loading;
