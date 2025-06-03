import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
const Location = () => {
  return (
    <div className="  w-full bg-background-card rounded-md shadow-md overflow-hidden">
      {/* Phần ảnh nền */}
      <div className="relative w-full h-40">
        <Image
          src={`/banner/drop.jpg`}
          alt="Ảnh rạp chiếu"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Phần thông tin */}
      <div className="p-3">
        <h1 className="text-foreground font-bold text-base">
          TickNow Quận 12 (Thành phố Hồ Chí Minh)
        </h1>
        <p className="text-foreground text-sm leading-relaxed mt-2.5">
          12, Phường Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh
        </p>
        <Button
        title="Xem chi tiết"
        className="mt-5"
        />
      </div>
    </div>
  );
};

export default Location;
