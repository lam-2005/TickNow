"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { Ticket } from "@/interfaces/ticket.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataTicket from "@/utils/redux/selectors/ticketSelector";
import usePanigation from "@/hooks/usePanigation";
import {
  fetchTicket,
  setInitialTicket,
} from "@/utils/redux/slices/ticketSlice";
import Status from "../StatusUI/Status";
import DetailTicket from "./DetailTicket/DetailTicket";

type InitDataType = {
  ticket: Ticket[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const TicketList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");

  const { data, total, currentPage, totalPages, loading, error } =
    useSelector(dataTicket);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(setInitialTicket(initData));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchTicket({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (page <= totalPages) {
      dispatch(
        fetchTicket({
          limit: rowsPerPage,
          page: page,
        })
      );
    } else {
      dispatch(
        fetchTicket({
          limit: rowsPerPage,
          page: totalPages,
        })
      );
    }
  }, [dispatch, rowsPerPage, page, totalPages]);

  const col: Column<Ticket>[] = [
    { key: "userName", title: "Tên khách hàng" },
    { key: "price", title: "Giá vé" },
    {
      title: "Rạp",
      render: (row) => row.cinema?.name || "Không có",
    },
    {
      title: "Phòng",
      render: (row) => row.room?.code || "Không có",
    },
    {
      title: "Số ghế",
      render: (row) => row.seat.join(", "),
    },
    {
      title: "Trạng thái",
      render: (row) => (
        <Status
          title={`${row.type === 1 ? "Thanh toán thất bại" : "Đã thanh toán"}`}
          color={`${row.type === 1 ? "error" : "success"}`}
        />
      ),
    },
    {
      title: "Thao Tác",
      render(row) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Xem vé"
              bgColor="success"
              onClick={() => handleShowDetail(row._id)}
            />
            <ActionButton label="Hủy vé" bgColor="error" onClick={() => null} />
          </div>
        );
      },
    },
  ];

  const handleShowDetail = (id: string) => {
    setSelectedTicket(id);
    setIsEditOpen(true);
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      {isEditOpen && (
        <DetailTicket
          id={selectedTicket}
          closeForm={() => setIsEditOpen(false)}
        />
      )}
      <Table
        column={col}
        data={data}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
      {
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      }
    </>
  );
};

export default TicketList;
