"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { getDashboardData } from "@/services/dashboard.service";
import Chart from "../Chart";
import { BarChart } from "@mui/x-charts/BarChart";
import DateRangePicker from "../DateRange";

type DataType = {
  _id: number | string;
  cinemaId: number | string;
  cinemaName: string;
  ticketCount: number;
  totalRevenue: number;
};

const CinemaTable = ({
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
  const cinemaNames = tableDataChart.map((item) => item.cinemaName);
  const revenues = tableDataChart.map((item) => item.totalRevenue);

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
    const error = validateDates();
    setErrors(error);
    if (!error) {
      changePage(1);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchChartData = async () => {
      if (errors || (startDate && !endDate) || (!startDate && endDate)) return;
      setLoadingChart(true);
      try {
        let res;
        if (!startDate && !endDate)
          res = await getDashboardData(`/cinema?start=&end=`);
        res = await getDashboardData(
          `/cinema?start=${startDate}&end=${endDate}`
        );
        setTableDataChart(res.data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, [startDate, endDate, errors]);

  useEffect(() => {
    const fetchTableData = async () => {
      if (errors || (startDate && !endDate) || (!startDate && endDate)) return;
      setLoading(true);
      try {
        let res;
        if (!startDate && !endDate)
          res = await getDashboardData(
            `/cinema?start=&end=&page=${page}&limit=${rowsPerPage}`
          );
        res = await getDashboardData(
          `/cinema?start=${startDate}&end=${endDate}&page=${page}&limit=${rowsPerPage}`
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
  }, [page, rowsPerPage, startDate, endDate, errors]);

  const columns: Column<DataType>[] = [
    { key: "cinemaName", title: "Tên rạp" },
    { key: "ticketCount", title: "Tổng vé bán ra" },
    {
      key: "totalRevenue",
      title: "Tổng doanh thu",
      render: (row) => (
        <p className="line-clamp-1">
          {row.totalRevenue.toLocaleString("vi-VN")} VNĐ
        </p>
      ),
    },
  ];

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <>
      <div className="flex gap-5">
        <DateRangePicker
          errors={errors}
          endDate={endDate}
          setEndDate={setEndDate}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>

      <div className="flex gap-5 mt-5">
        <div className="flex-1">
          <Chart title="Số vé bán ra theo rạp">
            <BarChart
              loading={loadingChart}
              height={350}
              series={[
                {
                  data: loadingChart ? [] : ticketCounts,
                  label: "Số vé bán ra",
                  color: "#007bff",
                },
              ]}
              xAxis={[
                {
                  data: cinemaNames,
                  tickLabelStyle: { angle: -35 },
                  height: 70,
                },
              ]}
              yAxis={[{ width: 50 }]}
              localeText={{
                loading: "Đang tải dữ liệu...",
                noData: "Không có dữ liệu",
              }}
            />
          </Chart>
        </div>

        <div className="flex-1">
          <Chart title="Doanh thu theo rạp">
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
                  data: cinemaNames,
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
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">Đang tải dữu liệu...</div>
      ) : (
        <Table
          column={columns}
          data={tableData}
          id="cinemaId"
          currentPage={page}
          rowsPerPage={rowsPerPage}
        />
      )}

      {tableData.length >= rowsPerPage && (
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

export default CinemaTable;
