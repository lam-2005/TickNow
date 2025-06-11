import React from "react";
import { ItemInfo } from "../Popup/InfoPopup";
import Image from "next/image";
import { MovieType } from "@/interfaces/movie.interface";

const Ticket = ({ info }: { info: MovieType }) => {
  return (
    <div className="w-full space-y-5 ">
      <div className="flex gap-7.5">
        <div className="relative max-w-[235px] w-full h-full aspect-[2/3] bg-amber-500 overflow-hidden rounded-[10px]">
          <Image
            fill
            src={`/movies/phim.webp`}
            alt="Phim"
            sizes="300px"
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex-column justify-between gap-5 items-start">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 ">
              <h2 className="capitalize">3 mặt lật kèo</h2>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                18+
              </span>
            </div>
            <ItemInfo title="Rạp chiếu:" content={"TickNow Quận 12"} />
            <ItemInfo
              title="Địa điểm:"
              content={
                "123 Tô Ký, Phường Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh"
              }
            />
            <ItemInfo title="Phòng chiếu:" content={"02"} />
            <ItemInfo title="Ngày chiếu:" content={"9:20 - 27/05/2025"} />
            <ItemInfo title="Thời lượng:" content={`120 phút`} />
            <ItemInfo title="Định dạng:" content={"2D - Phụ đề"} />
            <ItemInfo title="Ghế:" content={"A1, A2, A3"} />
          </div>
          <h2>
            Tổng giá vé:{" "}
            <span className="text-2xl text-primary">1.000.000 ₫</span>
          </h2>
        </div>
      </div>
    </div>
  );
};


export default Ticket;

