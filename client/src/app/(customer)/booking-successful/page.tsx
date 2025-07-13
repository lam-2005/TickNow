import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const BookingSuccessful = () => {
  return (
    <div className="mt-10 space-y-10">
      <div className="flex-column items-center gap-[40px] rounded-[15px] bg-background-card w-fit p-10 m-auto">
        <div className="flex-center flex-col gap-5">
          <div className="size-[70px] rounded-[50%] bg-[#2EB166] flex-center">
            <FaCheck size={40} color="#fff" />
          </div>
          <p className="text-3xl text-[#2EB166]">Đặt vé thành công</p>
        </div>
        <div className="flex gap-7.5">
          <Link href={"/"}>
            <Button title="Quay về trang chủ" className="w-50" />
          </Link>
          <Link href={"/booking-history"}>
            <Button title="Lịch sử đặt vé" btnSecondary className="w-50" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessful;
