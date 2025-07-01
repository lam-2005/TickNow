import React from "react";

const ShowtimeCard = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-7.5 h-fit bg-background-card p-5 container w-[80%] rounded-xl">
      <div className="max-w-[227px] w-full aspect-[2/3] max-h-[340px] bg-amber-500"></div>
      <div className="space-y-[10px] flex-1">
        <h1>Phim chiếu rạp</h1>
        <div className="space-y-[5px]">
          <div className="flex gap-2.5">
            <p className="w-[100px] ">Ngày chiếu</p>
            <p>
              <strong>20/5/2025</strong>
            </p>
          </div>
          <div className="flex gap-2.5">
            <p className="w-[100px] ">Thời lượng</p>
            <p>
              <strong>120 phút</strong>
            </p>
          </div>
        </div>
        <div className="space-y-1.25 ">
          <p className=" ">{title || ""}</p>
          <div className="space-y-7.5 relative ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeCard;
