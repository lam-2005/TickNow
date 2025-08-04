import React from "react";

const Loading = () => {
  return (
    <div className="card flex-center gap-5 py-10 flex-row">
      <div className="border-2 rounded-full border-primary border-b-transparent size-7.5 animate-spin"></div>
      <p>Đang tải trang...</p>
    </div>
  );
};

export default Loading;
