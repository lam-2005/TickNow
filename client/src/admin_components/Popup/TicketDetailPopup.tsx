"use client";
import React from "react";
import Image from "next/image";
import env from "@/configs/environment";
import { TicketDetail } from "@/interfaces/ticket.interface";

type TicketDetailProps = {
  ticket: TicketDetail;
  onClose: () => void;
};

const TicketDetailPopup: React.FC<TicketDetailProps> = ({ ticket, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "ticket-detail-popup-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="ticket-detail-popup-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto p-4"
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
        <div className="p-6 grid md:grid-cols-3 gap-6 text-sm text-gray-700">
          <Image
            src={`${env.IMG_API_URL}/movie/${ticket.movie.img}`}
            alt="Poster"
            width={200}
            height={300}
            className="rounded shadow object-cover"
          />
          <div className="col-span-2 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎟️ Chi Tiết Vé</h2>
            <p><strong>Tên khách hàng:</strong> {ticket.userName}</p>
            <p><strong>Phim:</strong> {ticket.movie.name}</p>
            <p><strong>Giờ chiếu:</strong> {ticket.screeningTime}</p>
            <p><strong>Rạp:</strong> {ticket.cinema.name}</p>
            <p><strong>Phòng chiếu:</strong> {ticket.room.code}</p>
            <p><strong>Ghế:</strong> {ticket.seat.join(", ")}</p>
            <p><strong>Giá vé:</strong> {ticket.price.toLocaleString()} VNĐ</p>
            <p><strong>Trạng thái:</strong> {ticket.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPopup;