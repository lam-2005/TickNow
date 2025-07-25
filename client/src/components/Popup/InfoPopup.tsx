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
    <div className="flex gap-7.5 w-full">
      <div className="flex-1 text-nowrap">{title}</div>
      <strong
        className={`flex-4 block text-foreground text-justify ${className}`}
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
      <div className="w-full space-y-5 ">
        <div className="flex gap-7.5">
          <div className="relative max-w-[220px] w-full h-full aspect-[2/3] bg-amber-500 overflow-hidden rounded-[10px]">
            <Image
              fill
              src={
                `${env.IMG_API_URL}/movie/${info.image}` ||
                "/movies/default.png"
              }
              alt="Phim"
              sizes="300px"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex-column justify-between items-start">
            <div className="space-y-2.5 w-full">
              <div className="flex items-center gap-2.5">
                <h2>{info.name}</h2>
                <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
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
                content={info?.actor || "Đang cập nhật"}
              />
              <ItemInfo
                title="Ngôn ngữ"
                content={info.language || "Đang cập nhật"}
              />
            </div>
            <Link href={`/detail/${convertSlug(info.name)}-${info._id}`}>
              <Button title="Đặt vé ngay" />
            </Link>
          </div>
        </div>
        <div className="">
          <p
            className={`${
              showFullDescription ? "" : "line-clamp-5"
            } text-white`}
          >
            {info.description || "Đang cập nhật"}
          </p>

          {!showFullDescription && info.description.length > 500 ? (
            <button
              onClick={() => setShowFullDescription(true)}
              className="text-primary underline text-sm mt-1 block"
            >
              Xem thêm
            </button>
          ) : (
            ""
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
      </div>
    </PopupContainer>
  );
};

export default InfoPopup;
