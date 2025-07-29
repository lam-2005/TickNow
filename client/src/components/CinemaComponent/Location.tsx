import React from "react";
import Image from "next/image";
import { Cinema } from "@/interfaces/cinema.interface";

interface Props {
  data: Cinema;
}

const LocationItem = ({ data }: Props) => {
  return (
    <div className="w-full bg-background-card rounded-md shadow-md overflow-hidden">
      {/* Phần ảnh nền */}
      <div className="relative w-full h-40">
        <Image
          src="/images.jpg"
          alt={`Ảnh rạp ${data.name}`}
          fill
          priority
          className="object-cover"
          sizes="400px"
        />
      </div>

      {/* Phần thông tin */}
      <div className="p-3">
        <h1 className="text-foreground font-bold text-base">{data.name}</h1>
        <p className="text-foreground text-sm leading-relaxed mt-2.5">
          {data.location.deatil_location}
        </p>
        {/* <Button title="Xem chi tiết" className="mt-5" /> */}
      </div>
    </div>
  );
};

export default LocationItem;
