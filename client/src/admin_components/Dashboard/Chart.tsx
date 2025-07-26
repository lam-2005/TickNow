import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Chart = ({
  title,
  children,
  xLabels,
  yLabels,
  yearSelected,
  loading,
  subtitle,
}: {
  title: string | React.ReactNode;
  children?: React.ReactNode;
  xLabels?: string[];
  yLabels?: number[];
  yearSelected?: number;
  loading?: boolean;
  subtitle?: React.ReactNode;
}) => {
  return (
    <div>
      {typeof title === "string" ? (
        <p className="text-center text-xl font-bold">{title}</p>
      ) : (
        title
      )}
      {subtitle}
      {children || (
        <LineChart
          localeText={{
            loading: "Đang tải dữ liệu...",
            noData: "Không có dữ liệu",
          }}
          loading={loading}
          height={400}
          series={[
            {
              curve: "linear",
              data: loading ? [] : yLabels,
              label: "Doanh thu",
              color: "#e91224",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels,
              label: `Tháng (${yearSelected})`,
            },
          ]}
          yAxis={[{ width: 90, label: "Doanh thu (VNĐ)" }]}
        />
      )}
    </div>
  );
};

export default Chart;
