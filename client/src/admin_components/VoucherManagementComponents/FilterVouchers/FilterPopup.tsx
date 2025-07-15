"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchVouchers, setFilter } from "@/utils/redux/slices/voucherSlice";
import dataVoucher from "@/utils/redux/selectors/selectorVoucher";

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
  const [timeStart, setTimeStart] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
  const [status, setStatus] = useState<string[]>([]);

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
    setTimeStart(filter.timeStart ?? "");
    setTimeEnd(filter.timeEnd ?? "");

    if (filter.status) {
      setStatus(filter.status.split(",").map((s) => s));
    } else {
      setStatus([]);
    }
  }, [filter]);

  const handleFilter = () => {
    dispatch(
      fetchVouchers({
        limit: 5,
        page: 1,
        code,
        timeStart,
        timeEnd,
        status: status.join(","),
      })
    );
    dispatch(
      setFilter({
        code,
        timeStart,
        timeEnd,
        status: status.join(","),
      })
    );
    closeForm();
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
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Ngày bắt đầu:</label>
          <input
            type="date"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            placeholder="Nhập ngày bắt đầu"
            className="border border-foreground p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Ngày kết thúc:</label>
          <input
            type="date"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            placeholder="Nhập ngày kết thúc"
            className="border border-foreground p-2 rounded-md"
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
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};
export default FilterPopup;
