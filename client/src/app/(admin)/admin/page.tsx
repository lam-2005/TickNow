import Overview from "@/admin_components/Dashboard/Overview/Overview";
import StatisticsCard from "@/admin_components/Dashboard/StatisticsCard";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";

import { getDashboardData } from "@/services/dashboard.service";

import React from "react";
const Dashboard = async () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const [getTicketDate, getTicketMonth, getTicketYear, getUserMonth] =
    await Promise.all([
      getDashboardData(`/revenue?type=day&value=${formattedDate}`),
      getDashboardData(`/revenue?type=month&value=${formattedDate}`),
      getDashboardData(`/revenueYear?year=${year}`),
      getDashboardData(`/newUser?type=month&value=${formattedDate}`),
    ]);

  return (
    <div className="card">
      <HeadingCard title="Thống kê" />
      <div className="flex gap-5">
        <StatisticsCard
          content={
            `${getTicketDate.totalRevenue.toLocaleString("vi-VN")} VNĐ` ||
            "0 VNĐ"
          }
          title={`Doanh thu trong ngày (${today.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })})`}
        />
        <StatisticsCard
          content={getUserMonth.count || 0}
          title={`Khách hàng mới (${month}/${year})`}
          color="success"
        />
        <StatisticsCard
          title={`Tổng vé bán ra (${today.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })})`}
          content={getTicketDate.count || 0}
          color="warning"
        />
        <StatisticsCard
          title={`Tổng doanh thu (${month}/${year})`}
          content={
            `${getTicketMonth.totalRevenue.toLocaleString("vi-VN")} VNĐ` ||
            "0 VNĐ"
          }
          color="error"
        />
      </div>
      <div>
        <Overview data={getTicketYear} />
      </div>
      {/* <div className="flex gap-5">
        <div className="flex-1 space-y-2.5">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">Doanh thu theo phim</p>
            <Link href={"/admin/dashboard/movie"} className="text-primary">
              Xem tất cả
            </Link>
          </div>
          <Table
            column={col}
            data={[{ _id: 1, movie: "Phim 1", ticket: "5", total: "1000000" }]}
          />
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">Doanh thu theo rạp</p>
            <Link href={"/admin/dashboard/cinema"} className="text-primary">
              Xem tất cả
            </Link>
          </div>
          <Table
            column={col}
            data={[{ _id: 1, movie: "Rạp 1", ticket: "5", total: "1000000" }]}
          />
        </div>
      </div> */}
    </div>
  );
};
export default Dashboard;
