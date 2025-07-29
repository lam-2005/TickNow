"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import env from "@/configs/environment";
import { TicketDetail } from "@/interfaces/ticket.interface";
import { getTicketList } from "@/services/ticket.service";
import { toast } from "react-toastify";
import PopupContainer from "@/components/Popup/PopupContainer";
import { ItemInfo } from "@/components/Popup/InfoPopup";

const TicketInfo = ({
  idTicket,
  onClose,
}: {
  idTicket: string;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [detailTicket, setDetailTickket] = useState<TicketDetail | null>(null);
  useEffect(() => {
    const getDetailTicket = async () => {
      try {
        setLoading(true);
        if (!idTicket) {
          return;
        }
        const res = await getTicketList(`/${idTicket}`);
        setDetailTickket(res?.data);
      } catch (error) {
        toast.error("Lỗi lấy chi tiết vé");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getDetailTicket();
  }, [idTicket]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayOfWeek = weekdays[date.getDay()];
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear());

    return `${dayOfWeek}, ${dd}/${mm}/${yy}`;
  };

  return (
    <PopupContainer onClose={onClose}>
      {loading ? (
        <div className="w-full space-y-5 ">
          <div className="flex gap-7.5">
            <div className="relative max-w-[235px] w-full h-full aspect-[2/3] overflow-hidden rounded-[10px] animate-pulse bg-loading"></div>
            <div className="flex-1 flex-column justify-between gap-5 items-start">
              <div className="space-y-5">
                <div className="w-60 h-10 rounded-xl animate-pulse bg-loading"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
                <div className="w-70 animate-pulse bg-loading h-5 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full space-y-5 ">
          <div className="flex gap-7.5">
            <div className="relative max-w-[235px] w-full h-full aspect-[2/3] bg-amber-500 overflow-hidden rounded-[10px]">
              <Image
                fill
                src={`${env.IMG_API_URL}${detailTicket?.movie.image}`}
                alt="Phim"
                sizes="300px"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex-column justify-between gap-5 items-start">
              <div className="space-y-2.5 w-full">
                <div className="flex items-center gap-2.5 ">
                  <h2 className="capitalize">{detailTicket?.movie.name}</h2>
                  <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                    18+
                  </span>
                </div>
                <ItemInfo
                  title="Rạp chiếu:"
                  content={`${detailTicket?.room.name_cinema || ""} (${
                    detailTicket?.room.location.location
                  })`}
                />
                <ItemInfo
                  title="Địa điểm:"
                  content={detailTicket?.room.location.deatil_location || ""}
                />
                <ItemInfo
                  title="Phòng chiếu:"
                  content={(detailTicket?.room.code_room as string) || ""}
                />
                <ItemInfo
                  title="Ngày chiếu:"
                  content={`${detailTicket?.screening.time_start || ""} - ${
                    detailTicket?.screening.date
                      ? formatDate(detailTicket?.screening.date)
                      : ""
                  }`}
                />
                <ItemInfo
                  title="Thời lượng:"
                  content={`${detailTicket?.movie.duration} phút`}
                />
                <ItemInfo
                  title="Định dạng:"
                  content={
                    detailTicket?.screening.showtype === 1
                      ? "Phụ đề"
                      : "Lông tiếng"
                  }
                />
                <ItemInfo
                  title="Ghế:"
                  content={
                    detailTicket?.ticket.seat
                      ? detailTicket?.ticket.seat.join(",")
                      : ""
                  }
                />
              </div>
              <h2>
                Tổng giá vé:{" "}
                <span className="text-2xl text-primary">
                  {detailTicket?.ticket.price.toLocaleString("vi-Vn")} ₫
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </PopupContainer>
  );
};

export default TicketInfo;
