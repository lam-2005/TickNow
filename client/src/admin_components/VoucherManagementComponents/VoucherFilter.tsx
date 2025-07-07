"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { AppDispatch } from "@/utils/redux/store";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../Button/ButtonActions";
import UpdateFormContainer from "./UpdateVoucher/UpdateFormContainer";
import { toast } from "react-toastify";
import { Voucher } from "@/interfaces/vouchers.interface";
import dataVoucherSelector from "@/utils/redux/selectors/selectorVoucher";
import { fetchVouchers, setInitialVouchers } from "@/utils/redux/slices/voucherSlice";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";

type InitDataType = {
  code: string|null|undefined;
  timeStart: string|null;
  timeEnd: string|null;
  active: string[]|null;
};

const VoucherFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const activeParam = searchParams.get("active");
  const [dataFilter, setDataFilter] = useState<InitDataType>({
    code: searchParams.get("code") ?? null,
    timeStart: searchParams.get("timeStart") ?? null,
    timeEnd: searchParams.get("timeEnd") ?? null,
    active: activeParam ? activeParam.split(",") : null,
  });
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams();

      if (dataFilter.code) params.set("code", dataFilter.code);
      if (dataFilter.timeStart) params.set("timeStart", dataFilter.timeStart);
      if (dataFilter.timeEnd) params.set("timeEnd", dataFilter.timeEnd);
      if (dataFilter.active && dataFilter.active.length > 0) {
        params.set("active", dataFilter.active.join(","));
      }

      params.set("page", '1');
      params.set("limit", '5');
      router.push(`?${params.toString()}`);

      dispatch(fetchVouchers({page: 1, limit: 5, params: `${params.toString()}`}));
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [dispatch, dataFilter, router]);

  return (
    <>
      <div className=" grid grid-cols-3 gap-5">
        <TextField
            className="w-full"
            required
            id="outlined-required"
            label="Mã code"
            defaultValue={dataFilter?.code}
            onChange={(e) => setDataFilter({ ...dataFilter, code: e.target.value })}
            placeholder="Nhập mã code"
          />
          <TextField
            className="w-full"
            required
            type="date"
            id="outlined-required"
            label="Ngày bắt đầu"
            defaultValue={dataFilter?.timeStart}
            onChange={(e) => setDataFilter({ ...dataFilter, timeStart: e.target.value })}
            placeholder="Nhập ngày bắt đầu"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            className="w-full"
            required
            type="date"
            id="outlined-required"
            label="Ngày kết thúc"
            defaultValue={dataFilter?.timeEnd}
            onChange={(e) => setDataFilter({ ...dataFilter, timeEnd: e.target.value })}
            placeholder="Nhập ngày kết thúc"
            InputLabelProps={{ shrink: true }}
          />
      </div>
    </>
  );
};

export default VoucherFilter;
