"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useRouter } from "nextjs-toploader/app";
import { getTicket, TicketTypeLocalStorage } from "@/utils/saveTicket";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/contexts/useAuth";

// const COUNTDOWN_DURATION = 5 * 60; // 5 phút tính bằng giây

const DetailTicket = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<TicketTypeLocalStorage | null>(null);
  // const [timeLeft, setTimeLeft] = useState<number>(COUNTDOWN_DURATION);

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

  // Countdown logic
  // useEffect(() => {
  //   if (!ticket) return;

  //   if (!ticket.seats || ticket.seats.length === 0) {
  //     setTimeLeft(COUNTDOWN_DURATION); // reset nếu không có ghế
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval);
  //         // Hết giờ → reload trang
  //         toast.error("Hết thời gian giữ ghế, vui lòng chọn lại.");
  //         router.refresh();
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [ticket, ticket?.seats]);

  // const formatTime = (seconds: number) => {
  //   const m = Math.floor(seconds / 60)
  //     .toString()
  //     .padStart(2, "0");
  //   const s = (seconds % 60).toString().padStart(2, "0");
  //   return `${m}:${s}`;
  // };

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

  const handleRedirectCheckoutPage = () => {
    if (!user?.token) {
      toast.warning("Vui lòng đăng nhập để thanh toán");
      return;
    }
    if (ticket?.seats.length === 0) {
      toast.warning("Vui lòng chọn ghế để tiếp tục");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="bg-background-card p-5 w-full rounded-[10px] flex flex-col gap-5 md:flex-row md:justify-between mt-5">
      {/* Left section */}
      <div className="space-y-2.5 text-sm md:text-base">
        <h2 className="text-lg font-semibold">{ticket?.movie.name || ""}</h2>
        <p>
          <strong>
            {ticket?.screening?.cinema || ""} (
            {ticket?.screening?.locationData.location})
          </strong>
        </p>
        <p>{ticket?.screening?.locationData.detail_location}</p>
        <p>
          Suất:{" "}
          <strong>{ticket?.screening?.screeningInfo.time_start || ""}</strong> -{" "}
          {ticket?.screening?.screeningInfo
            ? formatDate(ticket?.screening?.screeningInfo?.date)
            : ""}
        </p>
        <p>
          Ghế đã chọn:{" "}
          <strong>{ticket?.seats ? ticket?.seats.join(",") : ""}</strong>
        </p>
      </div>

      {/* Right section */}
      <div className="flex flex-col gap-4 items-end justify-between text-right">
        <div className="text-sm sm:text-base space-y-1">
          {/* <div className="flex gap-1 items-center">
            <span className="">Thời gian giữ ghế:</span>
            <span className="text-primary text-xl font-bold">
              {formatTime(timeLeft)}
            </span>
          </div> */}
          <div className="flex gap-1 items-center">
            <span className="">Tổng cộng:</span>
            <span className="text-primary font-bold text-2xl">
              {ticket?.price.toLocaleString("vi-VN") || 0} ₫
            </span>
          </div>
        </div>
        <Button title="Thanh toán" onClick={handleRedirectCheckoutPage} />
      </div>
    </div>
  );
};

export default DetailTicket;
