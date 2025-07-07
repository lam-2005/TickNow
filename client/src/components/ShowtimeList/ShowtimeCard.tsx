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
  const {
    trailerPopup,
    openTrailer,
    infoPopup,
    openInfo,
    closeInfo,
    closeTrailer,
  } = usePopup();
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
      <div className="flex gap-7.5 h-fit bg-background-card p-4 pb-8  container w-[80%] rounded-xl">
        <div className="relative max-w-[227px] w-full aspect-[2/3] max-h-[340px] ">
          <Image
            fill
            src={`${env.IMG_API_URL}/movie/${data.image}`}
            alt="Phim"
            sizes="300px"
            loading="lazy"
            className="object-cover rounded-[10px] "
          />
          <div className=" flex absolute bottom-0 translate-y-1/2 w-full justify-evenly z-10">
            <ButtonPlay onClick={openTrailer} />
            <ButtonInfo onClick={openInfo} />
          </div>
        </div>
        <div className="space-y-[10px] flex-1">
          <h1>{data.name}</h1>
          <div className="space-y-[5px]">
            <div className="flex gap-2.5">
              <p className="w-[100px] ">Ngày chiếu</p>
              <p>
                <strong>{formattedDate}</strong>
              </p>
            </div>
            <div className="flex gap-2.5">
              <p className="w-[100px] ">Thời lượng</p>
              <p>
                <strong>{data.duration} phút</strong>
              </p>
            </div>
          </div>
          <div className="space-y-1.25 ">
            <p className=" ">{title || ""}</p>
            <div className="space-y-7.5 relative ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowtimeCard;
