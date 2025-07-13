import ShowType, { TimeScreening } from "@/components/ShowtimeList/ShowType";
import { CinemaShowtimeType } from "@/interfaces/screening.interface";
import React from "react";
const CinemaShowtime = ({
  data,
  onGetIdShowtime,
  selectedShowtimeId,
}: {
  data: CinemaShowtimeType;
  onGetIdShowtime: (id?: string) => void;
  selectedShowtimeId: string | null;
}) => {
  const sub = data.showtimes.filter((type) => type.showtype === 1);
  const dub = data.showtimes.filter((type) => type.showtype === 2);

  return (
    <div className="space-y-5 bg-background-card rounded-[10px] p-5 w-full">
      <div className="w-full">
        <h2>
          {data.name} ({data.location.location})
        </h2>
      </div>
      <div className="space-y-5">
        <p>{data.location.deatil_location}</p>
        {sub.length > 0 && (
          <ShowType type="Phụ đề">
            {sub.map((item) => (
              <TimeScreening
                key={item.id}
                value={item.time}
                onClick={() => onGetIdShowtime(item.id)}
                className={`${
                  selectedShowtimeId === item.id ? "bg-primary" : ""
                }`}
              />
            ))}
          </ShowType>
        )}
        {dub.length > 0 && (
          <ShowType type="Lồng tiếng">
            {dub.map((item) => (
              <TimeScreening
                className={`${
                  selectedShowtimeId === item.id ? "bg-primary" : ""
                }`}
                key={item.id}
                value={item.time}
                onClick={() => onGetIdShowtime(item.id)}
              />
            ))}
          </ShowType>
        )}
      </div>
    </div>
  );
};

export default CinemaShowtime;
