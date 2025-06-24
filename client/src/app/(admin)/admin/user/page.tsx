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
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getUserList(`?limit=5&page=${page}`);
      const data = res?.data;
      setUsers(data.user || []);
      setTotalItems(data.pagination?.total || 0);
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
    const user = users.find((u) => u._id === id);
    if (user) {
      setSelectedUser(user);
      setIsEditOpen(true);
    }
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
            total={totalItems}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </>
      )}

      <AddForm<Record<string, unknown>>
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        fields={[
          { label: "Tên người dùng", key: "name", required: true },
          { label: "Email", key: "email", required: true },
          { label: "Số điện thoại", key: "phone", required: true },
          { label: "Năm sinh", key: "year", type: "number", required: true },
          { label: "Mật khẩu", key: "password", type: "password", required: true },
          { label: "Xác nhận mật khẩu", key: "confirmPassword", type: "password", required: true },
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            required: true,
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
          {
            label: "Vai trò",
            key: "role",
            type: "select",
            required: true,
            options: [
              { label: "Quản Trị", value: "true" },
              { label: "Người Dùng", value: "false" },
            ],
          },
        ]}
        onSubmit={async () => {
          try {
            // await userService.createUser(data);
            alert("Thêm người dùng thành công!");
            setShowAddPopup(false);
            fetchUsers(currentPage);
          } catch (err) {
            alert("Thêm thất bại!");
            console.error(err);
          }
        }}
      />

      <PopupUpdateForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={selectedUser as unknown as Record<string, unknown>}
        fields={[
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
          {
            label: "Quyền",
            key: "role",
            type: "select",
            options: [
              { label: "Quản Trị", value: "true" },
              { label: "Người Dùng", value: "false" },
            ],
          },
        ]}
        onSubmit={async () => {
          try {
            if (!selectedUser?._id) return;
            // await userService.updateUser(selectedUser._id, data);
            alert("Cập nhật thành công!");
            setIsEditOpen(false);
            fetchUsers(currentPage);
          } catch (error) {
            console.error("Lỗi cập nhật user:", error);
            alert("Cập nhật thất bại!");
          }
        }}
      />
    </div>
  );
};

export default UserManagement;
