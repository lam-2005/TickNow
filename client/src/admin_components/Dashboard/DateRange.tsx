// components/DateRangePicker.jsx
"use client";
import { TextField } from "@mui/material";
import React from "react";

export default function DateRangePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  errors,
  display,
}: {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  errors: string;
  display: string;
}) {
  const today = new Date();

  let limitStartDate = "";
  let limitEndDate = "";

  if (display === "2") {
    // Tháng này
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    limitStartDate = firstDay.toISOString().split("T")[0];
    limitEndDate = lastDay.toISOString().split("T")[0];
  } else if (display === "3") {
    // Tháng trước
    const firstDayPrev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayPrev = new Date(today.getFullYear(), today.getMonth(), 0);
    limitStartDate = firstDayPrev.toISOString().split("T")[0];
    limitEndDate = lastDayPrev.toISOString().split("T")[0];
  } else {
    // Tất cả các tháng
    limitStartDate = "";
    limitEndDate = "";
  }
  return (
    <div className="flex items-start gap-4">
      <span className="text-gray-500 inline-block">Từ:</span>
      <TextField
        className=""
        size="small"
        type="date"
        required
        error={errors ? true : false}
        helperText={errors}
        id="outlined-required"
        // label="Ngày bắt đầu"
        value={startDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStartDate(e.target.value)
        }
        placeholder="Nhập ngày bắt đầu"
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: limitStartDate,
          max: limitEndDate,
          onClick: (e) => {
            // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
            (e.currentTarget as HTMLInputElement).showPicker?.();
          },
        }}
      />
      <span className="text-gray-500 inline-block">Đến:</span>

      <TextField
        className=""
        size="small"
        type="date"
        required
        id="outlined-required"
        error={errors ? true : false}
        value={endDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEndDate(e.target.value)
        }
        placeholder="Nhập ngày kết thúc"
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: limitStartDate,
          max: limitEndDate,
          onClick: (e) => {
            // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
            (e.currentTarget as HTMLInputElement).showPicker?.();
          },
        }}
      />
    </div>
  );
}
