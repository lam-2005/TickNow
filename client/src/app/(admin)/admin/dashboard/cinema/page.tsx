import Chart from "@/admin_components/Dashboard/Chart";
import DateRangePicker from "@/admin_components/Dashboard/DateRange";
import LoadData from "@/admin_components/Dashboard/LoadData";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import Table, { Column } from "@/admin_components/Table/Table";
import { BarChart } from "@mui/x-charts/BarChart";
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
const StatisticsCinema = () => {
  return (
    <div className="card">
      <HeadingCard title="Doanh thu theo rạp" />
      <div className="flex gap-5">
        <DateRangePicker />
        <LoadData />
      </div>
      <div className="flex-column gap-5 ">
        <div className="flex-1">
          <Chart title="Số vé bán ra theo rạp">
            <BarChart
              height={350}
              series={[
                {
                  data: [6, 10, 54, 12, 90],
                  label: "Số vé bán ra",
                  color: "#34a835",
                },
              ]}
              xAxis={[
                {
                  data: [
                    "Phim 1 cực kỳ là dài luôn đó nha",
                    "Phim 2",
                    "Phim 3",
                    "Phim 4",
                    "Phim 5",
                    "Phim 6",
                  ],
                  tickLabelStyle: {
                    angle: -35,
                  },
                  height: 80,
                },
              ]}
              yAxis={[{ width: 50 }]}
            />
          </Chart>
        </div>
        <div className="flex-1">
          <Chart title="Doanh thu theo rạp">
            <BarChart
              height={350}
              series={[
                {
                  data: [6, 10, 54, 12, 90, 45, 23, 14, 65, 22, 65, 89],
                  label: "Doanh thu",
                  color: "#ffba01",
                },
              ]}
              xAxis={[
                {
                  data: [
                    "Phim 1",
                    "Phim 2",
                    "Phim 3",
                    "Phim 4",
                    "Phim 5",
                    "Phim 6",
                    "Phim 7",
                    "Phim 8",
                    "Phim 9",
                    "Phim 10",
                    "Phim 11",
                    "Phim 12",
                    "Phim 12",
                    "Phim 12",
                  ],

                  tickLabelStyle: {
                    angle: -45,
                  },
                  height: 80,
                },
              ]}
              yAxis={[{ width: 50 }]}
            />
          </Chart>
        </div>
      </div>
      <Table
        column={col}
        data={[{ _id: 1, movie: "Phim 1", ticket: "5", total: "1000000" }]}
      />
    </div>
  );
};

export default StatisticsCinema;
