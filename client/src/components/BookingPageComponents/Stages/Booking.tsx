import React from "react";
import SeatNote from "../SeatNote";
import SeatDiagram from "../SeatDiagram";
import DetailTicket from "../DetailTicket";
import Image from "next/image";
import { RoomType } from "@/interfaces/room.interface";

const Booking = ({ roomLayout }: { roomLayout: RoomType }) => {
  return (
    <div className="flex-column items-center gap-5">
      <h2>Chọn ghế - Phòng {roomLayout.code_room}</h2>
      <div className="w-4/5 h-[148px] relative">
        <Image
          src={"/screen.webp"}
          fill
          sizes="1280"
          alt=""
          className="object-contain"
          priority
        />
      </div>
      <div className="flex-center gap-7.5">
        <SeatNote color="bg-[#aeaeae]" content="Đã đặt" />
        <SeatNote color="bg-primary" content="Ghế bạn chọn" />
        <SeatNote color="bg-white" content="Ghế thường" />
      </div>
      <SeatDiagram roomLayout={roomLayout} />
      <DetailTicket />
    </div>
  );
};

export default Booking;
