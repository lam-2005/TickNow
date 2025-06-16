import React from "react";
import SeatNote from "../SeatNote";
import SeatDiagram from "../SeatDiagram";
import DetailTicket from "../DetailTicket";
import Image from "next/image";
const roomLayout = {
  id: 50,
  code_room: 7,
  id_thear: 12,
  diagram: {
    row: 11,
    colunm: 7,
    element_remove: {
      A: [3],
      B: [3],
      C: [3],
      D: [3],
      E: [3],
      F: [3],
      G: [1, 2, 3],
    },
    double_Chair: {},
    element_selected: { A: [2, 4], B: [3], C: [3] },
    element_selecting: {},
  },
};
const Booking = () => {
  return (
    <div className="flex-column items-center gap-5">
      <h2>Chọn ghế - Phòng 2</h2>
      <div className="w-4/5 h-[148px] relative">
        <Image
          src={"/screen.webp"}
          fill
          sizes="1280"
          alt=""
          className="object-contain"
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
