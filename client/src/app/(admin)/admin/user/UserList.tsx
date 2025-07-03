"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { UserType } from "@/interfaces/user.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import AddForm from "@/admin_components/Popup/AddPopup";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataUser from "@/utils/redux/selectors/userSelector";
import { fetchUsers, setInitialUsers } from "@/utils/redux/slices/userSlice";
import usePanigation from "@/hooks/usePanigation";

type InitDataType = {
  users: UserType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const UserList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const { users, total, currentPage, totalPages, loading, error } =
    useSelector(dataUser);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(setInitialUsers({ ...initData, loading: false, error: null }));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchUsers({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

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
              bgColor="warning"
              onClick={() => handleEdit(row._id)}
              id={row._id}
            />
          </div>
        );
      },
    },
  ];

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <Table column={col} data={users.map((u) => ({ ...u, id: u._id }))} currentPage={currentPage} rowsPerPage={rowsPerPage} />
      {total >= rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
      {/* Add form */}
      <AddForm
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
          alert("Thêm người dùng thành công!");
          setShowAddPopup(false);
          dispatch(fetchUsers({ page, limit: rowsPerPage }));
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
          alert("Cập nhật thành công!");
          setIsEditOpen(false);
          dispatch(fetchUsers({ page, limit: rowsPerPage }));
        }}
      />
    </>
  );
};

export default UserList;
