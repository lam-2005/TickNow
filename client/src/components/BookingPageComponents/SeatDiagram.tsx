import React, { useState } from "react";
import Seat from "./Seat";
import handleBooking from "@/utils/handleBooking";

const SeatDiagram = ({
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
  const { layout, selectedSeat } = handleBooking(roomLayout);
  const [selecting, setSeleting] = useState<string[]>([]);
  const handleSeatClick = (seatName: string) => {
    if (!seatName) return;
    setSeleting((prev) =>
      prev.includes(seatName)
        ? prev.filter((item) => item !== seatName)
        : [...prev, seatName]
    );
  };
  console.log(selecting);

  return (
    <div className="space-y-5 mt-8">
      {layout.map((item) => {
        return (
          <div key={Object.keys(item)[0]} className="flex gap-5">
            {item[Object.keys(item)[0]].map((i: number | "", index: number) => {
              const seatSelected = selectedSeat[Object.keys(item)[0]]?.includes(
                i as number
              );
              const seatName = `${Object.keys(item)[0]}${i}`;
              const selectingSeat = selecting.includes(seatName);
              return (
                <Seat
                  key={`${Object.keys(item)[0]}${index}`}
                  seatName={i === "" ? "" : seatName}
                  seatSelected={seatSelected}
                  seatRemoveStyle="!bg-transparent !invisible !pointer-events-none"
                  className={`${
                    selectingSeat ? "bg-primary! text-foreground!" : ""
                  } text-background!`}
                  onClick={() => handleSeatClick(seatName)}
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
