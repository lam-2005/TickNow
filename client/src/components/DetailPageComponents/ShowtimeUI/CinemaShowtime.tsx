import ShowType from "@/components/ShowtimeList/ShowType";
import { CinemaShowtimeType } from "@/interfaces/screening.interface";
import { getTicket, saveTicket } from "@/utils/saveTicket";
import React from "react";
const CinemaShowtime = ({ data }: { data: CinemaShowtimeType }) => {
  const sub = data.showtimes.filter((type) => type.showtype === 1);
  const dub = data.showtimes.filter((type) => type.showtype === 2);

  const ticket = getTicket();
  if (ticket) {
    ticket.cinema = data; // giá vé cứng, hoặc lấy theo suất
    saveTicket(ticket);
  }
  return (
    <div className="space-y-5 bg-background-card rounded-[10px] p-5 w-full">
      <div className="w-full">
        <h2>
          {data.name} ({data.location.location})
        </h2>
      </div>
      <div className="space-y-5">
        <p>{data.location.deatil_location}</p>
        {sub.length > 0 && <ShowType type="Phụ đề" data={sub} />}
        {dub.length > 0 && <ShowType type="Lồng tiếng" data={dub} />}
      </div>
    </div>
  );
};

export default CinemaShowtime;
