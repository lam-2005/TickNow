"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { UserType } from "@/interfaces/user.interface";

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/user?_limit=5");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Lỗi khi fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const handleEdit = (id: string | number) => {
    console.log("Edit", id);
  };
  const handleDelete = (id: string | number) => {
    console.log("Delete", id);
  };
  const col: Column<UserType>[] = [
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
      title: "Thao tác",
      render(row: UserType) {
        return (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => handleEdit(row.id)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDelete(row.id)}
            >
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
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table column={col} data={users} />
      )}
    </div>
  );
};

export default UserManagement;


