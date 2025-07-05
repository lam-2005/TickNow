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

type InitDataType = {
  vouchers: Voucher[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const VoucherList = ({
  initData,
}: {
    initData: Promise<InitDataType>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = use(initData);
  
  const isFirstLoad = useRef(true);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
//   // lay selector
  const { data, error, total, currentPage, loading, totalPages } = useSelector(dataVoucherSelector);
  // hook phan trang
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(initialData.currentPage);

  useEffect(() => {
    if (isFirstLoad.current) {
        dispatch(setInitialVouchers(initialData));
        isFirstLoad.current = false;
        return;
    }

    if (page <= totalPages) {
        dispatch(fetchVouchers({ limit: rowsPerPage, page: page }));
    } else {
        dispatch(fetchVouchers({ limit: rowsPerPage, page: totalPages }));
    }
  }, [dispatch, rowsPerPage, page, initialData, totalPages]);

  const columns: Column<Voucher>[] = [
    { key: "code", title: "Mã code" },
    { key: "discount_type", title: "Mức giảm (%)" },
    { key: "max_users", title: "Số lượng tối đa" },
    { key: "start_date", title: "Ngày bắt đầu" },
    { key: "end_date", title: "Ngày kết thúc" },
    {
      key: "is_active",
      title: "Trạng Thái",
      render: (row) =>
        row.is_active === 1 || row.is_active === "1" ? "Hoạt Động" : "Ngừng Hoạt Động",
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Sửa"
            onClick={() => handleOpenUpdate(row._id)}
            bgColor="bg-yellow-500"
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
    dispatch(fetchVouchers({ limit: 5, page: 1 }));
  }

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {openUpdateForm && voucher && (
        <UpdateFormContainer
          voucher={voucher}
          closeForm={handleCloseUpdate}
        />
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
