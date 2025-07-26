"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchVouchers, setFilter } from "@/utils/redux/slices/voucherSlice";
import dataVoucher from "@/utils/redux/selectors/selectorVoucher";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const FilterItem = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-1 border-foreground text-foreground flex-center w-fit px-2 py-1 transition-colors rounded-md hover:bg-primary hover:text-white hover:border-transparent cursor-pointer ${className}`}
    >
      {title}
    </div>
  );
};

const FilterPopup = ({ closeForm }: { closeForm: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState<string>("");
  const [status, setStatus] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [error, setError] = useState(""); // kiểm lỗi

  useEffect(() => {
    setError("");

    if (fromDate && toDate) {
      const current = new Date(fromDate);
      const end = new Date(toDate);
      if (current > end) {
        setError("Ngày bắt đầu không được lớn hơn ngày kết thúc");
        return;
      }
    }
  }, [fromDate, toDate]);

  const { filter } = useSelector(dataVoucher);

  const handleGetStatus = (value: string) => {
    setStatus((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    setCode(filter.code ?? "");
    setFromDate(filter.timeStart ?? "");
    setToDate(filter.timeEnd ?? "");

    if (filter.status) {
      setStatus(
        typeof filter.status === "string" ? filter.status.split(",") : []
      );
    } else {
      setStatus([]);
    }
  }, [filter]);

  const handleFilter = () => {
    if (error) {
      toast.error(error);
      return;
    }
    dispatch(
      fetchVouchers({
        limit: 5,
        page: 1,
        code,
        timeStart: fromDate,
        timeEnd: toDate,
        status: status.join(","),
      })
    );
    dispatch(
      setFilter({
        code,
        timeStart: fromDate,
        timeEnd: toDate,
        status: status.join(","),
      })
    );
    closeForm();
  };
  const handleReset = () => {
    setCode("");
    setStatus([]);
    setFromDate("");
    setToDate("");
    setError("");
  };
  return (
    <PopupContainer title="Bộ lọc Voucher" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-y-scroll">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Tên mã code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã code"
            className="border border-foreground p-2 rounded-md"
          />
        </div>
        <div className="flex gap-10">
          <TextField
            className="w-full"
            type="date"
            required
            error={error ? true : false}
            helperText={error}
            id="outlined-required"
            label="Từ"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="Nhập ngày bắt đầu"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              onClick: (e) => {
                // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
                (e.currentTarget as HTMLInputElement).showPicker?.();
              },
            }}
          />

          <TextField
            className="w-full"
            type="date"
            required
            id="outlined-required"
            error={error ? true : false}
            label="Đến"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="Nhập ngày kết thúc"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              onClick: (e) => {
                // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
                (e.currentTarget as HTMLInputElement).showPicker?.();
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {["true", "false"].map((val) => (
              <button key={val} onClick={() => handleGetStatus(val)}>
                <FilterItem
                  className={`${
                    status.includes(val)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={val === "true" ? "Hoạt động" : "Không hoạt động"}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-5 gap-4 w-full bg-background-card rounded-2xl">
        <button
          className="btn border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
          onClick={handleReset}
        >
          Đặt lại bộ lọc
        </button>
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};
export default FilterPopup;
