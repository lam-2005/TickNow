"use client";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { getDashboardData } from "@/services/dashboard.service";
// import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import DateRangePicker from "../DateRange";
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
type DataType = {
  _id: number;
  movieName: string;
  ticketCount: number;
  totalRevenue: number;
};

const MovieTable = ({
  data,
}: {
  data: {
    data: DataType[];
    pagination: { total: number; page: number; limit: number };
  };
}) => {
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(1);

  const [tableData, setTableData] = useState<DataType[]>(data.data);
  const [tableDataChart, setTableDataChart] = useState<DataType[]>(data.data);
  const [loading, setLoading] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);

  const [pagination, setPagination] = useState(data.pagination);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState("");

  const ticketCounts = tableDataChart.map((item) => item.ticketCount);
  const movieNames = tableDataChart.map((item) => item.movieName);
  const revenues = tableDataChart.map((item) => item.totalRevenue);

  const [display, setDisplay] = useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    setDisplay(event.target.value as string);
    setStartDate("");
    setEndDate("");
  };

  const condition = useMemo(() => {
    if (display === "2") return "&month=0";
    else if (display === "3") return "&month=-1";
    else if (display === "4") return "&sort=true";
    else return "";
  }, [display]);

  const validateDates = (): string => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) return "Ngày bắt đầu không được lớn hơn ngày kết thúc";
    }
    if (endDate && !startDate)
      return "Vui lòng nhập ngày bắt đầu trước khi nhập ngày kết thúc";
    if (startDate && !endDate) return "Vui lòng nhập ngày kết thúc";
    return "";
  };

  useEffect(() => {
    const errorMessage = validateDates();
    setErrors(errorMessage);
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchChartData = async () => {
      if (errors || (startDate && !endDate) || (!startDate && endDate)) return;
      setLoadingChart(true);
      try {
        let res;
        if (!startDate && !endDate)
          res = await getDashboardData(`/movieDay?start=&end=${condition}`);
        res = await getDashboardData(
          `/movieDay?start=${startDate}&end=${endDate}${condition}`
        );
        setTableDataChart(res.data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, [startDate, endDate, errors, display]);

  useEffect(() => {
    const fetchTableData = async () => {
      if (errors || (startDate && !endDate) || (!startDate && endDate)) return;
      setLoading(true);
      try {
        let res;
        if (!startDate && !endDate)
          res = await getDashboardData(
            `/movieDay?start=&end=&page=${page}&limit=${
              display === "4" ? "10" : rowsPerPage
            }${condition}`
          );

        res = await getDashboardData(
          `/movieDay?start=${startDate}&end=${endDate}&page=${page}&limit=${
            display === "4" ? "10" : rowsPerPage
          }${condition}`
        );
        setTableData(res.data);
        setPagination(res.pagination);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu bảng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [page, rowsPerPage, startDate, endDate, errors, display]);

  const columns: Column<DataType>[] = [
    { key: "movieName", title: "Tên phim" },
    { key: "ticketCount", title: "Tổng vé bán ra" },
    {
      key: "totalRevenue",
      title: "Tổng doanh thu",
      render(row) {
        return (
          <p className="line-clamp-1">
            {row.totalRevenue.toLocaleString("vi-VN")} VNĐ
          </p>
        );
      },
    },
  ];

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  console.log(condition, display);

  return (
    <>
      <div className="flex gap-4">
        <p>Hiển thị:</p>
        <FormControl>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={display}
            onChange={handleChange}
          >
            <MenuItem value={"1"}>Tất cả phim</MenuItem>
            <MenuItem value={"2"}>Tháng này</MenuItem>
            <MenuItem value={"3"}>Tháng trước</MenuItem>
            <MenuItem value={"4"}>Top 10 doanh thu</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex gap-5">
        <DateRangePicker
          display={display}
          errors={errors}
          endDate={endDate}
          setEndDate={setEndDate}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>

      <div className="flex gap-5 mt-5">
        <div className="flex-1">
          <Chart title="Doanh thu theo phim">
            <BarChart
              loading={loadingChart}
              height={350}
              series={[
                {
                  data: loadingChart ? [] : ticketCounts,
                  label: "Số vé bán ra",
                  color: "#007bff",
                  yAxisId: "leftAxisId",
                },
                {
                  data: loadingChart ? [] : revenues,
                  label: "Doanh thu",
                  color: "#e91224",
                  yAxisId: "rightAxisId",
                },
              ]}
              xAxis={[
                {
                  data: movieNames,
                  scaleType: "band",
                  tickLabelStyle: { angle: -35 },
                  height: 50,
                },
              ]}
              yAxis={[
                { id: "leftAxisId", width: 50, label: "Số vé bán ra" },
                {
                  id: "rightAxisId",
                  position: "right",
                  width: 90,
                  label: "Doanh thu (VNĐ)",
                },
              ]}
              localeText={{
                loading: "Đang tải dữ liệu...",
                noData: "Không có dữ liệu",
              }}
            />
          </Chart>
        </div>

        {/* <div className="flex-1">
          <Chart title="Doanh thu theo phim">
            <BarChart
              loading={loadingChart}
              height={350}
              series={[
                {
                  data: loadingChart ? [] : revenues,
                  label: "Doanh thu",
                  color: "#e91224",
                },
              ]}
              xAxis={[
                {
                  data: movieNames,
                  tickLabelStyle: { angle: -45 },
                  height: 80,
                },
              ]}
              yAxis={[{ width: 90 }]}
              localeText={{
                loading: "Đang tải dữ liệu...",
                noData: "Không có dữ liệu",
              }}
            />
          </Chart>
        </div> */}
      </div>

      {loading ? (
        <div className="text-center mt-5">Đang tải dữ liệu...</div>
      ) : (
        <Table
          column={columns}
          data={tableData}
          id="movieId"
          currentPage={page}
          rowsPerPage={rowsPerPage}
        />
      )}

      {display !== "4" && (
        <Pagination
          currentPage={page}
          total={pagination.total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
    </>
  );
};

export default MovieTable;
