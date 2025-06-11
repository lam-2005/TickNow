import Button from "@/components/Button/Button";
import Ticket from "@/components/Movie/Ticket";
import { useStage } from "@/hooks/contexts/useStage";
import { MovieType } from "@/interfaces/movie.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Payment = () => {
  const router = useRouter();
  const { prevStage } = useStage();
  return (
    <div className="flex gap-5 ">
      <div className="space-y-5 bg-background-card p-5 rounded-[10px] max-w-7/10 w-full h-fit">
        <h2>Thông tin vé</h2>
        <Ticket info={{} as MovieType} />
      </div>
      <div className="flex-column items-center bg-background-card flex-1 p-5 rounded-[10px] gap-5">
        <h2>Thanh toán</h2>
        <div className="space-y-[15px] w-full">
          <p>Phương thức thanh toán</p>
          <div className="space-y-[10px]">
            <div className="active [&.active]:border-primary w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
              <div className="size-7.5 bg-amber-200 rounded-[5px] relative overflow-hidden">
                <Image
                  src={"/logo/vnpay.webp"}
                  alt="vnpay-logo"
                  sizes="30px"
                  fill
                  className="object-cover"
                />
              </div>
              <span>VNPAY</span>
            </div>
            <div className="w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
              <div className="size-7.5 bg-amber-200 rounded-[5px] relative overflow-hidden">
                {" "}
                <Image
                  src={"/logo/momo.webp"}
                  alt="momo-logo"
                  fill
                  sizes="30px"
                  className="object-cover"
                />
              </div>
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
            <Button
              title="Thanh toán"
              className="w-full"
              onClick={() => router.push("/booking-successful")}
            />
            <Button title="Quay lại" btnSecondary onClick={prevStage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
