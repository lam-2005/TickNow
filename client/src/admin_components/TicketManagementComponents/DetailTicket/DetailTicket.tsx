import PopupContainer from "@/admin_components/PopupContainer";
import { ItemInfo } from "./InfoDetail";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TicketDetail } from "@/interfaces/ticket.interface";
import { getTicketList } from "@/services/ticket.service";
import env from "@/configs/environment";

const DetailTicket = ({
  id,
  closeForm,
}: {
  id: string;
  closeForm: () => void;
}) => {
  //   const { layout } = handleShowRoom(info);
  const [loading, setLoading] = useState(true);
  const [getInfo, setGetInfo] = useState<TicketDetail | null>(null);
  useEffect(() => {
    const getPostDetail = async (id: string) => {
      try {
        const res = await getTicketList(`/${id}`);
        const data = res?.data;
        setGetInfo(data);
      } catch (error) {
        console.error("Failed to fetch ticket detail", error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetail(id);
  }, [id]);
  const formatDate = new Date(getInfo?.screening.date ?? "");
  const newDate = formatDate.toLocaleDateString("vi-VN");
  return (
    <PopupContainer title="Chi tiết vé" closeForm={closeForm}>
      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : (
        <div className="min-w-[700px] w-full space-y-5 p-5 ">
          <div className="flex gap-7.5">
            <div className="relative max-w-[235px] min-h-50 w-full h-full aspect-[2/3] bg-amber-500 overflow-hidden rounded-[10px]">
              <Image
                fill
                src={`${env.IMG_API_URL}/movie/${getInfo?.movie.image}`}
                alt="Phim"
                sizes="300px"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex-column justify-between gap-5 items-start">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 ">
                  <h2 className="capitalize">{getInfo?.movie.name}</h2>
                  <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                    {getInfo?.movie.age}+
                  </span>
                </div>

                <ItemInfo
                  title="Người dùng:"
                  content={getInfo?.user.name ?? ""}
                />

                <ItemInfo
                  title="Rạp chiếu:"
                  content={getInfo?.room.name_cinema ?? ""}
                />
                <ItemInfo
                  title="Địa điểm:"
                  content={getInfo?.room.location.deatil_location ?? ""}
                />
                <ItemInfo
                  title="Phòng chiếu:"
                  content={getInfo?.room.code_room ?? ""}
                />
                <ItemInfo
                  title="Ngày chiếu:"
                  content={`${getInfo?.screening.time_start} - ${newDate}`}
                />
                <ItemInfo
                  title="Thời lượng:"
                  content={`${getInfo?.movie.duration} phút`}
                />
                <ItemInfo
                  title="Định dạng:"
                  content={
                    getInfo?.screening.showtype &&
                    Number(getInfo?.screening.showtype) === 1
                      ? "Phụ đề"
                      : "Lồng tiếng"
                  }
                />
                <ItemInfo
                  title="Ghế:"
                  content={getInfo?.ticket.seat?.join(",") ?? ""}
                />
              </div>
              <h2>
                Tổng giá vé:{" "}
                <span className="text-2xl text-primary">
                  {getInfo?.ticket.price.toLocaleString("vi-VN")} ₫
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </PopupContainer>
  );
};

export default DetailTicket;
