"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table from "@/admin_components/Table/Table";

interface Screening {
  name: string;
  timeStart: string;
  timeEnd: string;
  date:string;
  status: string;
}

const screen: Screening[] = [
  {
    name: "Avengers: Endgame",
    timeStart: "09:00",
    timeEnd: "11:00",
    date: "2025-06-04",
    status: "Đã chiếu"
  },
  {
    name: "Joker",
    timeStart: "12:00",
    timeEnd: "14:00",
    date: "2025-06-04",
    status: "Đang chiếu"
  },
  {
    name: "Parasite",
    timeStart: "15:00",
    timeEnd: "17:00",
    date: "2025-06-04",
    status: "Chưa chiếu"
  },
  {
    name: "Interstellar",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-05",
    status: "Đã chiếu"
  },
  {
    name: "Titanic",
    timeStart: "13:00",
    timeEnd: "15:00",
    date: "2025-06-05",
    status: "Chưa chiếu"
  },
  {
    name: "Dune",
    timeStart: "11:00",
    timeEnd: "13:00",
    date: "2025-06-06",
    status: "Đang chiếu"
  },
  {
    name: "Avatar",
    timeStart: "14:30",
    timeEnd: "16:30",
    date: "2025-06-06",
    status: "Đã chiếu"
  },
  {
    name: "Inception",
    timeStart: "09:30",
    timeEnd: "11:30",
    date: "2025-06-07",
    status: "Chưa chiếu"
  },
  {
    name: "Oppenheimer",
    timeStart: "12:30",
    timeEnd: "14:30",
    date: "2025-06-07",
    status: "Đang chiếu"
  },
  {
    name: "Fast & Furious",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-08",
    status: "Đã chiếu"
  },
  {
    name: "Deadpool",
    timeStart: "09:00",
    timeEnd: "11:00",
    date: "2025-06-04",
    status: "Chưa chiếu"
  },
  {
    name: "Doctor Strange",
    timeStart: "12:00",
    timeEnd: "14:00",
    date: "2025-06-04",
    status: "Chưa chiếu"
  },
  {
    name: "The Batman",
    timeStart: "15:00",
    timeEnd: "17:00",
    date: "2025-06-04",
    status: "Đã chiếu"
  },
  {
    name: "The Matrix",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-05",
    status: "Chưa chiếu"
  },
  {
    name: "Black Panther",
    timeStart: "13:00",
    timeEnd: "15:00",
    date: "2025-06-05",
    status: "Đã chiếu"
  },
  {
    name: "Iron Man",
    timeStart: "11:00",
    timeEnd: "13:00",
    date: "2025-06-06",
    status: "Chưa chiếu"
  },
  {
    name: "Captain Marvel",
    timeStart: "14:30",
    timeEnd: "16:30",
    date: "2025-06-06",
    status: "Đã chiếu"
  },
  {
    name: "The Godfather",
    timeStart: "09:30",
    timeEnd: "11:30",
    date: "2025-06-07",
    status: "Chưa chiếu"
  },
  {
    name: "John Wick 4",
    timeStart: "12:30",
    timeEnd: "14:30",
    date: "2025-06-07",
    status: "Đã chiếu"
  },
  {
    name: "Minions",
    timeStart: "10:00",
    timeEnd: "12:00",
    date: "2025-06-08",
    status: "Chưa chiếu"
  }
];


const col = [
//   { key: "code", title: "Mã" },
  { key: "name", title: "Tên phim" },
  { key: "timeStart", title: "Thời gian bắt đầu" },
  { key: "timeEnd", title: "Thời gian ngừng" },
  { key: "date", title: "Ngày" },
  { key: "status", title: "Trạng thái" },
  {
    key: "actions", // cần thiết nếu Table dùng key để định danh
    title: "Thao tác",
    render(row: Screening) {
      return (
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:underline" onClick={() => handleEdit(row.id)}>
            Sửa
          </button>
          <button className="text-red-500 hover:underline" onClick={() => handleDelete(row.id)}>
            Xóa
          </button>
        </div>
      );
    },
  },
];

const handleEdit = (id: string) => {
  console.log("Edit", id);
};

const handleDelete = (id: string) => {
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