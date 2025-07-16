"use client";
import React, { useEffect, useState } from "react";
import { ItemInfo } from "../Popup/InfoPopup";
import Image from "next/image";
import { getTicket, TicketTypeLocalStorage } from "@/utils/saveTicket";
import env from "@/configs/environment";

const Ticket = () => {
  const [ticket, setTicket] = useState<TicketTypeLocalStorage | null>(null);

  useEffect(() => {
    // Load ticket khi component mount
    const storedTicket = getTicket();
    setTicket(storedTicket);

    // Lắng nghe custom event 'ticket-updated'
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
    <div className="w-full space-y-5 ">
      <div className="flex gap-7.5">
        <div className="relative max-w-[235px] w-full h-full aspect-[2/3] bg-amber-500 overflow-hidden rounded-[10px]">
          <Image
            fill
            src={`${env.IMG_API_URL}/movie/${ticket?.movie.image}`}
            alt="Phim"
            sizes="300px"
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex-column justify-between gap-5 items-start">
          <div className="space-y-2.5 w-full">
            <div className="flex items-center gap-2.5 ">
              <h2 className="capitalize">{ticket?.movie.name}</h2>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
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
              content={(ticket?.screening?.room as string) || ""}
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
                  : "Lông tiếng"
              }
            />
            <ItemInfo
              title="Ghế:"
              content={ticket?.seats ? ticket?.seats.join(",") : ""}
            />
          </div>
          <h2>
            Tổng giá vé:{" "}
            <span className="text-2xl text-primary">
              {ticket?.total !== 0
                ? ticket?.total.toLocaleString("vi-Vn")
                : ticket?.price.toLocaleString("vi-Vn") || 0}{" "}
              ₫
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
