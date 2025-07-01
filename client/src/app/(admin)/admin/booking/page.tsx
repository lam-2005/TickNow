"use client";
import React, { useEffect, useState, useCallback } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { TicketDetail } from "@/interfaces/ticket.interface";
import * as TicketService from "@/services/ticket.service";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";
import TicketDetailPopup from "@/admin_components/Popup/TicketDetailPopup";
import AddForm from "@/admin_components/Popup/AddPopup";

const AdminBooking = () => {
  const [tickets, setTickets] = useState<TicketDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketDetail| null>(null);

  const fetchTickets = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const res = await TicketService.getTicketList(
          `?limit=${rowsPerPage}&page=${page}`
        );
        const data = res?.data;
        setTickets(data.ticket || []);
        setTotalItems(data.pagination?.total || 0);
        setCurrentPage(data.pagination?.page || 1);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải danh sách đặt vé.");
      } finally {
        setLoading(false);
      }
    },
    [rowsPerPage]
  );

  useEffect(() => {
    fetchTickets(currentPage);
  }, [fetchTickets, currentPage]);

  const handleDelete = (id: string | number) => {
    alert(`Hủy vé có ID: ${id}`);
  };

  const columns: Column<TicketDetail>[] = [
    { key: "userName", title: "Tên khách hàng" },
    { key: "price", title: "Giá vé" },
    { key: "type", title: "Trạng thái" },
    {
      key: "seat",
      title: "Ghế",
      render: (row) => row.seat?.join(", "),
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Hủy"
            onClick={handleDelete}
            bgColor="bg-red-500"
            id={row._id}
          />
        </div>
      ),
    },
    {
      title: "Chi tiết",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Xem"
            onClick={() => setSelectedTicket(row)}
            bgColor="bg-blue-500"
            id={row._id}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Đặt Vé">
        <AddBtn onClick={() => setShowAddPopup(true)} />
      </HeadingCard>

      <OptionTable />

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <Table
            column={columns}
            data={tickets.map((t) => ({ ...t, id: t._id }))}
          />
          <Pagination
            currentPage={currentPage}
            total={totalItems}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1); // reset lại trang khi thay đổi số dòng
            }}
          />
        </>
      )}

      <AddForm <Record<string,unknown>>
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        fields={[
          {label:"Tên khách hàng", key: "movieName", required: true },
          {label:"Giá vé", key: "price", required: true },
          {label:"Ghế", key: "seat", required: true },
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            required: true,
            options: [
              { label: "Đã thanh toán", value: "1" },
              { label: "Chưa thanh toán", value: "0" },
            ],
          },
        ]}
        onSubmit={async () => {
          try {
            // await userService.createUser(data);
            alert("Thêm vé thành công!");
            setShowAddPopup(false);
            // fetchUsers(currentPage);
          } catch (err) {
            alert("Thêm thất bại!");
            console.error(err);
          }
        }}
      />

      {/* {showAddPopup && (
        <AddPopup title="Thêm Vé Mới" onClose={() => setShowAddPopup(false)}>
          <form>
            <input type="text" placeholder="Tên khách hàng" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Giờ chiếu" className="w-full p-2 border rounded mb-2" />
            <input type="number" placeholder="Giá vé" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Trạng thái" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Ghế (ngăn cách bằng dấu phẩy)" className="w-full p-2 border rounded mb-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
          </form>
        </AddPopup>
      )} */}

      {selectedTicket && (
        <TicketDetailPopup
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default AdminBooking;
