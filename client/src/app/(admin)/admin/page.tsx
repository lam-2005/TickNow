"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table from "@/admin_components/Table/Table";
import React from "react";
interface User {
  id: number;
  name: string;
  email: string;
  sdt: string;
}
const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", sdt: "0123456789" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", sdt: "0123456789" },
];
const col = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "sdt", title: "SĐT" },
  {
    title: "Thao tác",
    render(row: User) {
      return (
        <div className="flex ">
          <button onClick={() => handleEdit(row.id)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Xóa</button>
        </div>
      );
    },
  },
];
const Admin = () => {
  return (
    <div className="card">
      <HeadingCard title="Quản lý người dùng">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={users} />
    </div>
  );
};

export default Admin;
