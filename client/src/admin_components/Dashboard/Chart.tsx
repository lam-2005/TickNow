import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Chart = ({
  title,
  children,
  xLabels,
  yLabels,
}: {
  title: string;
  children?: React.ReactNode;
  xLabels?: string[];
  yLabels?: number[];
}) => {
  const year = new Date().getFullYear();
  return (
    <div>
      <p className="text-center text-xl font-bold">{title}</p>
      {children || (
        <LineChart
          localeText={{
            loading: "Đang tải dữ liệu...",
            noData: "Không có dữ liệu",
          }}
          loading={yLabels?.length === 0}
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
              label: `Tháng (${year})`,
            },
          ]}
          yAxis={[{ width: 90, label: "Doanh thu (VNĐ)" }]}
        />
      )}
    </div>
  );
};

export default Chart;
