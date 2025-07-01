"use client";
import { ButtonPlay } from "@/components/Button/ButtonOfItemMovie";
import TrailerPopup from "@/components/Popup/TrailerPopup";
import env from "@/configs/environment";
import usePopup from "@/hooks/usePopup";
import { MovieType } from "@/interfaces/movie.interface";
import Image from "next/image";
import React from "react";

const MovieInfo = ({ movie }: { movie: MovieType }) => {
  const { trailerPopup, openTrailer, closeTrailer } = usePopup();
  const date = new Date(movie.release_date);
  const formatDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("vi-VN")
    : "Đang Cập Nhật";
  return (
    <>
      {trailerPopup && (
        <TrailerPopup
          name={movie.name}
          url={movie.trailer}
          onClose={closeTrailer}
        />
      )}
      <div className="relative w-screen max-h-[500px] h-full aspect-video text-white">
        <div className="bg-amber-300 w-full h-full brightness-50 relative">
          {" "}
          <Image
            src={`${env.IMG_API_URL}/banner/${movie.banner}`}
            alt={movie.name}
            fill
            priority
            sizes="1280px"
            className="object-cover
                "
          />
          <div
            //   ${
            //   theme === "dark"
            //     ? "bg-gradient-to-t from-[rgba(7,7,7)] via-[rgba(7,7,7,0.5)] to-[rgba(7,7,7,0)] "
            //     : " "
            // }
            aria-hidden="true"
            className={`bg-gradient-to-t from-[rgba(7,7,7)] via-[rgba(7,7,7,0.5)] to-[rgba(7,7,7,0)]
                bottom-0 Z-1000 w-full h-1/2 absolute`}
          ></div>
        </div>
        <div className="container flex gap-[25px] w-full absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="relative max-w-[204px] max-h-[300px] aspect-[2/3] w-full bg-red-400 rounded-[15px]">
            <Image
              src={`${env.IMG_API_URL}/movie/${movie.image}`}
              alt={movie.name}
              fill
              priority
              sizes="1280px"
              className="object-cover
                "
            />
            <ButtonPlay
              onClick={openTrailer}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
            />
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <h1>{movie.name}</h1>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                {movie.age}+
              </span>
            </div>

            <div className="flex gap-5 [&_div]:not-first:before:w-px [&_div]:not-first:before:h-[12px] [&_div]:not-first:before:bg-white [&_div]:not-first:before:absolute [&_div]:not-first:relative [&_div]:not-first:before:-left-2.5 [&_div]:not-first:before:top-1/2 [&_div]:not-first:before:-translate-y-1/2">
              <div>0.0/10</div>
              <div>{movie.duration} phút</div>
              <div>
                {movie.genre
                  .map((item) => {
                    return item.name;
                  })
                  .join(", ")}
              </div>
              <div>{date.getFullYear()}</div>
            </div>

            <p className="line-clamp-2 text-white">{movie.description}</p>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Công chiếu</strong>
              <span className="text-white">{formatDate}</span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Đạo diễn</strong>
              <span className="text-white">
                {movie.director || "Đang Cập Nhật"}
              </span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Diễn viên</strong>
              <span className="text-white">
                {movie.actor || "Đang Cập Nhật"}
              </span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Ngôn ngữ</strong>
              <span className="text-white">{"Đang cập nhật"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
