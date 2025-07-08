"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { Screening, ScreenReq } from "@/interfaces/screening.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataScreen from "@/utils/redux/selectors/screenSelector";
import {
  fetchScreen,
  setInitialScreen,
  updateScreen,
} from "@/utils/redux/slices/screenSlice";
import usePanigation from "@/hooks/usePanigation";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import { toast } from "react-toastify";
import { MovieType } from "@/interfaces/movie.interface";
import { RoomType } from "@/interfaces/room.interface";
import Status from "../StatusUI/Status";

type InitDataType = {
  Screen: Screening[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const ScreenList = ({
  initData,
  moviesOptions,
  rooms,
}: {
  initData: InitDataType;
  moviesOptions: MovieType[];
  rooms: RoomType[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    Screen = [],
    total = 0,
    currentPage = 1,
    totalPages = 1,
    loading = false,
    error = null,
  } = useSelector(dataScreen) || {};

  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(
      setInitialScreen({
        ...initData,
        loading: false,
        errorAddData: null,
        errorUpdateData: null,
        error: null,
      })
    );
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchScreen({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleUpdate = async (id: string, data: ScreenReq) => {
    try {
      const sure = confirm("Bạn có muốn cập nhật suất chiếu này?");
      if (!sure) return;
      await dispatch(updateScreen({ id, data })).unwrap();
      toast.success("Cập nhật suất chiếu thành công!");
      dispatch(fetchScreen({ page: currentPage, limit: rowsPerPage }));
    } catch (err) {
      console.log("Cập nhật suất chiếu thất bại:", err);
      toast.error("Cập nhật suất chiếu thất bại!");
    }
  };

  const col: Column<Screening>[] = [
    {
      key: "movieName",
      title: "Tên phim",
      render(row) {
        return (
          <p className="line-clamp-1" title={row.movieName}>
            {row.movieName}
          </p>
        );
      },
    },
    { key: "roomCode", title: "Phòng" },
    { key: "time_start", title: "Thời gian chiếu" },
    { key: "time_end", title: "Thời gian ngừng" },
    {
      key: "date",
      title: "Ngày chiếu",
      render(row) {
        const date = new Date(row.date);
        return <p>{date.toLocaleDateString("vi-VN")}</p>;
      },
    },
    {
      key: "price",
      title: "Giá (VNĐ)",
      render(row) {
        return (
          <p>
            {row.price !== undefined
              ? row.price.toLocaleString("vi-VN")
              : "N/A"}
          </p>
        );
      },
    },
    {
      key: "status",
      title: "Trạng Thái",
      render: (row: Screening) => (
        <Status
          title={row.status === 2 ? "Đang hoạt động" : "Ngưng hoạt Động"}
          color={row.status === 2 ? "success" : "error"}
        />
        // <ActionButton
        //   label={row.status ? "Hoạt Động" : "Ngừng Hoạt Động"}
        //   bgColor={row.status ? "success" : "warning"}
        //   onClick={() => null}
        // />
      ),
    },
    {
      title: "Thao Tác",
      render(row: Screening) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Sửa"
              bgColor="warning"
              onClick={() => {
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
      {/* <Table column={col} data={Screen.map((u) => ({ ...u, id: u._id }))} currentPage={currentPage} rowsPerPage={rowsPerPage} />
       */}
      <Table
        column={col}
        data={Screen.map((u: Screening) => ({ ...u, id: u._id }))}
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
      {/* {isEditOpen && (
        <UpdateFormContainer closeForm={() => setIsEditOpen(false)} />
      )} */}
    </>
  );
};

export default ScreenList;
