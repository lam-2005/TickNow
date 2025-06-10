import React from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useStage } from "@/hooks/contexts/useStage";

const DetailTicket = () => {
  const router = useRouter();
  const { nextStage } = useStage();
  return (
    <div className="bg-background-card p-5 w-full rounded-[10px] flex-between mt-5">
      <div className="space-y-2.5">
        <h2>Phim Chiếu Rạp</h2>
        <p>
          <strong>TickNow Quận 12 (Thành phố Hồ Chí Minh)</strong>
        </p>
        <p>
          Suất: <strong>21:00</strong> - Thứ 3, <strong>27/07/2025</strong>
        </p>
        <p>
          Ghế đã chọn: <strong>B1, B2, B3, B4</strong>
        </p>
      </div>
      <div className="flex flex-col items-end gap-[15px]">
        <div className="text-lg flex gap-[5px]">
          Thời gian giữ ghế:{" "}
          <span className="text-primary text-xl font-bold">5:00</span>
        </div>
        <div className="flex gap-[5px]">
          <p className="text-lg">Tổng cộng:</p>
          <span className="text-primary font-bold text-2xl">1.000.000 ₫</span>
        </div>
        <div className="flex gap-5">
          <Button
            title="Quay lại"
            className="bg-transparent border-1 border-foreground text-foreground before:bg-primary [&_span]:text-foreground hover:[&_span]:text-white hover:border-primary"
            onClick={() => router.back()}
          />
          <Button title="Thanh toán" onClick={nextStage} />
        </div>
      </div>
    </div>
  );
};

export default DetailTicket;
