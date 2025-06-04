"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table from "@/admin_components/Table/Table";

import { UserType } from "@/interfaces/user.interface";

const UserManagement = () => {
  const users: UserType[] = [
    {
      id: "advwrvsd",
      name: "Nguyễn Văn Aanh",
      phone: "0912345678",
      email: "nguyenvana@example.com",
      year: 1990,
      status: 1,
      role: true,
    },
    {
      id: "aadfaca",
      name: "Trần Thị BinZ",
      phone: "0987654321",
      email: "tranthib@example.com",
      year: 1985,
      status: 0,
      role: false,
    },
    {
      id: "abc13323",
      name: "Lê Văn Cừ",
      phone: "0909090909",
      email: "levanc@example.com",
      year: 2000,
      status: 1,
      role: true,
    },
    {
      id: "user-004",
      name: "Phạm Thị Duy",
      phone: "0938123456",
      email: "phamthid@example.com",
      year: 1995,
      status: 1,
      role: false,
    },
    {
      id: "3333w232",
      name: "Hoàng Văn Em",
      phone: "0977123456",
      email: "hoangvane@example.com",
      year: 1988,
      status: 1,
      role: true,
    },
  ];
  const col = [
    { key: "name", title: "Name" },
    { key: "phone", title: "Phone Number" },
    { key: "email", title: "Email" },
    { key: "year", title: "Year" },
    {
      key: "status",
      title: "Status",
      render: (row: UserType) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      key: "role",
      title: "Role",
      render: (row: UserType) => (row.role ? "Admin" : "User"),
    },
    {
      title: "Action",
      render(row: UserType) {
        return (
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              Edit
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded">
              Xóa
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
      <Table column={col} data={users} />
    </div>
  );
};

export default UserManagement;
