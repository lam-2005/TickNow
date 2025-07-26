"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getTicket, TicketTypeLocalStorage } from "@/utils/saveTicket";
import { ItemInfo } from "../Popup/InfoPopup";
import env from "@/configs/environment";

const Ticket = () => {
  const [ticket, setTicket] = useState<TicketTypeLocalStorage | null>(null);

  useEffect(() => {
    const storedTicket = getTicket();
    setTicket(storedTicket);

    const handleTicketUpdated = () => {
      const updatedTicket = getTicket();
      setTicket(updatedTicket);
    };

    window.addEventListener("ticket-updated", handleTicketUpdated);
    return () => {
      window.removeEventListener("ticket-updated", handleTicketUpdated);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayOfWeek = weekdays[date.getDay()];
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear());

    return `${dayOfWeek}, ${dd}/${mm}/${yy}`;
  };

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Poster */}
        <div className="relative w-full md:max-w-[235px] aspect-[2/3] bg-gray-300 overflow-hidden rounded-[10px] mx-auto md:mx-0 max-md:hidden">
          {ticket?.movie.image && (
            <Image
              fill
              src={`${env.IMG_API_URL}/movie/${ticket.movie.image}`}
              alt="Poster phim"
              sizes="300px"
              loading="lazy"
              className="object-cover"
            />
          )}
        </div>

        {/* Thông tin vé */}
        <div className="flex-1 flex flex-col justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-semibold capitalize">
                {ticket?.movie.name}
              </h2>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white text-sm">
                18+
              </span>
            </div>

            <ItemInfo
              title="Rạp chiếu:"
              content={`${ticket?.screening?.cinema || ""} (${
                ticket?.screening?.locationData.location
              })`}
            />
            <ItemInfo
              title="Địa điểm:"
              content={ticket?.screening?.locationData.detail_location || ""}
            />
            <ItemInfo
              title="Phòng chiếu:"
              content={ticket?.screening?.room as string}
            />
            <ItemInfo
              title="Ngày chiếu:"
              content={`${
                ticket?.screening?.screeningInfo.time_start || ""
              } - ${
                ticket?.screening?.screeningInfo.date
                  ? formatDate(ticket.screening?.screeningInfo.date)
                  : ""
              }`}
            />
            <ItemInfo
              title="Thời lượng:"
              content={`${ticket?.movie.duration} phút`}
            />
            <ItemInfo
              title="Định dạng:"
              content={
                ticket?.screening?.screeningInfo.showtype === 1
                  ? "Phụ đề"
                  : "Lồng tiếng"
              }
            />
            <ItemInfo title="Ghế:" content={ticket?.seats?.join(", ") || ""} />
          </div>

          {/* Tổng giá */}
          <h2 className="text-lg md:text-xl font-semibold">
            Tổng giá vé:{" "}
            <span className="text-primary text-2xl">
              {(ticket?.total || ticket?.price || 0).toLocaleString("vi-VN")} ₫
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
