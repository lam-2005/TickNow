"use client";
import RatePopup from "@/components/Popup/RatePopup";
import usePopup from "@/hooks/usePopup";
import { DataTicketUserList } from "@/interfaces/ticket.interface";
import React, { useState } from "react";
import TicketInfo from "./TicketInfo";
const TableTicket = ({ data }: { data: DataTicketUserList[] }) => {
  const [idTicket, setIdTickket] = useState("");
  const {
    ticketPopup,
    openTicket,
    closeTicket,
    closeRating,
    openRating,
    ratingPopup,
  } = usePopup();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-Vn", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const handleGetIdTicket = (id: string) => {
    setIdTickket(id);
    openRating();
  };
  const handleGetIdTicketInfo = (id: string) => {
    setIdTickket(id);
    openTicket();
  };
  return (
    <>
      {ticketPopup && <TicketInfo onClose={closeTicket} idTicket={idTicket} />}
      {ratingPopup && (
        <RatePopup
          idTicket={idTicket}
          onClose={closeRating}
          onGetStatus={handleGetStatusCmt}
        />
      )}
      <table border={0} className="w-full">
        <thead className="[&_th]:text-center [&_th]:py-2 [&_th]:px-4 [&_th]:text-sm [&_th]:font-semibold border-1 border-primary">
          <tr className="bg-primary text-white">
            <th className="">Mã đặt vé</th>
            <th className="">Ngày giao dịch</th>
            <th className="">Tên phim</th>
            <th className="">Chi tiết vé</th>
            <th className="">Trạng thái</th>
            <th className="">Hành động</th>
          </tr>
        </thead>
        <tbody className="[&_tr]:even:bg-background-card border-1 border-foreground">
          {data.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="py-2">{item.code}</td>
              <td className="py-2">{formatDate(item.updatedAt)}</td>
              <td className="py-2 max-w-[500px]">
                <p className="line-clamp-1">{item.movie}</p>
              </td>

              <td className="py-2">
                <button
                  className="text-primary hover:underline"
                  onClick={() => handleGetIdTicketInfo(item._id)}
                >
                  Xem
                </button>
              </td>
              <td className="py-2 ">
                {item.type === 1 ? (
                  <p className="text-red-500 font-bold w-fit mx-auto rounded-full px-2.5 py-0.5 bg-red-300">
                    Thanh toán thất bại
                  </p>
                ) : item.type === 2 ? (
                  <p className="text-green-600 font-bold w-fit mx-auto rounded-full px-2.5 py-0.5 bg-green-300">
                    Đã thanh toán
                  </p>
                ) : (
                  "Thanh toán thất bại"
                )}
              </td>
              <td className="py-2">
                <button
                  className="text-primary hover:underline"
                  onClick={() => handleGetIdTicket(item._id)}
                >
                  Đánh giá phim
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableTicket;
