import ShowType from "@/components/ShowtimeList/ShowType";
import { CinemaShowtimeType } from "@/interfaces/screening.interface";
import React from "react";
export type ShowtimeType = {
  type: string;
  data: {
    id: string;
    time: string;
    showtype: string;
  }[];
};
const CinemaShowtime = ({ data }: { data: CinemaShowtimeType }) => {
  const listShowtimes = data.showtimes.reduce((acc, cur) => {
    const existingGroup = acc.find((item) => item.type === cur.showtype);
    if (existingGroup) {
      existingGroup.data.push(cur);
    } else {
      acc.push({
        type: cur.showtype,
        data: [cur],
      });
    }
    return acc;
  }, [] as ShowtimeType[]);
  console.log(listShowtimes);

  return (
    <div className="space-y-5 bg-background-card rounded-[10px] p-5 w-full">
      <div className="w-full">
        <h2>{data.name}</h2>
      </div>
      <div className="space-y-5">
        <p>{data.location.deatil_location}</p>
        {listShowtimes.map((item) => (
          <ShowType type={item.type} key={item.type} data={item.data} />
        ))}
      </div>
    </div>
  );
};

export default CinemaShowtime;
