import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import * as ticketService from "@/services/ticket.service";
import TicketList from "@/admin_components/TicketManagementComponents/TicketList";

const TicketManagement = async () => {
  const res = await ticketService.getTicketData(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Vé">{/* <AddScreenBtn /> */}</HeadingCard>
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <TicketList initData={res} />
      </Suspense>
    </div>
  );
};

export default TicketManagement;
