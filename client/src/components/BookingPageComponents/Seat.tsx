import React from "react";

const Seat = ({
  seatName,
  className,
  seatSelected,
  seatRemoveStyle,
  onClick,
}: {
  seatName: string;
  seatSelected?: boolean;
  className?: string;
  seatRemoveStyle: string;
  onClick: (seat: string) => void;
}) => {
  return (
    <button
      onClick={() => onClick(seatName)}
      disabled={seatSelected}
      className={`
    w-[22px] aspect-square     
    sm:w-[26px]                  
    md:w-[30px]                  
    lg:w-[34px]   
        text-foreground flex-center cursor-pointer rounded-[5px] text-sm font-bold transition-all duration-200 ${
          seatName === "" ? seatRemoveStyle : ""
        } 
      select-none bg-white hover:text-background hover:bg-primary
      disabled:bg-stone-600 disabled:cursor-not-allowed disabled:hover:text-foreground ${className}`}
    >
      {seatName}
    </button>
  );
};

export default Seat;
