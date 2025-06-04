"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";

const RoomManagement = () => {
  interface RoomType {
    id: string | number;
    room: string;
    cinema: string;
    seatcount: number;
    status: number;
  }
  const room: RoomType[] = [
    {
      id: 1,
      room: "01",
      cinema: "ABC",
      seatcount: 123,
      status: 1,
    },
    {
      id: 2,
      room: "02",
      cinema: "DEF",
      seatcount: 80,
      status: 0,
    },
    {
      id: 3,
      room: "03",
      cinema: "GHI",
      seatcount: 150,
      status: 1,
    },
    {
      id: 4,
      room: "04",
      cinema: "JKL",
      seatcount: 100,
      status: 1,
    },
    {
      id: 5,
      room: "05",
      cinema: "MNO",
      seatcount: 90,
      status: 0,
    },
    {
      id: 6,
      room: "06",
      cinema: "PQR",
      seatcount: 110,
      status: 1,
    },
    {
      id: 7,
      room: "07",
      cinema: "STU",
      seatcount: 75,
      status: 0,
    },
  ];
  const col: Column<RoomType>[] = [
    { key: "room", title: "Phòng" },
    { key: "cinema", title: "Rạp" },
    { key: "seatcount", title: "Số ghê" },
    { title: "Chi tiết phòng", render: () => <div>Xem</div> },
    {
      key: "status",
      title: "Trạng thái",
      render: (row: RoomType) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Thao tác",
      render() {
        return (
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Người Dùng">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={room} />
    </div>
  );
};

export default RoomManagement;
