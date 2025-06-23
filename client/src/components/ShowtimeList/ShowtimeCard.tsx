import Link from "next/link";
import React from "react";
const TimeScreening = () => (
  <Link
    href={"/booking"}
    className="flex-center py-2 px-4 border-2 border-primary w-fit rounded-[5px] text-sm cursor-pointer hover:bg-primary hover:text-white transition-all"
  >
    21:00 - 23:00
  </Link>
);
export const ShowType = ({ type }: { type: "Phụ đề" | "Lồng tiếng" }) => (
  <div className="flex gap-7.5 items-center">
    <p className="w-25">{type}</p>
    <div className="flex gap-2.5 flex-wrap">
      <TimeScreening />
      <TimeScreening />
      <TimeScreening />
    </div>
  </div>
);

export const ShowtimeItem = ({
  nameCinema,
  children,
}: {
  nameCinema?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2.5 not-first:before:w-full not-first:before:h-px before:bg-white before:absolute before:-translate-y-[15px]">
      <h3 className="font-semibold">{nameCinema}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
};

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
