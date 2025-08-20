"use client";
import React, { useEffect, useState } from "react";
import { getDashboardData } from "@/services/dashboard.service";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/vi";
import dynamic from "next/dynamic";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
  loading: () => <p className="text-center">Đang tải biểu đồ...</p>,
});

const Overview = ({
  data,
}: {
  data: {
    day?: number;
    month?: number;
    totalRevenue: number;
    count: number;
  }[];
}) => {
  const currentDate = new Date(); // Lấy Date gốc
  const formatted = dayjs(currentDate); // Tạo dayjs object

  const [age, setAge] = React.useState("y");
  const [tableDataChart, setTableDataChart] = useState(data);
  const [loadingChart, setLoadingChart] = useState(false);
  const [year, setYear] = useState<Dayjs | null>(formatted);
  const [monthValue, setMonthValue] = useState<Dayjs | null>(formatted);
  const [openPicker, setOpenPicker] = useState(false);
  useEffect(() => {
    const fetchChartData = async () => {
      setLoadingChart(true);
      try {
        if (age === "y") {
          const res = await getDashboardData(
            `/revenueYear?year=${year?.year()}`
          );
          setTableDataChart(res);
          return;
        }
        const res = await getDashboardData(
          `/revenueMonth?year=${monthValue?.year()}&month=${
            monthValue && monthValue?.month() + 1
          }`
        );
        setTableDataChart(res);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, [year, age, monthValue]);
  const xLabels =
    age === "y"
      ? tableDataChart.map((item) => `${item.month}/${year?.year()}`)
      : tableDataChart.map(
          (item) =>
            `${item.day}/${
              monthValue && monthValue?.month() + 1
            }/${monthValue?.year()}`
        );
  const yLabels = tableDataChart.map((item) => item.totalRevenue);
  const totalYear = tableDataChart.reduce(
    (acc, cur) => (acc += cur.totalRevenue),
    0
  );

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <div className="flex gap-5 mb-5">
        <p>Thống kê theo:</p>
        <FormControl>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={"y"}>Năm</MenuItem>
            <MenuItem value={"m"}>Tháng</MenuItem>
          </Select>
        </FormControl>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        {age === "y" ? (
          <DatePicker
            value={year}
            label="Chọn năm"
            views={["year"]}
            onChange={(newValue) => {
              setYear(newValue);
            }}
          />
        ) : (
          <DatePicker
            value={monthValue}
            label="Chọn tháng"
            format="[Tháng] M"
            views={["month", "year"]}
            open={openPicker}
            onOpen={() => setOpenPicker(true)} // mở popup khi cần
            onClose={() => setOpenPicker(false)} // đóng popup khi click ra ngoài
            onChange={(newValue) => {
              setMonthValue(newValue);
              setOpenPicker(false); // tự động đóng khi chọn tháng xong
            }}
          />
        )}
      </LocalizationProvider>
      <Chart
        title={
          age === "y"
            ? `Doanh thu năm ${year?.year()}`
            : `Doanh thu tháng ${
                monthValue && monthValue?.month() + 1
              } (${monthValue?.year()})`
        }
        xLabels={xLabels}
        yLabels={yLabels}
        yearSelected={
          age === "y"
            ? `Năm ${year?.year()}`
            : `Tháng ${
                monthValue && monthValue?.month() + 1
              }/${monthValue?.year()}`
        }
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
