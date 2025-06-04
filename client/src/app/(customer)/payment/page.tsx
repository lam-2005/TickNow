import StageBooking from "@/components/BookingPageComponents/StageBooking";
import Button from "@/components/Button/Button";
import React from "react";

const Payment = () => {
  return (
    <div className="container mt-10 space-y-10">
      <StageBooking />
      <div className="flex gap-5 ">
        <div className="space-y-5 bg-background-card p-5 rounded-[10px] max-w-3/5 w-full h-fit">
          <h2>Thông tin phim</h2>
          <div className="flex items-center gap-5">
            <div className="bg-amber-400 max-w-[200px] w-full max-h-[300px] h-full aspect-[2/3] rounded-[15px] "></div>
            <div className="space-y-2.5">
              <h2>Phim chiếu rap</h2>
              <div className="flex gap-2.5">
                <span className="block max-w-[200px] w-full">Rạp chiếu</span>
                <strong className="line-clamp-2">
                  TickNow Quận 12 (Thành phố Hồ Chí Minh)
                </strong>
              </div>
              <div className="flex gap-2.5">
                <span className="block w-[200px]">Thời lượng</span>
                <strong>120 phút</strong>
              </div>{" "}
              <div className="flex gap-2.5">
                <span className="block w-[200px]">Phòng chiếu</span>
                <strong>02</strong>
              </div>{" "}
              <div className="flex gap-2.5">
                <span className="block w-[200px]">Ngày chiếu</span>
                <strong>9:20 - 27/05/2025</strong>
              </div>{" "}
              <div className="flex gap-2.5">
                <span className="block w-[200px]">Định dạng</span>
                <strong>2D Phụ đề</strong>
              </div>
              <div className="flex gap-2.5">
                <span className="block w-[200px]">Ghế</span>
                <strong>B1, B2, B3, B4</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-column items-center bg-background-card flex-1 p-5 rounded-[10px] gap-5">
          <h2>Thanh toán</h2>
          <div className="space-y-[15px] w-full">
            <p>Phương thức thanh toán</p>
            <div className="space-y-[10px]">
              <div className="w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
                <div className="size-7.5 bg-amber-200 rounded-[5px]"></div>
                <span>VNPAY</span>
              </div>
              <div className="w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
                <div className="size-7.5 bg-amber-200 rounded-[5px]"></div>
                <span>Momo</span>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-2.5 items-center">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="border-1 border-gray-400 rounded-[5px] focus:border-foreground outline-none w-full px-4 py-2 transition-colors duration-300"
            />
            <button
              className="bg-primary text-white rounded-[5px] px-4 py-2 text-nowrap disabled:brightness-50 cursor-not-allowed"
              disabled
            >
              Áp dụng
            </button>
          </div>
          <div className="w-full space-y-[15px]">
            <p>Chi phí</p>
            <div className="space-y-[5px]">
              <div className="w-full flex justify-between">
                <span>Thanh toán</span>
                <strong>1.000.000 ₫</strong>
              </div>
              <div className="w-full flex justify-between">
                <span>Ưu đãi</span>
                <strong>- 100.000 ₫</strong>
              </div>
              <div className="w-full flex justify-between">
                <span>Phí</span>
                <strong>0 ₫</strong>
              </div>
              <div className="w-full flex justify-between">
                <span>Tổng cộng</span>
                <strong>900.000 ₫</strong>
              </div>
            </div>
            <div className="space-y-2.5 mt-5">
              <Button title="Thanh toán" className="w-full" />
              <Button
                title="Quay lại"
                className="bg-transparent border-1 border-foreground text-foreground before:bg-primary [&_span]:text-foreground hover:[&_span]:text-white hover:border-primary w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
