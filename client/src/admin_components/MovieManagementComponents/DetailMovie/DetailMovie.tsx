"use client";
import React from "react";
import { MovieType } from "@/interfaces/movie.interface";
import env from "@/configs/environment";
import Image from "next/image";
import PopupContainer from "../../PopupContainer";

type Props = {
  movie: MovieType;
  onClose: () => void;
};

const MovieDetail = ({ movie, onClose }: Props) => {
  return (
    <PopupContainer title="Chi Tiết Phim" closeForm={onClose}>
      <div className="space-y-5 px-6 flex-1 overflow-y-auto pb-5">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={
              `${env.IMG_API_URL}/movie/${movie.image}` || "/movies/default.png"
            }
            alt="Poster"
            width={240}
            height={320}
            className="rounded-lg shadow object-cover "
            style={{ height: "320px", width: "240px", objectFit: "contain" }}
          />
          <div className="text-sm text-gray-700 space-y-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {movie.name}
            </h2>
            <p>
              <strong>Ngày công chiếu:</strong>{" "}
              {new Date(movie.release_date).toLocaleDateString("vi-VN")}
            </p>
            <p>
              <strong>Đạo diễn:</strong> {movie.director || "Đang cập nhật"}
            </p>
            <p>
              <strong>Diễn viên:</strong> {movie.actor || "Đang cập nhật"}
            </p>
            <p>
              <strong>Ngôn ngữ:</strong> {movie.language || "Đang cập nhật"}
            </p>
            <p>
              <strong>Thời lượng:</strong> {movie.duration || "Đang cập nhật"}{" "}
              phút
            </p>
            <p>
              <strong>Độ tuổi:</strong> {movie.age}+
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {Number(movie.status) === 1
                ? "Đang Chiếu"
                : Number(movie.status) === 2
                ? "Sắp Chiếu"
                : "Ngừng Chiếu"}
            </p>
            <p>
              <strong>Thể loại:</strong>{" "}
              {Array.isArray(movie.genre)
                ? movie.genre.map((g) => g.name).join(", ")
                : "Đang cập nhật"}
            </p>
            <p>
              <strong>Đánh giá:</strong> {movie.star ?? "Chưa có"}
            </p>
            <p className="whitespace-pre-line">
              <strong>Mô tả:</strong> {movie.description || "Đang cập nhật"}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-bold">Trailer</p>
          <div className="flex-1 flex gap-5 justify-end max-lg:hidden w-full">
            <iframe
              className={`rounded-2xl aspect-[16/9] w-full`}
              src={`${movie.trailer}?autoplay=1&enablejsapi=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;  encrypted-media;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </PopupContainer>
  );
};

export default MovieDetail;
