import React from "react";
import ShowtimeCard, { ShowtimeItem, ShowType } from "./ShowtimeCard";

const Showtimelist = () => {
  return (
    <div className="flex-column gap-7.5 mt-20">
      <ShowtimeCard title="Phim chiếu rạp">
        <ShowtimeItem nameCinema="TickNow Quận 12 (Thành phố Hồ Chí Minh)">
          <ShowType type="Phụ đề" />
          <ShowType type="Lồng tiếng" />
        </ShowtimeItem>
      </ShowtimeCard>
    </div>
  );
};
export default Showtimelist;
