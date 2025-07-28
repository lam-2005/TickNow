"use client";
import React, { useEffect, useState } from "react";
import { getDashboardData } from "@/services/dashboard.service";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
  loading: () => <p className="text-center">Đang tải biểu đồ...</p>,
});

const Overview = ({
  data,
}: {
  data: {
    month: number;
    totalRevenue: number;
    count: number;
  }[];
}) => {
  const currentYear = new Date().getFullYear().toString();

  const [tableDataChart, setTableDataChart] = useState(data);
  const [loadingChart, setLoadingChart] = useState(false);
  const [year, setYear] = useState<Dayjs | null>(dayjs(currentYear));

  useEffect(() => {
    const fetchChartData = async () => {
      setLoadingChart(true);
      try {
        const res = await getDashboardData(`/revenueYear?year=${year?.year()}`);
        setTableDataChart(res);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, [year]);
  const xLabels = tableDataChart.map((item) => `${item.month}/${year?.year()}`);
  const yLabels = tableDataChart.map((item) => item.totalRevenue);
  const totalYear = tableDataChart.reduce(
    (acc, cur) => (acc += cur.totalRevenue),
    0
  );
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={year}
          label="Chọn năm"
          views={["year"]}
          onChange={(newValue) => setYear(newValue)}
        />
      </LocalizationProvider>
      <Chart
        title={`Doanh thu năm ${year?.year()}`}
        xLabels={xLabels}
        yLabels={yLabels}
        yearSelected={year?.year()}
        loading={loadingChart}
        subtitle={
          <p className="text-center">
            Tổng doanh thu:{" "}
            <span className="font-bold">
              {totalYear.toLocaleString("vi-vn")} VNĐ
            </span>
          </p>
        }
      />
    </>
  );
};

export default Overview;
