"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { RoomType } from "@/interfaces/room.interface";
import dataRoom from "@/utils/redux/selectors/roomSelector";
import { fetchRooms, setInitialRooms } from "@/utils/redux/slices/roomSlice";
import { AppDispatch } from "@/utils/redux/store";
import React, { use, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
type InitDataType = {
  rooms: RoomType[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const RoomList = ({ initData }: { initData: Promise<InitDataType> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = use(initData);
  const isFirstLoad = useRef(true);

  // lay selector
  const { currentPage, loading, data, error, total, totalPages } =
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
    dispatch(fetchRooms({ limit: rowsPerPage, page: page }));
  }, [dispatch, rowsPerPage, page]);

  // table
  const col: Column<RoomType>[] = [
    { key: "cinema", title: "Rạp" },
    { key: "code_room", title: "Phòng" },
    {
      title: "Tông số ghê",
      render(row) {
        return <p>{`${row.diagram?.colunm * row.diagram?.row}`}</p>;
      },
    },
    { title: "Chi tiết phòng", render: () => <div>Xem</div> },
    {
      title: "Thao tác",
      render() {
        return (
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
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
