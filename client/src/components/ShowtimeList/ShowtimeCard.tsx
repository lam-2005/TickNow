"use client";
import env from "@/configs/environment";
import { MovieType } from "@/interfaces/movie.interface";
import Image from "next/image";
import React from "react";
import { ButtonInfo, ButtonPlay } from "../Button/ButtonOfItemMovie";
import usePopup from "@/hooks/usePopup";
import TrailerPopup from "../Popup/TrailerPopup";
import InfoPopup from "../Popup/InfoPopup";

const ShowtimeCard = ({
  title,
  children,
  data,
  date,
}: {
  title?: string;
  data: MovieType;
  children: React.ReactNode;
  date: string;
}) => {
  const { trailerPopup, infoPopup, closeInfo, closeTrailer } = usePopup();
  const dateFormat = new Date(date);

  const day = dateFormat.getDate().toString().padStart(2, "0");
  const month = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
  const year = dateFormat.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <>
      {trailerPopup && (
        <TrailerPopup
          name={data.name}
          url={data.trailer}
          onClose={closeTrailer}
        />
      )}
      {infoPopup && <InfoPopup info={data} onClose={closeInfo} />}

      <div
        className="flex flex-col lg:flex-row gap-6 bg-background-card p-4 pb-8 
                   w-[95%] max-w-[1080px] mx-auto rounded-xl"
      >
        {/* Image */}
        <div className="relative w-full max-w-[250px] max-h-[375px] mx-auto lg:mx-0 aspect-[2/3]">
          <Image
            fill
            src={`${env.IMG_API_URL}${data.image}`}
            alt="Phim"
            sizes="(max-width: 768px) 100vw, 250px"
            loading="lazy"
            className="object-cover rounded-[10px]"
          />
          <div className="flex absolute bottom-0 translate-y-1/2 w-full justify-evenly z-10">
            <ButtonPlay nameMovie={data.name} trailer={data.trailer} />
            <ButtonInfo info={data} />
          </div>
        </div>

        {/* Text + Children */}
        <div className="flex-1 space-y-2.5 mt-5 lg:mt-0">
          <h1 className="text-xl font-bold">{data.name}</h1>

          <div className="space-y-1">
            <div className="flex flex-wrap gap-2 text-sm">
              <p className="min-w-[100px] font-medium">Ngày chiếu:</p>
              <p>
                <strong>{formattedDate}</strong>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <p className="min-w-[100px] font-medium">Thời lượng:</p>
              <p>
                <strong>{data.duration} phút</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {title && <p className="font-medium">{title}</p>}
            <div className="relative space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowtimeCard;
