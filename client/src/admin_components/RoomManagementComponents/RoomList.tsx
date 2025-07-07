"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { RoomType } from "@/interfaces/room.interface";
import dataRoom from "@/utils/redux/selectors/roomSelector";
import {
  fetchRooms,
  setInitialRooms,
  showInfoRoom,
} from "@/utils/redux/slices/roomSlice";
import { AppDispatch } from "@/utils/redux/store";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../Button/ButtonActions";
import DetailRoom from "./DetailRoom/DetailRoom";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import { Cinema } from "@/interfaces/cinema.interface";
import Status from "../StatusUI/Status";
type InitDataType = {
  rooms: RoomType[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const RoomList = ({
  initData,
  cinemaOptions,
}: {
  initData: Promise<InitDataType>;
  cinemaOptions: Promise<Cinema[]>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = use(initData);
  const listCinemas = use(cinemaOptions);
  const isFirstLoad = useRef(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [getInfo, setGetInfo] = useState<RoomType | null>(null);
  // lay selector
  const { currentPage, loading, data, error, total, totalPages, filter } =
    useSelector(dataRoom);
  // hook phan trang
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initialData.currentPage
  );
  useEffect(() => {
    dispatch(setInitialRooms(initialData));
  }, [dispatch, initialData]);
  // render
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (page <= totalPages) {
      dispatch(
        fetchRooms({
          limit: rowsPerPage,
          page: page,
          cinemas: filter.cinemas,
          status: filter.status,
        })
      );
    } else {
      dispatch(
        fetchRooms({
          limit: rowsPerPage,
          page: totalPages,
          cinemas: filter.cinemas,
          status: filter.status,
        })
      );
    }
  }, [dispatch, rowsPerPage, page, totalPages, filter.cinemas, filter.status]);

  // table
  const col: Column<RoomType>[] = [
    { key: "cinema", title: "Rạp chiếu" },
    { key: "code_room", title: "Phòng chiếu" },
    {
      title: "Sức chứa",
      render(row) {
        const totalSeats = row.diagram?.row * row.diagram?.column;
        const removedSeatsCount = Object.values(
          row.diagram.element_remove
        ).reduce((acc, arr) => acc + arr.length, 0);

        const availableSeats = totalSeats - removedSeatsCount;

        return <p>{`${availableSeats}`}</p>;
      },
    },
    {
      title: "Sơ đồ ghế",
      render: (row) => (
        <ActionButton label="Xem" onClick={() => handleOpenShowInfo(row._id)} />
      ),
    },
    {
      title: "Trạng thái",
      render: (row) => (
        <Status
          color={
            row.status === 1
              ? "error"
              : row.status === 2
              ? "success"
              : "warning"
          }
          title={
            row.status === 1
              ? "Không hoạt động"
              : row.status === 2
              ? "Hoạt động"
              : "Đang bảo trì"
          }
        />
      ),
    },
    {
      title: "Thao tác",
      render(row) {
        return (
          <ActionButton
            label="Sửa"
            bgColor="warning"
            onClick={() => handleOpenUpdate(row._id)}
          />
        );
      },
    },
  ];

  const handleOpenShowInfo = async (id: string) => {
    const info = await dispatch(showInfoRoom(id));
    setGetInfo(info.payload);
    setShowInfo(true);
  };
  const handleOpenUpdate = async (id: string) => {
    const info = await dispatch(showInfoRoom(id));
    setGetInfo(info.payload);
    setOpenUpdateForm(true);
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (data.length === 0) return <p className="text-center">Không có dữ liệu</p>;

  return (
    <>
      {showInfo && getInfo && (
        <DetailRoom info={getInfo} closeForm={() => setShowInfo(false)} />
      )}
      {openUpdateForm && getInfo && (
        <UpdateFormContainer
          listCinemas={listCinemas}
          info={getInfo}
          closeForm={() => setOpenUpdateForm(false)}
        />
      )}
      {
        <Table
          column={col}
          data={data}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
      }
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
    </>
  );
};

export default RoomList;
