import Seat from "@/components/BookingPageComponents/Seat";
import React from "react";
import handleShowLayoutRoom from "../handleShowLayoutRoom";
import { RoomData } from "./AddForm";

const ShowLayoutRoom = ({
  formData,
  setFormData,
}: {
  formData: RoomData;
  setFormData: (data: RoomData | ((prev: RoomData) => RoomData)) => void;
}) => {
  const { layout } = handleShowLayoutRoom(formData);
  const handleToggleSeat = (seatId: string) => {
    const rowLetter = seatId[0];
    const colNumber = Number(seatId.slice(1));
    setFormData((prev: RoomData) => {
      const currentSeats = prev.seatRemoved[rowLetter] || [];

      const updatedSeats = currentSeats.includes(colNumber)
        ? currentSeats.filter((seat) => seat !== colNumber)
        : [...currentSeats, colNumber];

      return {
        ...prev,
        seatRemoved: {
          ...prev.seatRemoved,
          [rowLetter]: updatedSeats,
        },
      };
    });
  };
  return (
    <div className="space-y-7.5">
      <div className="flex gap-5 items-end">
        <h2 className="text-xl ">Sơ đồ phòng (chọn ghế muốn xóa):</h2>
        {!formData.colunm || !formData.id_cinema || !formData.row ? (
          <p>Vui lòng nhập đầy đủ thông tin ở phía trên!</p>
        ) : (
          ""
        )}
      </div>
      {!formData.colunm || !formData.id_cinema || !formData.row ? (
        ""
      ) : (
        <div className="flex-column items-center">
          <div className="flex-column items-center gap-5">
            <div className="w-[calc(100%_+_30px)] h-1 bg-foreground relative">
              <span className="absolute  -translate-y-full left-1/2 -translate-x-1/2">
                Màn hình
              </span>
            </div>
            <div className="space-y-5">
              {layout.map((item) => {
                const rowLetter = Object.keys(item)[0];
                return (
                  <div key={rowLetter} className="flex gap-5">
                    {item[rowLetter].map(({ id, seatName }) => (
                      <Seat
                        key={id}
                        seatName={seatName}
                        className="border-gray-500 border-2 hover:bg-error! hover:border-transparent"
                        seatRemoveStyle="bg-gray-300! border-transparent!"
                        onClick={() => handleToggleSeat(id)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowLayoutRoom;
