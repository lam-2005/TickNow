"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { UserReq, UserType } from "@/interfaces/user.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataUser from "@/utils/redux/selectors/userSelector";
import {
  fetchUsers,
  setInitialUsers,
  updateUser,
} from "@/utils/redux/slices/userSlice";
import usePanigation from "@/hooks/usePanigation";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import { toast } from "react-toastify";
import Status from "../StatusUI/Status";

type InitDataType = {
  users: UserType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const UserList = ({ initData }: { initData: Promise<InitDataType> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const initialData = use(initData);

  const { users, total, currentPage, totalPages, loading, error, filter } =
    useSelector(dataUser);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initialData.currentPage
  );

  useEffect(() => {
    dispatch(
      setInitialUsers({
        ...initialData,
        loading: false,
        errorAddData: null,
        errorUpdateData: null,
        error: null,
        filter: {
          status: "",
          role: "",
        },
      })
    );
  }, [dispatch, initialData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(
      fetchUsers({
        page: page <= totalPages ? page : totalPages,
        limit: rowsPerPage,
        status: filter.status,
        role: filter.role,
      })
    );
  }, [dispatch, page, rowsPerPage, filter, totalPages]);

  const handleUpdate = async (id: string, data: UserReq) => {
    try {
      const sure = confirm("Bạn có muốn cập nhật người dùng này?");
      if (!sure) return;
      await dispatch(updateUser({ id, data })).unwrap();
      toast.success("Cập nhật người dùng thành công!");
      dispatch(
        fetchUsers({
          page: currentPage,
          limit: rowsPerPage,
          status: filter.status,
          role: filter.role,
        })
      );
    } catch (err) {
      toast.error(`Cập nhật người dùng thất bại! ${err}`);
      console.error("Cập nhật người dùng thất bại:", err);
    }
  };

  const col: Column<UserType>[] = [
    { key: "name", title: "Tên Người Dùng" },
    { key: "phone", title: "Số Điện Thoại" },
    { key: "email", title: "Email" },
    {
      key: "year",
      title: "Ngày Sinh",
      render(row) {
        const date = new Date(row.year);
        return (
          <p>
            {date.toLocaleDateString("vi-vn", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        );
      },
    },
    {
      key: "status",
      title: "Trạng Thái",
      render: (row: UserType) => (
        <Status
          title={row.status ? "Hoạt Động" : "Ngưng Hoạt Động"}
          color={row.status ? "success" : "error"}
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
      <Table
        column={col}
        data={users.map((u) => ({ ...u, id: u._id }))}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
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
