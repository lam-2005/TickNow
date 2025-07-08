"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "../PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchVouchers, setFilter } from "@/utils/redux/slices/voucherSlice";
import dataVoucher from "@/utils/redux/selectors/selectorVoucher";
import { Voucher } from "@/interfaces/vouchers.interface";
import { getVoucherList } from "@/services/vouchers.service";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

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

const FilterPopup = ({
  closeForm,
}: {
  closeForm: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [code, setCode] = useState<string>();
  const [timeStart, setTimeStart] = useState<string>();
  const [timeEnd, setTimeEnd] = useState<string>();
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
    getVoucherList().then(res => {
      setVouchers(res?.voucher ?? [])
    })
  }, []);

  useEffect(() => {
    setCode(filter.code ?? '')
    setTimeStart(filter.timeStart ?? '')
    setTimeEnd(filter.timeEnd ?? '')
  
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
        code: code,
        timeStart: timeStart,
        timeEnd: timeEnd,
        status: status.join(","),
      })
    );
    dispatch(
      setFilter({
        code: code,
        timeStart: timeStart,
        timeEnd: timeEnd,
        status: status.join(","),
      })
    );
    closeForm();
  };

  return (
    <PopupContainer title="Bộ lọc Voucher" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-y-scroll">

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn mã code:</h1>
          <div className="flex flex-wrap gap-4">
            {vouchers?.length > 0 ? (
              vouchers.map((loc) => (
                <button key={loc._id} onClick={() => code == loc.code ? setCode("") : setCode(loc.code)}>
                  <FilterItem
                    title={loc.code}
                    className={`${
                      code === loc.code
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu mã code.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn ngày bắt đầu:</h1>
          <div className="flex flex-wrap gap-4">
            {vouchers?.length > 0 ? (
              vouchers
              .filter((voucher, index, self) => index === self.findIndex(v => formatDate(v.start_date) === formatDate(voucher.start_date)))
              .map((loc) => (
                <button key={loc._id} onClick={() => timeStart == formatDate(loc.start_date) ? setTimeStart("") : setTimeStart(formatDate(loc.start_date))}>
                  <FilterItem
                    title={formatDate(loc.start_date)}
                    className={`${
                      timeStart === formatDate(loc.start_date)
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu ngày bắt đầu.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn ngày kết thúc:</h1>
          <div className="flex flex-wrap gap-4">
            {vouchers?.length > 0 ? (
              vouchers
              .filter((voucher, index, self) => index === self.findIndex(v => formatDate(v.end_date) === formatDate(voucher.end_date)))
              .map((loc) => (
                <button key={loc._id} onClick={() => timeEnd == formatDate(loc.end_date) ? setTimeEnd("") : setTimeEnd(formatDate(loc.end_date))}>
                  <FilterItem
                    title={formatDate(loc.end_date)}
                    className={`${
                      timeEnd === formatDate(loc.end_date)
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu ngày kết thúc.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {["Hoạt Động", "Không hoạt động"].map((val) => (
              <button key={val} onClick={() => handleGetStatus(val)}>
                <FilterItem
                  className={`${
                    status.includes(val)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={val}
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
