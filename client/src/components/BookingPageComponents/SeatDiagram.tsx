import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import handleBooking from "@/utils/handleBooking";
import {
  getTicket,
  saveTicket,
  // TicketTypeLocalStorage,
} from "@/utils/saveTicket";

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
  const [selecting, setSelecting] = useState<string[]>([]);
  // const [ticket, setTicket] = useState<TicketTypeLocalStorage | null>(null);

  // useEffect(() => {
  //   const storedTicket = getTicket();
  //   setTicket(storedTicket);
  // }, []);

  const handleSeatClick = (seatName: string) => {
    if (!seatName) return;
    setSelecting((prev) =>
      prev.includes(seatName)
        ? prev.filter((item) => item !== seatName)
        : [...prev, seatName]
    );
  };

  useEffect(() => {
    const storedTicket = getTicket();
    if (storedTicket) {
      const updatedTicket = {
        ...storedTicket,
        seats: selecting,
        price: storedTicket.screening?.screeningInfo?.price
          ? selecting.length * storedTicket.screening.screeningInfo.price
          : 0,
      };
      saveTicket(updatedTicket);
      // setTicket(updatedTicket);
    }
  }, [selecting]);

  return (
    <div className="space-y-5 mt-8">
      {layout.map((item) => (
        <div
          key={Object.keys(item)[0]}
          className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5"
        >
          {item[Object.keys(item)[0]].map((i, index) => {
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
      ))}
    </div>
  );
};

export default SeatDiagram;
