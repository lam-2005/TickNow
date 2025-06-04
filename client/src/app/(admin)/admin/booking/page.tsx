"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table from "@/admin_components/Table/Table";

interface Booking {
  name: string;
  phone: string;
  day: string;
  detail: string;
}

const bookings: Booking[] = [
  {
    name: "Nguyễn Văn A",
    phone: "0987654321",
    day: "2025-06-01",
    detail: "Xem",
  },
  {
    name: "Trần Thị B",
    phone: "0912345678",
    day: "2025-06-02",
    detail: "Xem",
  },
  {
    name: "Lê Văn C",
    phone: "0933222111",
    day: "2025-06-03",
    detail: "Xem",
  },
  {
    name: "Phạm Thị D",
    phone: "0977888999",
    day: "2025-06-03",
    detail: "Xem",
  },
  {
    name: "Đỗ Minh E",
    phone: "0961234567",
    day: "2025-06-04",
    detail: "Xem",
  },
  {
    name: "Vũ Thị F",
    phone: "0909998888",
    day: "2025-06-05",
    detail: "Xem",
  },
  {
    name: "Hoàng Văn G",
    phone: "0944556677",
    day: "2025-06-06",
    detail: "Xem",
  },
  {
    name: "Ngô Thị H",
    phone: "0922333444",
    day: "2025-06-06",
    detail: "Xem",
  },
  {
    name: "Lâm Văn I",
    phone: "0911002200",
    day: "2025-06-07",
    detail: "Xem",
  },
  {
    name: "Trịnh Thị J",
    phone: "0988001122",
    day: "2025-06-08",
    detail: "Xem",
  },
];

const col = [
  //   { key: "code", title: "Mã" },
  { key: "name", title: "Tên khách hàng" },
  { key: "phone", title: "Sđt" },
  { key: "day", title: "Ngày đặt" },
  { key: "detail", title: "Chi tiết" },
  {
    key: "actions", // cần thiết nếu Table dùng key để định danh
    title: "Thao tác",
    render(row: Booking) {
      return (
        <div className="flex space-x-2">
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row.id)}
          >
            Hủy vé
          </button>
        </div>
      );
    },
  },
];

const handleDelete = (id: string) => {
  console.log("Delete", id);
};

const AdminBooking = () => {
  return (
    <div className="card">
      <HeadingCard title="Quản lý đặt vé">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={bookings} />
    </div>
  );
};

export default AdminBooking;
