"use client";
import React from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { getTicket } from "@/utils/saveTicket";

const DetailTicket = () => {
  const router = useRouter();
  const ticket = getTicket();

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

  // if (!ticket) return null;
  return (
    <div className="bg-background-card p-5 w-full rounded-[10px] flex-between mt-5">
      <div className="space-y-2.5">
        <h2>{ticket?.movie.name || ""}</h2>
        <p>
          <strong>{ticket?.cinema.name}</strong>
        </p>
        <p>
          Suất: <strong>{ticket?.screening.id_showtime.time}</strong> -{" "}
          {formatDate(ticket.screening.date)}
        </p>
        <p>
          Ghế đã chọn: <strong>{ticket.seats.join(",")}</strong>
        </p>
      </div>
      <div className="flex flex-col items-end gap-[15px]">
        <div className="text-lg flex gap-[5px]">
          Thời gian giữ ghế:{" "}
          <span className="text-primary text-xl font-bold">5:00</span>
        </div>
        <div className="flex gap-[5px]">
          <p className="text-lg">Tổng cộng:</p>
          <span className="text-primary font-bold text-2xl">
            {ticket.price.toLocaleString("vi-Vn")} ₫
          </span>
        </div>
        <div className="flex gap-5">
          <Button title="Thanh toán" onClick={() => router.push("/checkout")} />
        </div>
      </div>
    </div>
  );
};

export default DetailTicket;
