import React, { Suspense } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import RoomList from "./RoomList";
import { getRooom } from "@/services/room.service";

const getRoomData = async (page: number, limit: number) => {
  const res = await getRooom(`?page=${page}&limit=${limit}`);
  return {
    rooms: res?.data.room,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};
const RoomManagement = () => {
  const res = getRoomData(1, 5);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Phòng">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <RoomList initData={res} />
      </Suspense>
    </div>
  );
};

export default RoomManagement;
