"use client";
import StageBooking from "@/components/BookingPageComponents/StageBooking";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const BookingSuccessful = () => {
  const router = useRouter();
  return (
    <div className="mt-10 space-y-10">
      <StageBooking currentStage={3} />
      <div className="flex-column items-center gap-[40px] rounded-[15px] bg-background-card w-fit p-10 m-auto">
        <div className="flex-center flex-col gap-5">
          <div className="size-[70px] rounded-[50%] bg-[#2EB166] flex-center">
            <FaCheck size={40} color="#fff" />
          </div>
          <p className="text-3xl text-[#2EB166]">Đặt vé thành công</p>
        </div>
        <div className="flex gap-7.5">
          <Button title="Quay về trang chủ" className="w-50" />
          <Button
            title="Lịch sử đặt vé"
            btnSecondary
            className="w-50"
            onClick={() => router.push("/booking-history")}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessful;
