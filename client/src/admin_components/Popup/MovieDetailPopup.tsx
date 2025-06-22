"use client";
import React from "react";
import { MovieType } from "@/interfaces/movie.interface";
import Image from "next/image";
import env from "@/configs/environment";

type Props = {
  movie: MovieType;
  onClose: () => void;
};

const MovieDetailPopup: React.FC<Props> = ({ movie, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl shadow-2xl relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-black text-2xl font-bold z-10"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          <Image
            src={`${env.IMG_API_URL}/movie/${movie.image}`}
            alt="Poster"
            width={200}
            height={300}
            className="rounded shadow object-cover"
          />
          {/* Info */}
          <div className="col-span-2 space-y-2 text-sm text-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎬 Chi Tiết Phim
            </h2>
            <p><strong>Tên phim:</strong> {movie.name}</p>
            <p><strong>Ngày công chiếu:</strong> {new Date(movie.release_date).toLocaleDateString("vi-VN")}</p>
            <p><strong>Đạo diễn:</strong> {movie.director}</p>
            <p><strong>Quốc gia:</strong> {movie.nation}</p>
            <p><strong>Độ tuổi:</strong> {movie.age}+</p>
            <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
            <p><strong>Ngôn ngữ:</strong> {movie.language}</p>
            <p><strong>Đánh giá:</strong> {movie.star}</p>
            <p><strong>Trạng thái:</strong> {Number(movie.status) === 1? "Đang Chiếu": Number(movie.status) === 2? "Sắp Chiếu": "Ngưng Chiếu"}</p>
            <p>
              <strong>Thể Loại:</strong>{" "}
              {Array.isArray(movie.genre)
                ? movie.genre.map((g) => g.name).join(", ")
                : movie.genre}
            </p>
            <p><strong>Mô tả:</strong> {movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPopup;
