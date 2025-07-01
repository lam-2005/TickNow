import React from "react";
import PopupContainer from "./PopupContainer";
import Image from "next/image";
import { env } from "process";
import Button from "../Button/Button";
import { FaRegStar } from "react-icons/fa6";

const RatePopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <PopupContainer onClose={onClose}>
      <div className="w-full space-y-5 ">
        <div className="flex gap-7.5">
          <div className="relative max-w-[220px] w-full h-full aspect-[2/3] bg-amber-500 overflow-hidden rounded-[10px]">
            <Image
              fill
              src={`/movies/am-duong-lo.webp`}
              alt="Phim"
              sizes="300px"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex-column justify-between items-start">
            <div className="space-y-2.5 w-full">
              <div className="flex items-center gap-2.5">
                <h2>Đánh giá phim: Âm Dương Lộ</h2>
              </div>
              <div className="flex gap-5">
                <span className="text-lg">Đánh giá:</span>
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-2.5">
                    <span className="text-xl">
                      <FaRegStar />
                    </span>
                    <span className="text-xl">
                      <FaRegStar />
                    </span>
                    <span className="text-xl">
                      <FaRegStar />
                    </span>
                    <span className="text-xl">
                      <FaRegStar />
                    </span>
                    <span className="text-xl">
                      <FaRegStar />
                    </span>
                  </div>
                  <span className="">0/5</span>
                </div>
              </div>
              <div className="flex-column w-full gap-2.5">
                <span className="text-lg">Bình luận</span>
                <textarea
                  name=""
                  id=""
                  placeholder="Nhập bình luận của bạn"
                  className="border border-gray-300 rounded-lg p-2 w-full h-24 "
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <Button title="Đánh giá" />
            </div>
          </div>
        </div>
      </div>
    </PopupContainer>
  );
};

export default RatePopup;
