"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import { ButtonInfo, ButtonPlay } from "../Button/ButtonOfItemMovie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TrailerPopup from "../Popup/TrailerPopup";
import { MovieType } from "@/interfaces/movie.interface";
import InfoPopup from "../Popup/InfoPopup";

import usePopup from "@/hooks/usePopup";
import env from "@/configs/environment";
import convertSlug from "@/utils/convertSlug";

const Movie = ({
  info,
  textColor,
}: {
  info: MovieType;
  textColor?: string;
}) => {
  const [posterSrc, setPosterSrc] = useState(
    info?.image
      ? `${env.IMG_API_URL}${info.image}`
      : "/movies/default-movie.webp"
  );
  const router = useRouter();
  const { trailerPopup, infoPopup, closeInfo, closeTrailer } = usePopup();
  const slugName = convertSlug(info.name);

  return (
    <>
      {trailerPopup && (
        <TrailerPopup
          name={info.name}
          url={info.trailer}
          onClose={closeTrailer}
        />
      )}
      {infoPopup && <InfoPopup info={info} onClose={closeInfo} />}
      <div className="group w-full flex-column items-center gap-2.5">
        <div
          className="w-full aspect-[2/3] relative z-9 
      "
        >
          <Link href={`/detail/${slugName}-${info._id}`}>
            <div className="w-full h-full relative rounded-xl overflow-hidden bg-loading">
              <Image
                fill
                src={posterSrc}
                alt={info.name}
                sizes="300px"
                loading={!info[0] ? "lazy" : "eager"}
                className="object-cover 
            group-hover:scale-110 transition-transform duration-300 "
                onError={() => setPosterSrc("/movies/default-movie.webp")}
                priority={info[0]}
              />
            </div>
          </Link>
          <div className=" flex absolute -bottom-5 w-full justify-evenly z-10">
            <ButtonPlay nameMovie={info.name} trailer={info.trailer} />
            <ButtonInfo info={info} />
          </div>
        </div>
        <h3
          className={`font-semibold line-clamp-1 px-2.5 
      mt-4 ${textColor}`}
        >
          <Link
            href={`/detail/${slugName}-${info._id}`}
            className="group-hover:text-primary transition-colors duration-500 "
          >
            {info.name}
          </Link>
        </h3>
        <Button
          title="Đặt vé ngay"
          onClick={() => router.push(`/detail/${slugName}-${info._id}`)}
        />
      </div>
    </>
  );
};

export default Movie;
