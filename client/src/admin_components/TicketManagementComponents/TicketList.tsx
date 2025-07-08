"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { TicketDetail, TicketReq } from "@/interfaces/ticket.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataTicket from "@/utils/redux/selectors/ticketSelector";
import usePanigation from "@/hooks/usePanigation";
import { fetchTicket, setInitialTicket } from "@/utils/redux/slices/ticketSlice";
import { toast } from "react-toastify";

type InitDataType = {
  ticket: TicketDetail[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const TicketList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketDetail | null>(null);

  const { ticket , total, currentPage, totalPages, loading, error } =
    useSelector(dataTicket);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(setInitialTicket({ ...initData, loading: false, errorAddData: null, errorUpdateData: null, error: null }));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchTicket({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);


  // const col: Column<TicketDetail>[] = [
  //   { key: "userName", title: "Tên khách hàng" },
  //   { key: "movie", title: "Tên phim" },
  //   { key: "price", title: "Giá vé" },
  //   { key: "cinema", title: "Rạp" },
  //   { key: "room", title: "Phòng" },
  //   // { key: "seat", title: "Số ghế" },
  //   { key: "type", title: "Trạng thái" },
  //   {
  //     title: "Thao Tác",
  //     render(row: TicketDetail) {
  //       return (
  //         <div className="flex gap-2">
  //           <ActionButton
  //             label="Xóa"
  //             bgColor="warning"
  //             onClick={() => {
  //               setSelectedTicket(row);
  //               setIsEditOpen(true);
  //             }}
  //             id={row._id}
  //           />
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const col: Column<TicketDetail>[] = [
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
    render: (row) => (row.type === 2 ? "Đã thanh toán" : "Chưa thanh toán"),
  },
  {
    title: "Thao Tác",
    render(row: TicketDetail) {
      return (
        <div className="flex gap-2">
          <ActionButton
            label="Xóa"
            bgColor="warning"
            onClick={() => {
              setSelectedTicket(row);
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
      <Table column={col} data={ticket.map((u) => ({ ...u, id: u._id }))} currentPage={currentPage} rowsPerPage={rowsPerPage} />
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
      {/* {isEditOpen && selectedUser && (
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
      )} */}
    </>
  );
};

export default TicketList;
