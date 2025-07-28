"use client";
import { MovieType } from "@/interfaces/movie.interface";
import React, { useState } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import PopupContainer from "./PopupContainer";
import env from "@/configs/environment";
import Link from "next/link";
import convertSlug from "@/utils/convertSlug";

export const ItemInfo = ({
  title,
  content,
  className,
}: {
  title: string;
  content: string;
  className?: string;
}) => {
  return (
    <div className="flex gap-4 text-sm md:text-base w-full">
      <div className="w-[100px] text-nowrap font-medium text-gray-300">
        {title}
      </div>
      <strong
        className={`flex-1 block text-foreground text-justify ${className}`}
      >
        {content}
      </strong>
    </div>
  );
};

const InfoPopup = ({
  info,
  onClose,
}: {
  info: MovieType;
  onClose: () => void;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <PopupContainer onClose={onClose}>
      <div className="w-full space-y-5 text-white px-2 sm:px-0">
        {/* Responsive Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:max-w-[220px] aspect-[2/3] mx-auto md:mx-0 max-md:hidden rounded-xl overflow-hidden bg-gray-200">
            <Image
              fill
              src={
                info.image
                  ? `${env.IMG_API_URL}/movie/${info.image}`
                  : "/movies/default.png"
              }
              alt={info.name}
              sizes="(max-width: 768px) 100vw, 220px"
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between items-start space-y-5 mt-5 md:mt-0">
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-lg md:text-xl font-bold">{info.name}</h2>
                <span className="bg-primary py-0.5 px-2 rounded-md text-xs font-semibold italic text-white">
                  {info.age}+
                </span>
              </div>
              <ItemInfo
                title="Công chiếu:"
                content={new Date(info.release_date).toLocaleDateString(
                  "vi-VN",
                  { day: "2-digit", month: "2-digit", year: "numeric" }
                )}
              />
              <ItemInfo
                title="Thể loại:"
                content={info.genre.map((g) => g.name).join(", ")}
              />
              <ItemInfo title="Thời lượng:" content={`${info.duration} phút`} />
              <ItemInfo
                title="Đạo diễn:"
                content={info.director || "Đang cập nhật"}
              />
              <ItemInfo
                title="Diễn viên:"
                content={info.actor || "Đang cập nhật"}
              />
              <ItemInfo
                title="Ngôn ngữ:"
                content={info.language || "Đang cập nhật"}
              />
            </div>

            <Link
              href={`/detail/${convertSlug(info.name)}-${info._id}`}
              className="w-full sm:w-auto"
            >
              <Button title="Đặt vé ngay" className="w-full sm:w-auto" />
            </Link>
          </div>
        </div>

        {/* Mô tả phim */}
        <div className="text-sm leading-relaxed">
          <p
            className={`${
              showFullDescription ? "" : "line-clamp-5 md:line-clamp-3"
            }`}
          >
            {info.description || "Đang cập nhật"}
          </p>

          {/* Toggle "Xem thêm / Thu gọn" */}
          {info.description && info.description.length > 300 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary underline text-sm mt-2 block"
            >
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </PopupContainer>
  );
};

export default InfoPopup;
