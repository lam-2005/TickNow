"use client";
import { ButtonPlay } from "@/components/Button/ButtonOfItemMovie";
import env from "@/configs/environment";
import { MovieType } from "@/interfaces/movie.interface";
import { saveTicket, TicketTypeLocalStorage } from "@/utils/saveTicket";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar, FaTags } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
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
    <div className="relative w-screen sm:max-h-[500px] h-fit aspect-video text-white">
      {/* Banner for desktop only */}
      <div className="w-full h-full brightness-50 relative max-sm:hidden">
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
          className="bg-gradient-to-t from-[rgba(7,7,7)] via-[rgba(7,7,7,0.5)] to-[rgba(7,7,7,0)] bottom-0 w-full h-1/2 absolute"
        ></div>
      </div>

      {/* Container */}
      <div className="container w-full sm:absolute bottom-0 left-1/2 sm:-translate-x-1/2 px-4 pb-6 sm:px-0">
        {/* Mobile Layout */}
        <div className="flex flex-col sm:hidden gap-4">
          <div className="flex gap-4">
            <div className="flex-2 mx-auto">
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={posterSrc}
                  alt={movie.name}
                  fill
                  className="object-cover rounded-xl"
                  onError={() => setPosterSrc("/movies/default-movie.webp")}
                />
                <ButtonPlay
                  nameMovie={movie.name}
                  trailer={movie.trailer}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                />
              </div>
            </div>

            <div className="flex-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-semibold">{movie.name}</h1>
                <span className="bg-primary py-0.25 px-1 rounded-[5px] font-semibold italic text-white text-xs">
                  {movie.age}+
                </span>
              </div>
              <div className="space-y-1 text-sm mt-2">
                <div className="flex gap-2 w-full items-center">
                  <div className="text-nowrap">
                    <FaStar className="text-lg text-primary" />
                  </div>
                  <p className={`flex-4 block text-foreground text-justify`}>
                    {movie.star.toFixed(1)}/5.0
                  </p>
                </div>
                <div className="flex gap-2 w-full items-center">
                  <div className="text-nowrap">
                    <GrLanguage className="text-lg text-primary" />
                  </div>
                  <p className={`flex-4 block text-foreground text-justify`}>
                    {movie.language || "Đang cập nhật"}
                  </p>
                </div>
                <div className="flex gap-2 w-full items-center">
                  <div className="ext-nowrap">
                    <FaTags className="text-lg text-primary" />
                  </div>
                  <p className={`flex-4 block text-foreground text-justify`}>
                    {movie.genre.map((item) => item.name).join(", ") ||
                      "Đang cập nhật"}
                  </p>
                </div>
                <div className="flex gap-2 w-full items-center">
                  <div className="ext-nowrap">
                    <IoTime className="text-lg text-primary" />
                  </div>
                  <p className={`flex-4 block text-foreground text-justify`}>
                    {movie.duration + " phút" || "Đang cập nhật"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Nội dung phim</h2>
            <p
              className={`${showFullDescription ? "" : "line-clamp-2"} text-sm`}
            >
              {movie.description || "Đang cập nhật"}
            </p>
            {movie.description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary underline text-sm mt-1"
              >
                {showFullDescription ? "Thu gọn" : "Xem thêm"}
              </button>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <h2 className="text-lg font-semibold mb-1">Mô tả</h2>
            <p>
              <strong>Công chiếu:</strong> {formatDate}
            </p>
            <p>
              <strong>Đạo diễn:</strong> {movie.director || "Đang cập nhật"}
            </p>
            <p>
              <strong>Diễn viên:</strong> {movie.actor || "Đang cập nhật"}
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-row gap-5 sm:gap-[25px]">
          <div className="relative w-full max-w-[180px] sm:max-w-[204px] max-h-[306px] aspect-[2/3] mx-auto sm:mx-0">
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

          <div className="space-y-2.5 w-full text-left">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-semibold">{movie.name}</h1>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white text-sm">
                {movie.age}+
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-base">
              <div className="flex items-center gap-1">
                <span>
                  <strong>{movie.star.toFixed(1)}</strong>/5.0
                </span>
                <span className="text-xl text-yellow-400">
                  <FaStar />
                </span>
              </div>
              <div>{movie.duration} phút</div>
              <div>
                {movie.genre.map((item) => item.name).join(", ") ||
                  "Đang cập nhật"}
              </div>
              <div>{date.getFullYear()}</div>
            </div>

            <div>
              <p
                className={`${
                  showFullDescription ? "" : "line-clamp-2"
                } text-white text-sm`}
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

            <div className="flex gap-7.5 items-center flex-col sm:flex-row">
              <strong className="block w-[95px]">Công chiếu</strong>
              <span>{formatDate}</span>
            </div>
            <div className="flex gap-7.5 items-center flex-col sm:flex-row">
              <strong className="block w-[95px]">Đạo diễn</strong>
              <span>{movie.director || "Đang Cập Nhật"}</span>
            </div>
            <div className="flex gap-7.5 items-center flex-col sm:flex-row">
              <strong className="block w-[95px]">Diễn viên</strong>
              <span>{movie.actor || "Đang Cập Nhật"}</span>
            </div>
            <div className="flex gap-7.5 items-center flex-col sm:flex-row">
              <strong className="block w-[95px]">Ngôn ngữ</strong>
              <span>{movie.language.toString() || "Đang cập nhật"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
