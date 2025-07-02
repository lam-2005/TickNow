import React from "react";
import Seat from "./Seat";
import { RoomType } from "@/interfaces/room.interface";
import handleBooking from "@/utils/handleBooking";

const SeatDiagram = ({ roomLayout }: { roomLayout: RoomType }) => {
  const { layout, selectedSeat } = handleBooking(roomLayout);

  return (
    <div className="space-y-5">
      {layout.map((item) => {
        return (
          <div key={Object.keys(item)[0]} className="flex gap-5">
            {item[Object.keys(item)[0]].map((i: number | "", index: number) => {
              const seatSelected = selectedSeat[Object.keys(item)[0]]?.includes(
                i as number
              );
              return (
                <Seat
                  key={`${Object.keys(item)[0]}${index}`}
                  seatName={i === "" ? "" : `${Object.keys(item)[0]}${i}`}
                  seatSelected={seatSelected}
                  seatRemoveStyle="!bg-transparent !invisible !pointer-events-none"
                  onClick={() => null}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SeatDiagram;
