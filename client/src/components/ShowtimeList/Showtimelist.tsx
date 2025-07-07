import React from "react";
import ShowtimeCard from "./ShowtimeCard";
import ShowtimeItem from "./ShowtimeItem";
import ShowType from "./ShowType";
import { Showtimes } from "@/interfaces/screening.interface";

const Showtimelist = ({ data, date }: { data: Showtimes[]; date: string }) => {
  return (
    <div className="flex-column gap-7.5 mt-20">
      {data && data.length !== 0 ? (
        data.map((item) => (
          <ShowtimeCard
            key={item.film._id}
            title="Phim chiếu rạp"
            data={item.film}
            date={date}
          >
            {item.cinemas.map((cinema) => {
              const sub = cinema.showtimes.filter(
                (type) => type.showtype === 1
              );
              console.log(cinema.showtimes);
              const dub = cinema.showtimes.filter(
                (type) => type.showtype === 2
              );

              return (
                <ShowtimeItem key={cinema.id} nameCinema={cinema.name}>
                  {sub.length > 0 && <ShowType type="Phụ đề" data={sub} />}
                  {dub.length > 0 && <ShowType type="Lồng tiếng" data={dub} />}
                </ShowtimeItem>
              );
            })}
          </ShowtimeCard>
        ))
      ) : (
        <p className="text-center bg-background-card w-[80%]  p-5 rounded-2xl container ">
          Không có suất chiếu nào vào ngày này
        </p>
      )}
    </div>
  );
};
export default Showtimelist;
