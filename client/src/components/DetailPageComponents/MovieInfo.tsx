"use client";
import { ButtonPlay } from "@/components/Button/ButtonOfItemMovie";
import env from "@/configs/environment";
import { MovieType } from "@/interfaces/movie.interface";
import { saveTicket, TicketTypeLocalStorage } from "@/utils/saveTicket";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const MovieInfo = ({ movie }: { movie: MovieType }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [bannerSrc, setBannerSrc] = useState(
    movie?.banner
      ? `${env.IMG_API_URL}/banner/${movie.banner}`
      : "/banner/default-banner.webp"
  );
  const [posterSrc, setPosterSrc] = useState(
    movie?.image
      ? `${env.IMG_API_URL}/movie/${movie.image}`
      : "/movies/default-movie.webp"
  );
  const ticket: TicketTypeLocalStorage = {
    movie: movie,
    screening: null,
    seats: [],
    price: 0,
    total: 0,
  };
  useEffect(() => {
    saveTicket(ticket);
  }, []);
  const date = new Date(movie.release_date);
  const formatDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Đang Cập Nhật";
  return (
    <>
      <div className="relative w-screen max-h-[500px] h-full aspect-video text-white">
        <div className="w-full h-full brightness-50 relative ">
          {" "}
          <Image
            src={bannerSrc}
            alt={movie.name}
            fill
            priority
            sizes="1280px"
            className="object-cover"
            onError={() => setBannerSrc("/banner/default-banner.webp")}
          />
          <div
            aria-hidden="true"
            className={`bg-gradient-to-t from-[rgba(7,7,7)] via-[rgba(7,7,7,0.5)] to-[rgba(7,7,7,0)]
                bottom-0 Z-1000 w-full h-1/2 absolute`}
          ></div>
        </div>
        <div className="container flex gap-[25px] w-full absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="relative max-w-[204px] max-h-[300px] aspect-[2/3] w-full">
            <Image
              src={posterSrc}
              alt={movie.name}
              fill
              priority
              sizes="1280px"
              className="object-cover rounded-xl"
              onError={() => setPosterSrc("/movies/default-movie.webp")}
            />

            <ButtonPlay
              nameMovie={movie.name}
              trailer={movie.trailer}
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
              <div className="flex items-center gap-1">
                <span>
                  <strong>{movie.star.toFixed(1) || "0.0"}</strong>/5.0
                </span>
                <span className="text-xl text-yellow-400">
                  <FaStar />
                </span>
              </div>
              <div>{movie.duration} phút</div>
              <div>
                {movie.genre
                  .map((item) => {
                    return item.name;
                  })
                  .join(", ") || "Đang cập nhật"}
              </div>
              <div>{date.getFullYear()}</div>
            </div>

            <div className="">
              <p
                className={`${
                  showFullDescription ? "" : "line-clamp-2"
                } text-white`}
              >
                {movie.description || "Đang cập nhật"}
              </p>

              {!showFullDescription && movie.description.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="text-primary underline text-sm mt-1 block"
                >
                  Xem thêm
                </button>
              )}

              {showFullDescription && (
                <button
                  onClick={() => setShowFullDescription(false)}
                  className="text-primary underline text-sm mt-1 block"
                >
                  Thu gọn
                </button>
              )}
            </div>

            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Công chiếu</strong>
              <span className="text-white">
                {formatDate || "Đang cập nhật"}
              </span>
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
              <span className="text-white">
                {movie.language.toString() || "Đang cập nhật"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
