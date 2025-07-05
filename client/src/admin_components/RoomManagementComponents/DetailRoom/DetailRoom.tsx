import React from "react";
import PopupContainer from "../PopupContainer";
import handleBooking from "@/utils/handleBooking";
import { RoomType } from "@/interfaces/room.interface";
import Seat from "@/components/BookingPageComponents/Seat";

const DetailRoom = ({
  closeForm,
  info,
}: {
  closeForm: () => void;
  info: RoomType;
}) => {
  const { layout } = handleBooking(info);

  return (
    <PopupContainer title="Sơ đồ ghế" closeForm={closeForm}>
      <div className="space-y-5 px-10 flex-1 overflow-x-hidden overflow-y-auto pb-5">
        <div className="flex-column gap-7.5 ">
          <h2 className="text-center font-bold text-xl">
            {info.cinema} - Phòng {info.code_room}
          </h2>
          <div className="flex-column items-center min-w-[500px]">
            <div className="flex-column items-center gap-5">
              <div className="w-[calc(100%_+_30px)] h-1 bg-foreground relative">
                <span className="absolute  -translate-y-full left-1/2 -translate-x-1/2">
                  Màn hình
                </span>
              </div>
              <div className="space-y-5">
                {layout.map((item) => {
                  return (
                    <div key={Object.keys(item)[0]} className="flex gap-5">
                      {item[Object.keys(item)[0]].map(
                        (i: number | "", index: number) => {
                          return (
                            <Seat
                              key={`${Object.keys(item)[0]}${index}`}
                              seatName={
                                i === "" ? "" : `${Object.keys(item)[0]}${i}`
                              }
                              seatRemoveStyle="!bg-transparent !invisible !pointer-events-none"
                              onClick={() => null}
                              className="border-2 border-border-container pointer-events-none"
                            />
                          );
                        }
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopupContainer>
  );
};

export default DetailRoom;
