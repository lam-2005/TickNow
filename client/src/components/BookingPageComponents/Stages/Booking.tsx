import React from "react";
import SeatNote from "../SeatNote";
import SeatDiagram from "../SeatDiagram";
import DetailTicket from "../DetailTicket";
import Image from "next/image";
const Booking = ({
  roomLayout,
}: {
  roomLayout: {
    row: number;
    column: number;
    element_remove: { [key: string]: number[] };
    element_selected: { [key: string]: number[] };
    element_selecting: { [key: string]: number[] };
  };
}) => {
  return (
    <div className="flex-column items-center">
      <div className=" h-[100px] lg:h-[150px] w-full max-sm:h-[80px] relative">
        <Image
          src={"/screen.webp"}
          fill
          sizes="1280px"
          alt=""
          className="object-contain"
          priority
        />
      </div>
      <div className="flex-center gap-7.5">
        <SeatNote color="bg-stone-600" content="Đã được đặt" />
        <SeatNote color="bg-primary" content="Ghế bạn chọn" />
        <SeatNote color="bg-white" content="Ghế thường" />
      </div>
      <SeatDiagram roomLayout={roomLayout} />
      <DetailTicket />
    </div>
  );
};

export default Booking;
