import env from "@/configs/environment";
import { Cinema } from "@/interfaces/cinema.interface";
import Image from "next/image";
import React, { useState } from "react";

const CinemaList = ({ cinemas }: { cinemas: Cinema[] }) => {
  const [posterSrc, setPosterSrc] = useState(
    cinemas[0]?.image ? `${env.IMG_API_URL}${cinemas[0].image}` : "/images.jpg"
  );
  if (cinemas.length === 1)
    return (
      <div className="w-full bg-black/10 rounded-md shadow-md overflow-hidden">
        {/* Phần ảnh nền */}
        <div className="relative w-full h-40">
          <Image
            src={posterSrc}
            alt={`Ảnh rạp ${cinemas[0].name}`}
            fill
            priority
            className="object-cover"
            sizes="400px"
            onError={() => setPosterSrc("/images.jpg")}
          />
        </div>

        {/* Phần thông tin */}
        <div className="p-3">
          <h1 className="text-background font-bold text-base">
            {cinemas[0].name}
          </h1>
          <p className="text-background text-sm leading-relaxed mt-2.5">
            {cinemas[0].location.deatil_location}
          </p>
          {/* <Button title="Xem chi tiết" className="mt-5" /> */}
        </div>
      </div>
    );
  return (
    <ul className="list-disc list-inside mt-2 max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 space-y-4">
      {cinemas.map((cinema) => (
        <li
          key={cinema._id}
          className="text-background text-sm break-words whitespace-pre-line "
        >
          {cinema.name}
        </li>
      ))}
    </ul>
  );
};

export default CinemaList;
