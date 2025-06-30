import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Select, { SelectField } from "@/components/Select/Select";
// import Select, { SelectField } from "@/components/Select/Select";
import ShowtimeCard, {
  ShowtimeItem,
  ShowType,
} from "@/components/ShowtimeList/ShowtimeCard";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
// import { FaCalendarAlt } from "react-icons/fa";

const DetailCinema = () => {
  return (
    <div>
      <BackgroundPage image="background_cinema.webp" title="Ticknow Quận 1">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <Select>
            <SelectField
              icon={<FaCalendarAlt />}
              id="date"
              openId={null}
              setOpenId={null}
              data={[]}
              defaultSelected={null}
              placeholder="Chọn ngày chiếu"
            />
          </Select>
        </div>
      </BackgroundPage>
      <div className="flex-column gap-7.5 mt-20">
        <ShowtimeCard>
          <ShowtimeItem>
            <ShowType type="Phụ đề" data={[]} />
            <ShowType type="Lồng tiếng" data={[]} />
          </ShowtimeItem>
        </ShowtimeCard>
      </div>
    </div>
  );
};

export default DetailCinema;
