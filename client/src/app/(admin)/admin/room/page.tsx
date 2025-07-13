import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import RoomList from "../../../../admin_components/RoomManagementComponents/RoomList";
import { getCinemaList } from "@/services/cinema.service";
import AddRoomBtn from "@/admin_components/RoomManagementComponents/AddForm/ButtonOpenForm";
import FIlterRoom from "@/admin_components/RoomManagementComponents/FilterRoom/FIlterRoom";
import { getRoomData } from "@/services/room.service";

const getCinema = async () => {
  const res = await getCinemaList();
  return res.cinema;
};
const RoomManagement = () => {
  const rooms = getRoomData(1, 5);
  const cinemas = getCinema();

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Phòng">
        <AddRoomBtn cinemas={cinemas} />
      </HeadingCard>
      <FIlterRoom data={cinemas} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <RoomList initData={rooms} cinemaOptions={cinemas} />
      </Suspense>
    </div>
  );
};

export default RoomManagement;
