// "use client";
// import React from "react";
// import AddBtn from "@/admin_components/Button/AddBtn";
// import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
// import OptionTable from "@/admin_components/OptionTable/OptionTable";
// import Table from "@/admin_components/Table/Table";

// interface Booking {
//   name: string;
//   phone: string;
//   day: string;
//   detail: string;
// }

// const col = [
//   //   { key: "code", title: "Mã" },
//   { key: "name", title: "Tên khách hàng" },
//   { key: "phone", title: "Sđt" },
//   { key: "day", title: "Ngày đặt" },
//   { key: "detail", title: "Chi tiết" },
//   {
//     key: "actions", // cần thiết nếu Table dùng key để định danh
//     title: "Thao tác",
//     render(row: Booking) {
//       return (
//         <div className="flex space-x-2">
//           <button
//             className="text-red-500 hover:underline"
//             onClick={() => handleDelete(row.id)}
//           >
//             Hủy vé
//           </button>
//         </div>
//       );
//     },
//   },
// ];

// const handleDelete = (id: string) => {
//   console.log("Delete", id);
// };

// const AdminBooking = () => {
//   return (
//     <div className="card">
//       <HeadingCard title="Quản lý đặt vé">
//         <AddBtn />
//       </HeadingCard>
//       <OptionTable />
//       <Table column={col} data={bookings} />
//     </div>
//   );
// };

// export default AdminBooking;

"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { Ticket } from "@/interfaces/ticket.interface";
import * as TicketService from "@/services/ticket.service";

const AdminBooking = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await TicketService.getTicketList("?_limit=10");
        setTickets(res?.data || []);
      } catch (error) {
        setError("Không thể tải danh sách đặt vé.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = (id: string | number) => {
    alert(`Hủy vé với ID: ${id}`);
  };

  const columns: Column<Ticket>[] = [
    { key: "userName", title: "Tên khách hàng" },
    // { key: "screeningTime", title: "Giờ chiếu" },
    { key: "price", title: "Giá vé" },
    { key: "type", title: "Trạng thái thanh toán" },
    {
      key: "seat",
      title: "Ghế",
      render: (row) => row.seat.join(", "),
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row._id)}
          >
            Hủy vé
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản lý đặt vé">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        // <Table column={columns} data={tickets} />
        <Table column={columns} data={tickets.map(t => ({ ...t, id: t._id }))} />
      )}
    </div>
  );
};

export default AdminBooking;
