import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import RoomList from "./RoomList";

const RoomManagement = () => {
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Phòng">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <RoomList />
    </div>
  );
};

export default RoomManagement;
