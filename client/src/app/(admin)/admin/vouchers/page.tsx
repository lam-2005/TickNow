"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { Voucher } from "@/interfaces/vouchers.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchVouchers, addVoucher, updateVoucher } from "@/utils/redux/slices/voucherSlice";
import { voucherDataSelector, voucherStatusSelector, voucherErrorSelector, voucherTotalSelector } from "@/utils/redux/selectors/selectorVoucher";

const Vouchers = () => {
  const dispatch = useDispatch();
  const voucherData = useSelector(voucherDataSelector);
  const voucherStatusApi = useSelector(voucherStatusSelector);
  const voucherError = useSelector(voucherErrorSelector);
  const voucherTotal = useSelector(voucherTotalSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    dispatch(fetchVouchers({rowsPerPage, currentPage}));
  }, [rowsPerPage, currentPage, dispatch]);

  const handleAdd = async (data: Record<string, unknown>) => {
    const parseData = {
      ...data,
      start_date: parseDate(data.start_date as string),
      end_date: parseDate(data.end_date as string),
    }

    try {
      await dispatch(addVoucher({ formData: parseData })).unwrap();
      dispatch(fetchVouchers({rowsPerPage, currentPage}));
    } catch (error: any) {
      alert(`❌ Thất bại: ${error.message}`);
    }
  }

  const onOpenEdit = (id: string | number) => {
    const voucher = voucherData.find((v: Voucher) => v._id === id);
    if (!voucher) {
      alert("Voucher không tìm thấy");
      return;
    }

    setSelectedVoucher(voucher);
    setIsEditOpen(true);
  };

  const parseDate = (dateString: string): string => {
     const date = new Date(dateString);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const handleEdit = async (data: Record<string, unknown>) => {
    const parseData = {
      ...data,
      start_date: parseDate(data.start_date as string),
      end_date: parseDate(data.end_date as string),
      id: data._id,
    }

    try {
      await dispatch(updateVoucher({ formData: parseData })).unwrap();
      dispatch(fetchVouchers({rowsPerPage, currentPage}));
    } catch (error: any) {
      alert(`❌ Thất bại: ${error.message}`);
    }
  };

  const handleDelete = (data: Record<string, unknown>) => {
    console.log(data)
  };

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
            onClick={onOpenEdit}
            id={row._id}
            bgColor="bg-yellow-500"
          />
          <ActionButton
            label="Xóa"
            onClick={handleDelete}
            id={row._id}
            bgColor="bg-red-500"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddBtn onClick={() => setIsAddOpen(true)} />
      </HeadingCard>
      <OptionTable />

      {voucherStatusApi == 'loading' && <p className="text-center">Đang tải dữ liệu...</p>}
      {!voucherStatusApi && <p className="text-primary text-center">{voucherError}</p> }

      {voucherData && 
        <>
          <Table column={columns} data={voucherData} />
          <Pagination
            currentPage={currentPage}
            total={voucherTotal}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </>
      }

      {/* Popup Thêm */}
      <AddForm<Record<string, unknown>>
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        fields={[
          { label: "Mã code", key: "code", required: true },
          { label: "Mức giảm (%)", key: "discount_type", type: "number", required: true },
          { label: "Số lượng tối đa", key: "max_users", type: "number", required: true },
          { label: "Ngày bắt đầu", key: "start_date", type: "date", required: true },
          { label: "Ngày kết thúc", key: "end_date", type: "date", required: true },
          {
            label: "Trạng thái",
            key: "is_active",
            type: "select",
            required: true,
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
        ]}
        onSubmit={handleAdd}
      />

      {/* Popup Sửa */}
      <PopupUpdateForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={selectedVoucher as unknown as Record<string, unknown>}
        fields={[
          { label: "Mã code", key: "code" },
          { label: "Mức giảm (%)", key: "discount_type", type: "number" },
          { label: "Đã dùng", key: "user_count", type: "number" },
          { label: "Tối đa", key: "max_users", type: "number" },
          { label: "Ngày bắt đầu", key: "start_date", type: "date" },
          { label: "Ngày kết thúc", key: "end_date", type: "date" },
          {
            label: "Trạng thái",
            key: "is_active",
            type: "select",
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
        ]}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default Vouchers;
