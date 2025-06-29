"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { RoomType } from "@/interfaces/room.interface";
import dataRoom from "@/utils/redux/selectors/roomSelector";
import { fetchRooms } from "@/utils/redux/slices/roomSlice";
import { AppDispatch } from "@/utils/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoomList = () => {
  const dispatch = useDispatch<AppDispatch>();

  // lay selector
  const { currentPage, status, data, error, total, totalPages } =
    useSelector(dataRoom);

  // hook phan trang
  const { page, changePage, changeRowPerPage, rowsPerPage } =
    usePanigation(currentPage);

  // render
  useEffect(() => {
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
  return (
    <>
      {status === "loading" && (
        <p className="text-center">Đang tải dữ liệu...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">{error}</p>
      )}
      {status === "succeeded" && (
        <>
          <Table
            column={col}
            data={data}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
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
