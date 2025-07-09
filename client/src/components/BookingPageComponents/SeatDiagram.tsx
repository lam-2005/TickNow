import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import handleBooking from "@/utils/handleBooking";
import { getTicket, saveTicket } from "@/utils/saveTicket";
import { getScreeningList } from "@/services/screening.service";
import { useSearchParams } from "next/navigation";

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
  const searchParamsScreening = useSearchParams();
  const getSearchParamScreening = searchParamsScreening.get("showtime") || "";
  const [loading, setLoading] = useState(false);
  const [priceShowtime, setPriceShowtime] = useState(0);
  const ticket = getTicket();
  const getShowtime = async () => {
    const res = await getScreeningList(`/${getSearchParamScreening}`);
    setPriceShowtime(res.data.screening.price);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);

    getShowtime();
  }, [getSearchParamScreening]);
  if (loading) console.log("Loading...");

  const handleSeatClick = (seatName: string) => {
    if (!seatName) return;
    setSeleting((prev) =>
      prev.includes(seatName)
        ? prev.filter((item) => item !== seatName)
        : [...prev, seatName]
    );
  };

  if (ticket) {
    ticket.seats = selecting;
    if (selecting.length > 0) {
      ticket.price = selecting.length * priceShowtime;
    }
    saveTicket(ticket);
  }

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
