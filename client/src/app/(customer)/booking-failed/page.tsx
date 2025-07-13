import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const BookingFailed = () => {
  return (
    <div className="mt-10 space-y-10">
      <div className="flex-column items-center gap-[40px] rounded-[15px] bg-background-card w-fit m-auto p-10">
        <div className="flex-center flex-col gap-5">
          <div className="size-[70px] rounded-[50%] bg-red-500 flex-center">
            <IoCloseSharp size={40} color="#fff" />
          </div>
          <p className="text-3xl text-red-500">Đặt vé thất bại</p>
        </div>
        <div className="space-y-5 text-center">
          <p>
            Trường hợp giao dịch chưa thành công, quý khách vui lòng không thực
            hiện giao dịch online lần nữa và tới rạp TickNow gần nhất để mua vé
          </p>
          <p>
            Việc phản hồi tới quý khách có thể bị chậm trễ, mong quý khách thông
            cảm và kiên nhẫn cùng nhân viên CSKH của TickNow
          </p>
          <p>
            Vui lòng gởi thông tin giao dịch lỗi về email{" "}
            <span className="text-primary">abcde@gmail.com</span> hoặc qua số
            điện thoại <span className="text-primary">0123456789</span>
          </p>
        </div>
        <div className="flex gap-7.5">
          <Link href={"/"}>
            <Button title="Quay về trang chủ" className="w-50" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingFailed;
