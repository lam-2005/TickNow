import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import * as ticketService from "@/services/ticket.service";
import TicketList from "@/admin_components/TicketManagementComponents/TicketList";
import Ticket from "@/components/Movie/Ticket";

const getTicketData = async (page: number, limit: number) => {
  const res = await ticketService.getTicketList(`?page=${page}&limit=${limit}`);
  return {
    ticket: res?.data.ticket,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

const TicketManagement = async () => {
  const res = await getTicketData(1, 5);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Vé">{/* <AddScreenBtn /> */}</HeadingCard>
      <OptionTable />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <TicketList initData={res} />
      </Suspense>
    </div>
  );
};

export default TicketManagement;
