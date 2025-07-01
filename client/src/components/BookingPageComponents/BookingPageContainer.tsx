"use client";
import { useStage } from "@/hooks/contexts/useStage";
import React, { useState } from "react";
import Booking from "./Stages/Booking";
import Payment from "./Stages/Payment";
import StageBooking from "./StageBooking";
import { RoomType } from "@/interfaces/room.interface";
import SelectContainer, { SelectComponent } from "../Select/Select";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { Screening } from "@/interfaces/screening.interface";

const BookingPageContainer = ({
  data,
  showtimes,
}: {
  data: RoomType;
  showtimes: Screening[];
}) => {
  const { stage } = useStage();
  const getDate = [...new Set(showtimes.map((item) => item.date))].map(
    (date) => {
      const d = new Date(date as string);
      const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();

      const label = `${weekday}, ${day}/${month}/${year}`;
      const screeningList = showtimes.filter((item) => {
        return item.date === date;
      });

      return {
        value: d.toISOString().split("T")[0],
        label: label,
        data: screeningList,
      };
    }
  );
  const [screeningList, setScreeningList] = useState<Screening[]>(
    getDate[0].data
  );
  const [selectedDate, setSelectedDate] = useState(getDate[0].value);
  console.log(selectedDate);
  const handleChangeDate = (date: string) => {
    const screening = getDate.filter((item) => item.value === date);
    setScreeningList(screening[0].data);

    setSelectedDate(date);
  };
  console.log(screeningList);

  return (
    <>
      <StageBooking currentStage={stage} />
      <div className="self-center">
        <SelectContainer>
          <SelectComponent
            leftIcon={<FaCalendarAlt className="text-foreground" size={20} />}
            getLabel={(item) => item.label}
            data={getDate}
            getValue={(item) => item.value}
            placeholder="Chọn ngày chiếu"
            onChange={handleChangeDate}
          />
          <SelectComponent
            leftIcon={<IoTimeSharp className="text-foreground" size={20} />}
            data={screeningList}
            getLabel={(item) => item?.time_start}
            getValue={(item) => item._id}
            placeholder="Chọn suất chiếu"
            // onChange={(location) => setSelectedLocation(location)}
          />
        </SelectContainer>
      </div>
      {stage === 1 && <Booking roomLayout={data} />}
      {stage === 2 && <Payment />}
    </>
  );
};

export default BookingPageContainer;
