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
}: {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  errors: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-gray-500 inline-block">Từ</span>
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
      />
      <span className="text-gray-500 inline-block">Đến</span>

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
      />
    </div>
  );
}
