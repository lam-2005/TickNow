import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const xLabels = [
  "1/2025",
  "2/2025",
  "3/2025",
  "4/2025",
  "5/2024",
  "6/2025",
  "7/2025",
  "8/2025",
  "9/2025",
  "10/2025",
  "11/2025",
  "12/2025",
];
const yLabels = [
  1000000, 2000000, 3000000, 4000000, 5000000, 4000000, 7000000, 8000000,
  9000000,
];
const Chart = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <p className="text-center text-xl font-bold">{title}</p>
      {children || (
        <LineChart
          localeText={{
            loading: "Đang tải dữ liệu...",
            noData: "Không có dữ liệu",
          }}
          loading={yLabels.length === 0}
          height={400}
          series={[
            {
              curve: "linear",
              data: yLabels,
              label: "Doanh thu",
              color: "#e91224",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels,
              label: "Tháng (2025)",
            },
          ]}
          yAxis={[{ width: 90, label: "Doanh thu (VNĐ)" }]}
        />
      )}
    </div>
  );
};

export default Chart;
