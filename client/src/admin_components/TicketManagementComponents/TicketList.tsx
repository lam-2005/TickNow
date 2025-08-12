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
import { cancelTicketAPI } from "@/services/ticket.service";
import { toast } from "react-toastify";
import { useConfirm } from "@/hooks/contexts/useConfirm";

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
  const confirm = useConfirm();
  const { data, total, currentPage, totalPages, loading, error, filter } =
    useSelector(dataTicket);
  const [selectedTicket, setSelectedTicket] = useState("");
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
    if (page <= totalPages) {
      dispatch(
        fetchTicket({
          limit: rowsPerPage,
          page: page,
          date: filter.date,
          movieId: filter.movieId,
          type: filter.type,
        })
      );
    } else {
      dispatch(
        fetchTicket({
          limit: rowsPerPage,
          page: totalPages,
          date: filter.date,
          movieId: filter.movieId,
          type: filter.type,
        })
      );
    }
  }, [
    dispatch,
    rowsPerPage,
    page,
    totalPages,
    filter.date,
    filter.movieId,
    filter.type,
  ]);

  const col: Column<Ticket>[] = [
    { key: "userName", title: "Tên khách hàng" },
    {
      key: "price",
      title: "Giá vé",
      render: (row) => (
        <p>
          {row.price !== undefined ? row.price.toLocaleString("vi-VN") : "N/A"}
        </p>
      ),
    },
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
          title={`${
            row.type === 1
              ? "Thanh toán thất bại"
              : row.type === 2
              ? "Đã thanh toán"
              : "Đã hủy"
          }`}
          color={`${
            row.type === 1 ? "error" : row.type === 2 ? "success" : "error"
          }`}
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
              onClick={() => handleShowDetail(row._id as string)}
            />
            {row.type === 3 ? (
              <ActionButton
                label="Hủy vé"
                bgColor="error"
                className="brightness-70 cursor-not-allowed! text-nowrap"
                onClick={() => toast.info("Vé này đã bị hủy")}
              />
            ) : (
              <ActionButton
                label="Hủy vé"
                bgColor="error"
                className="text-nowrap!"
                onClick={() => handleCancelTicket(row._id as string)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const handleShowDetail = (id: string) => {
    setSelectedTicket(id);
    setIsEditOpen(true);
  };
  const handleCancelTicket = async (id: string) => {
    const ok = await confirm({
      title: "Bạn có muốn hủy vé này",
      content: "Hành động này sẽ không thể hoàn tác",
    });
    if (!ok) return;
    try {
      await cancelTicketAPI(id);
      toast.success("Hủy vé thành công");
      await dispatch(
        fetchTicket({
          limit: rowsPerPage,
          page: currentPage,
          date: filter.date,
          movieId: filter.movieId,
          type: filter.type,
        })
      );
    } catch (error) {
      toast.error(`Hủy vé thất bại: ${error}`);
    }
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
      {total >= rowsPerPage && ( // nếu tổng số item trong data >= số limit mới có phần trang ví dụ tổng item là 4, limit là 5 thì k hiện còn lớn hon là hiện
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

export default TicketList;
