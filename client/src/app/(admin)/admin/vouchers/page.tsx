"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";

interface Voucher {
  id: string;
  code: string;
  name: string;
  discount: string;
  startDay: string;
  endDay: string;
  soLuong: number;
  daSuDung: number;
  trangThai: string;
}

const vouchers: Voucher[] = [
  {
    id: "99f8",
    code: "SALEOFF10",
    name: "10 % Off Sale",
    discount: "10",
    startDay: "15/03/2025",
    endDay: "15/04/2025",
    soLuong: 30,
    daSuDung: 16,
    trangThai: "Hoạt Động",
  },
  {
    id: "7d5b",
    code: "SALEOFF15",
    name: "15 % Off Sale",
    discount: "15",
    startDay: "15/03/2025",
    endDay: "15/04/2025",
    soLuong: 30,
    daSuDung: 16,
    trangThai: "Kích Hoạt",
  },
  {
    id: "9e63",
    code: "SALEOFF20",
    name: "20 % Off Sale",
    discount: "20",
    startDay: "15/03/2025",
    endDay: "15/04/2025",
    soLuong: 40,
    daSuDung: 26,
    trangThai: "Hoạt Động",
  },
  {
    id: "58aa",
    code: "WELCOME",
    name: "New User",
    discount: "25",
    startDay: "15/03/2025",
    endDay: "15/04/2025",
    soLuong: 100,
    daSuDung: 5,
    trangThai: "Kích Hoạt",
  },
  {
    id: "5fcd",
    code: "OFFER2025",
    name: "Holiday offer",
    discount: "10",
    startDay: "15/03/2025",
    endDay: "15/04/2025",
    soLuong: 50,
    daSuDung: 10,
    trangThai: "Kích Hoạt",
  },
];

const col: Column<Voucher>[] = [
  { key: "code", title: "Mã" },
  { key: "name", title: "Tên Voucher" },
  { key: "discount", title: "Giảm (%)" },
  { key: "startDay", title: "Bắt đầu" },
  { key: "endDay", title: "Kết thúc" },
  { key: "soLuong", title: "Số lượng" },
  { key: "daSuDung", title: "Đã dùng" },
  { key: "trangThai", title: "Trạng thái" },
  {
    title: "Thao tác",
    render(row: Voucher) {
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

const handleEdit = (id: string) => {
  console.log("Edit", id);
};

const handleDelete = (id: string) => {
  console.log("Delete", id);
};

const AdminVoucher = () => {
  return (
    <div className="card">
      <HeadingCard title="Quản lý Voucher">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={vouchers} />
    </div>
  );
};

export default AdminVoucher;
