import CinemaTable from "@/admin_components/Dashboard/StatisticsCinema/CinemaTable";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import { getDashboardData } from "@/services/dashboard.service";
import React from "react";
const StatisticsCinema = async () => {
  const listCinema = await getDashboardData("/cinema");
  return (
    <div className="card">
      <HeadingCard title="Doanh thu theo rạp" />

      <CinemaTable data={listCinema} />
    </div>
  );
};

export default StatisticsCinema;
