"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table from "@/admin_components/Table/Table";

interface User {
  id: string;               // ✅ thêm ID để dùng trong thao tác
  name: string;
  phone: string;            // ✅ đổi từ number sang string
  email: string;
  password: string;
  year: number;
  status: string;
  role: number;
}

const vouchers: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    phone: "84901234567",
    email: "nguyenvana@example.com",
    password: "Password123!",
    year: 2000,
    status: "Hoạt động",
    role: 1,
  },
  {
    id: "2",
    name: "Trần Thị B",
    phone: "84981234567",
    email: "tranthib@example.com",
    password: "TranThiB2024!",
    year: 2001,
    status: "Ngừng hoạt động",
    role: 0,
  },
  {
    id: "3",
    name: "Lê Văn C",
    phone: "84911234567",
    email: "levanc@example.com",
    password: "LeVanC@123",
    year: 1998,
    status: "Hoạt động",
    role: 2,
  },
  {
    id: "4",
    name: "Phạm Thị D",
    phone: "84881234567",
    email: "phamthid@example.com",
    password: "Dpass456$",
    year: 1999,
    status: "Ngừng hoạt động",
    role: 1,
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    phone: "84921234567",
    email: "hoangvane@example.com",
    password: "HoangE!789",
    year: 2002,
    status: "Hoạt động",
    role: 0,
  },
  {
    id: "6",
    name: "Đặng Thị F",
    phone: "84931234567",
    email: "dangthif@example.com",
    password: "DangF@2025",
    year: 2003,
    status: "Hoạt động",
    role: 2,
  },
  {
    id: "7",
    name: "Bùi Văn G",
    phone: "84941234567",
    email: "buivang@example.com",
    password: "BuiG#001",
    year: 1997,
    status: "Ngừng hoạt động",
    role: 1,
  },
  {
    id: "8",
    name: "Võ Thị H",
    phone: "84951234567",
    email: "vothih@example.com",
    password: "VoThiH_456",
    year: 2000,
    status: "Hoạt động",
    role: 0,
  },
  {
    id: "9",
    name: "Đỗ Văn I",
    phone: "84961234567",
    email: "dovani@example.com",
    password: "DoIpass987",
    year: 2001,
    status: "Ngừng hoạt động",
    role: 2,
  },
  {
    id: "10",
    name: "Ngô Thị J",
    phone: "84971234567",
    email: "ngothij@example.com",
    password: "NgoJ@321",
    year: 1995,
    status: "Hoạt động",
    role: 1,
  },
];

const col = [
  { key: "name", title: "Tên Người Dùng" },
  { key: "phone", title: "Số điện thoại" },
  { key: "year", title: "Tuổi" },
  { key: "status", title: "Trạng thái" },
  { key: "role", title: "Phân quyền" },
  {
    key: "actions",
    title: "Thao tác",
    render(row: User) {
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
      <HeadingCard title="Quản lý Voucher">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={vouchers} />
    </div>
  );
};

export default AdminVoucher;