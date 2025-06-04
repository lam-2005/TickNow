"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";

interface Screening {
  id: string | number;
  name: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  status: string;
}

const screen: Screening[] = [
  {
    id: "1",
    name: "Avengers: Endgame",
    timeStart: "09:00",
    timeEnd: "11:00",
    date: "2025-06-04",
    status: "Đã chiếu",
  },
  {
    id: "2",
    name: "Joker",
    timeStart: "12:00",
    timeEnd: "14:00",
    date: "2025-06-04",
    status: "Đang chiếu",
  },
  {
    id: "3",
    name: "Parasite",
    timeStart: "15:00",
    timeEnd: "17:00",
    date: "2025-06-04",
    status: "Chưa chiếu",
  },
  {
    id: "4",
    name: "Interstellar",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-05",
    status: "Đã chiếu",
  },
  {
    id: "5",
    name: "Titanic",
    timeStart: "13:00",
    timeEnd: "15:00",
    date: "2025-06-05",
    status: "Chưa chiếu",
  },
  {
    id: "6",
    name: "Dune",
    timeStart: "11:00",
    timeEnd: "13:00",
    date: "2025-06-06",
    status: "Đang chiếu",
  },
  {
    id: "7",
    name: "Avatar",
    timeStart: "14:30",
    timeEnd: "16:30",
    date: "2025-06-06",
    status: "Đã chiếu",
  },
  {
    id: "8",
    name: "Inception",
    timeStart: "09:30",
    timeEnd: "11:30",
    date: "2025-06-07",
    status: "Chưa chiếu",
  },
  {
    id: "9",
    name: "Oppenheimer",
    timeStart: "12:30",
    timeEnd: "14:30",
    date: "2025-06-07",
    status: "Đang chiếu",
  },
  {
    id: "10",
    name: "Fast & Furious",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-08",
    status: "Đã chiếu",
  },
  {
    id: "11",
    name: "Deadpool",
    timeStart: "09:00",
    timeEnd: "11:00",
    date: "2025-06-04",
    status: "Chưa chiếu",
  },
  {
    id: "12",
    name: "Doctor Strange",
    timeStart: "12:00",
    timeEnd: "14:00",
    date: "2025-06-04",
    status: "Chưa chiếu",
  },
  {
    id: "13",
    name: "The Batman",
    timeStart: "15:00",
    timeEnd: "17:00",
    date: "2025-06-04",
    status: "Đã chiếu",
  },
  {
    id: "14",
    name: "The Matrix",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-05",
    status: "Chưa chiếu",
  },
  {
    id: "15",
    name: "Black Panther",
    timeStart: "13:00",
    timeEnd: "15:00",
    date: "2025-06-05",
    status: "Đã chiếu",
  },
  {
    id: "16",
    name: "Iron Man",
    timeStart: "11:00",
    timeEnd: "13:00",
    date: "2025-06-06",
    status: "Chưa chiếu",
  },
  {
    id: "17",
    name: "Captain Marvel",
    timeStart: "14:30",
    timeEnd: "16:30",
    date: "2025-06-06",
    status: "Đã chiếu",
  },
  {
    id: "18",
    name: "The Godfather",
    timeStart: "09:30",
    timeEnd: "11:30",
    date: "2025-06-07",
    status: "Chưa chiếu",
  },
  {
    id: "19",
    name: "John Wick 4",
    timeStart: "12:30",
    timeEnd: "14:30",
    date: "2025-06-07",
    status: "Đã chiếu",
  },
  {
    id: "20",
    name: "Minions",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-08",
    status: "Chưa chiếu",
  },
];

const col: Column<Screening>[] = [
  //   { key: "code", title: "Mã" },
  { key: "name", title: "Tên phim" },
  { key: "timeStart", title: "Thời gian bắt đầu" },
  { key: "timeEnd", title: "Thời gian ngừng" },
  { key: "date", title: "Ngày" },
  { key: "status", title: "Trạng thái" },
  {
    title: "Thao tác",
    render(row: Screening) {
      return (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEdit(row.id)}
          >
            Sửa
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row.id)}
          >
            Xóa
          </button>
        </div>
      );
    },
  },
];

const handleEdit = (id: string | number) => {
  console.log("Edit", id);
};

const handleDelete = (id: string | number) => {
  console.log("Delete", id);
};

const AdminVoucher = () => {
  return (
    <div className="card">
      <HeadingCard title="Quản lý lịch chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={screen} />
    </div>
  );
};

export default AdminVoucher;
