import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import * as ticketService from "@/services/ticket.service";
import TicketList from "@/admin_components/TicketManagementComponents/TicketList";
import FilterTicket from "@/admin_components/TicketManagementComponents/FilterTickets/FilterTickets";
import { getMovieList } from "@/services/movie.service";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lí vé",
};

const TicketManagement = async () => {
  const res = await ticketService.getTicketData(1, 5);

  const movieData = await getMovieList("?status=1&status=2");
  const movies = movieData.data.movie;
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Vé"></HeadingCard>
      <FilterTicket movies={movies} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <TicketList initData={res} />
      </Suspense>
    </div>
  );
};

export default TicketManagement;
