"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { UserReq, UserType } from "@/interfaces/user.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataUser from "@/utils/redux/selectors/userSelector";
import { fetchUsers, setInitialUsers, updateUser } from "@/utils/redux/slices/userSlice";
import usePanigation from "@/hooks/usePanigation";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import { toast } from "react-toastify";

type InitDataType = {
  users: UserType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const UserList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const { users, total, currentPage, totalPages, loading, error } =
    useSelector(dataUser);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(setInitialUsers({ ...initData, loading: false, errorAddData: null, errorUpdateData: null, error: null }));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchUsers({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleUpdate = async (id: string, data: UserReq) => {
    try {
      const sure = confirm("Bạn có muốn cập nhật người dùng này?");
      if (!sure) return;
      await dispatch(updateUser({ id, data })).unwrap();
      toast.success("Cập nhật người dùng thành công!");
      dispatch(fetchUsers({ page: currentPage, limit: rowsPerPage }));
    } catch (err) {
      console.log("Cập nhật người dùng thất bại:", err);
      toast.error("Cập nhật người dùng thất bại!");
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
      render: (row: UserType) => (
        <ActionButton
          label={
            row.status === 1 || row.status === "1"
              ? "Hoạt Động"
              : "Ngừng Hoạt Động"
          }
          bgColor={
            row.status === 1 || row.status === "1"
              ? "success"
              : "warning"
          }
          onClick={() => null}
        />
      ),
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
              onClick={() => {
                setSelectedUser(row);
                setIsEditOpen(true);
              }}
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
      {isEditOpen && selectedUser && (
        <UpdateFormContainer
          info={selectedUser}
          closeForm={() => {
            setIsEditOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={(data) => {
            if (!selectedUser?._id) return;
            handleUpdate(selectedUser._id, data);
          }}
        />
      )}
    </>
  );
};

export default UserList;
