import React from "react";

const Seat = ({
  seatName,
  seatSelected,
}: {
  seatName: string;
  seatSelected: boolean;
}) => {
  return (
    <button
      disabled={seatSelected}
      className={`size-7.5   text-black flex-center cursor-pointer hover:bg-primary  rounded-[5px] text-sm font-bold transition-all duration-200 ${
        seatName === ""
          ? "bg-transparent! invisible! pointer-events-none!"
          : "bg-white hover:text-white"
      } select-none
      disabled:bg-[#aeaeae] disabled:cursor-not-allowed disabled:hover:text-black`}
    >
      {seatName}
    </button>
  );
};

export default Seat;
