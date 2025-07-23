"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { AppDispatch } from "@/utils/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../Button/ButtonActions";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import { toast } from "react-toastify";
import { Voucher } from "@/interfaces/vouchers.interface";
import dataVoucherSelector from "@/utils/redux/selectors/selectorVoucher";
import {
  fetchVouchers,
  setInitialVouchers,
} from "@/utils/redux/slices/voucherSlice";
import Status from "../StatusUI/Status";

type InitDataType = {
  vouchers: Voucher[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const VoucherList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isFirstLoad = useRef(true);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  //   // lay selector
  const { data, error, total, currentPage, loading, totalPages, filter } =
    useSelector(dataVoucherSelector);
  // hook phan trang
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(setInitialVouchers(initData));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (page <= totalPages) {
      dispatch(
        fetchVouchers({
          limit: rowsPerPage,
          page: page,
          code: filter.code,
          timeStart: filter.timeStart,
          timeEnd: filter.timeEnd,
          status: filter.status,
        })
      );
    } else {
      dispatch(
        fetchVouchers({
          limit: rowsPerPage,
          page: totalPages,
          code: filter.code,
          timeStart: filter.timeStart,
          timeEnd: filter.timeEnd,
          status: filter.status,
        })
      );
    }
  }, [
    dispatch,
    page,
    rowsPerPage,
    totalPages,
    filter.code,
    filter.timeStart,
    filter.timeEnd,
    filter.status,
  ]);

  const columns: Column<Voucher>[] = [
    { key: "code", title: "Mã code" },
    { key: "discount_type", title: "Mức giảm (%)" },
    {
      key: "max_users",
      title: "Số lượng tối đa",
      render(row) {
        return <p>{row?.max_users || "Không giới hạn"}</p>;
      },
    },
    {
      key: "start_date",
      title: "Ngày bắt đầu",
      render(row) {
        return (
          <p>{row?.start_date ? row?.start_date.slice(0, 10) : "Không có"}</p>
        );
      },
    },
    {
      key: "end_date",
      title: "Ngày kết thúc",
      render(row) {
        return <p>{row?.end_date ? row?.end_date.slice(0, 10) : "Không có"}</p>;
      },
    },
    {
      key: "is_active",
      title: "Trạng thái",
      render(row) {
        return (
          <Status
            title={!row.is_active ? "Ngưng hoạt động" : "Đang hoạt động"} // tên của status
            color={!row.is_active ? "error" : "success"} // màu của status
          />
        );
      },
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Sửa"
            onClick={() => handleOpenUpdate(row._id)}
            bgColor="warning"
          />
        </div>
      ),
    },
  ];

  const handleOpenUpdate = async (id: string) => {
    const voucher = data?.find((voucher) => voucher._id === id);
    if (!voucher) {
      toast.error("Voucher không tồn tại");
      return;
    }

    setVoucher(voucher);
    setOpenUpdateForm(true);
  };

  const handleCloseUpdate = () => {
    setVoucher(null);
    setOpenUpdateForm(false);
    // dispatch(fetchVouchers({ limit: 5, page: 1 }));
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {openUpdateForm && voucher && (
        <UpdateFormContainer voucher={voucher} closeForm={handleCloseUpdate} />
      )}

      {
        <Table
          column={columns}
          data={data}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
      }
      {total >= rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
    </>
  );
};

export default VoucherList;
