import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
// import OptionTable from "@/admin_components/OptionTable/OptionTable";
import RoomList from "../../../../admin_components/RoomManagementComponents/RoomList";
import { getRoom } from "@/services/room.service";
import { getCinemaList } from "@/services/cinema.service";
import AddRoomBtn from "@/admin_components/RoomManagementComponents/AddForm/ButtonOpenForm";

export const getRoomData = async (page: number, limit: number) => {
  const res = await getRoom(`?page=${page}&limit=${limit}`);
  return {
    rooms: res?.data.room,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};
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
      {/* <OptionTable /> */}
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <RoomList initData={rooms} cinemaOptions={cinemas} />
      </Suspense>
    </div>
  );
};

export default RoomManagement;
