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
  console.log(`${env.IMG_API_URL}/movie/${movie.image}`)
  return (
    <PopupContainer title="Chi Tiết Phim" closeForm={onClose}>
      <div className="space-y-5 px-6 flex-1 overflow-y-auto pb-5 max-h-[75vh]">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={`${env.IMG_API_URL}/movie/${movie.image}`}
            alt="Poster"
            width={240}
            height={320}
            className="rounded shadow object-cover"
          />
          <div className="text-sm text-gray-700 space-y-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{movie.name}</h2>
            <p><strong>Ngày công chiếu:</strong> {new Date(movie.release_date).toLocaleDateString("vi-VN")}</p>
            <p><strong>Đạo diễn:</strong> {movie.director}</p>
            <p><strong>Diễn viên:</strong> {movie.actor}</p>
            <p><strong>Ngôn ngữ:</strong> {movie.language}</p>
            <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
            <p><strong>Độ tuổi:</strong> {movie.age}+</p>
            <p><strong>Trạng thái:</strong> {Number(movie.status) === 1 ? "Đang Chiếu" : Number(movie.status) === 2 ? "Sắp Chiếu" : "Ngừng Chiếu"}</p>
            <p><strong>Thể loại:</strong> {Array.isArray(movie.genre) ? movie.genre.map((g) => g.name).join(", ") : "Không rõ"}</p>
            <p><strong>Đánh giá:</strong> {movie.star ?? "Chưa có"}</p>
            <p className="whitespace-pre-line"><strong>Mô tả:</strong> {movie.description}</p>
          </div>
        </div>

      </div>
    </PopupContainer>
  );
};

export default MovieDetail;
