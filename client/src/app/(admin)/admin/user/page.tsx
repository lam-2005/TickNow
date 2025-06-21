"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { UserType } from "@/interfaces/user.interface";
import * as userService from "@/services/user.service";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";
import AddPopup from "@/admin_components/Popup/AddPopup";

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const limit = 5;

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getUserList(`?limit=${limit}&page=${page}`);
      const data = res?.data;

      console.log("Dữ liệu từ API:", data);
      setUsers(data.users || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(data.pagination?.page || 1);
    } catch (error) {
      console.error("Lỗi khi fetch users:", error);
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleEdit = (id: string | number) => {
    alert(`Edit ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Delete ${id}`);
  };

  const col: Column<UserType>[] = [
    { key: "name", title: "Tên Người Dùng" },
    { key: "phone", title: "Số Điện Thoại" },
    { key: "email", title: "Email" },
    { key: "year", title: "Năm Sinh" },
    {
      key: "status",
      title: "Trạng Thái",
      render: (row: UserType) =>
        row.status === 1 || row.status === "1" ? "Hoạt Động" : "Ngừng Hoạt Động",
    },
    {
      key: "role",
      title: "Vai Trò",
      render: (row: UserType) => (row.role ? "Quản Trị" : "Người Dùng"),
    },
    {
      title: "Thao Tác",
      render(row: UserType) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Sửa"
              onClick={handleEdit}
              bgColor="bg-yellow-500"
              id={row._id}
            />
            <ActionButton
              label="Xóa"
              onClick={handleDelete}
              bgColor="bg-red-500"
              id={row._id}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Người Dùng">
        <AddBtn onClick={() => setShowAddPopup(true)} />
      </HeadingCard>

      <OptionTable />

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <>
          <Table column={col} data={users} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {showAddPopup && (
        <AddPopup
          title="Thêm Người Dùng"
          onClose={() => setShowAddPopup(false)}
        >
          <form>
            <input type="text" placeholder="Tên người dùng" className="w-full p-2 border rounded mb-2" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Số điện thoại" className="w-full p-2 border rounded mb-2" />
            <input type="date" placeholder="Ngày tháng năm sinh" className="w-full p-2 border rounded mb-2" />
            <input type="password" placeholder="Mật khẩu" className="w-full p-2 border rounded mb-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
          </form>
        </AddPopup>
      )}
    </div>
  );
};

export default UserManagement;