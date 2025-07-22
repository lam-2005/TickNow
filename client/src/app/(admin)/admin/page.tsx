import Chart from "@/admin_components/Dashboard/Chart";
import StatisticsCard from "@/admin_components/Dashboard/StatisticsCard";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import Table, { Column } from "@/admin_components/Table/Table";
import Link from "next/link";
import React from "react";
const col: Column<{
  _id: number;
  movie: string;
  ticket: string;
  total: string;
}>[] = [
  { key: "movie", title: "Tên phim" },
  { key: "ticket", title: "Tổng vé bán ra" },
  { key: "total", title: "Tổng doanh thu" },
];
const Dashboard = () => {
  return (
    <div className="card">
      <HeadingCard title="Thống kê" />
      <div className="flex gap-5">
        <StatisticsCard
          content="500.000 VNĐ"
          title="Doanh thu trong ngày (18/07/2025)"
        />
        <StatisticsCard
          content="0"
          title="Khách hàng mới (18/07/2025)"
          color="success"
        />
        <StatisticsCard
          title="Tổng vé bán ra (18/07/2025)"
          content="10"
          color="warning"
        />
        <StatisticsCard
          title="Tổng doanh thu (T7/2025)"
          content="1.234.567 VNĐ"
          color="error"
        />
      </div>
      <div>
        <Chart title="Doanh thu theo tháng" />
      </div>
      <div className="flex gap-5">
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
      </div>
    </div>
  );
};
export default Dashboard;
