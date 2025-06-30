"use client";
import React, { useEffect, useState, useCallback } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import * as voucherService from "@/services/vouchers.service";
import { Voucher } from "@/interfaces/vouchers.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const fetchVoucher = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await voucherService.getVoucher(`?limit=${rowsPerPage}&page=${page}`);
      setVouchers(res?.data.voucher || []);
      setTotalItems(res?.data.pagination?.total || 0);
      setCurrentPage(res?.data.pagination?.page || 1);
    } catch (error: unknown) {
      console.error("Lỗi khi fetch voucher:", error);
      setError("Không thể tải danh sách vouchers.");
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage]);

  useEffect(() => {
    fetchVoucher(currentPage);
  }, [fetchVoucher, currentPage]);

  const handleEdit = (id: string | number) => {
    const voucher = vouchers.find((v) => v._id === id);
    if (voucher) {
      setSelectedVoucher(voucher);
      setIsEditOpen(true);
    }
  };

  const handleDelete = (id: string | number) => {
    alert(`Xóa voucher ID: ${id}`);
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
            onClick={handleEdit}
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

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <>
          <Table column={columns} data={vouchers} />
          <Pagination
            currentPage={currentPage}
            total={totalItems}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </>
      )}

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
        onSubmit={async () => {
          try {
            alert("Thêm voucher thành công!");
            setIsAddOpen(false);
            fetchVoucher(currentPage);
          } catch (error: unknown) {
            if (error instanceof Error) {
              alert("Thêm thất bại: " + error.message);
              console.error(error);
            } else {
              alert("Thêm thất bại!");
              console.error("Lỗi không xác định:", error);
            }
          }
        }}
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
        onSubmit={async () => {
          try {
            alert("Cập nhật voucher thành công!");
            setIsEditOpen(false);
            fetchVoucher(currentPage);
          } catch (error: unknown) {
            if (error instanceof Error) {
              alert("Cập nhật thất bại: " + error.message);
              console.error(error);
            } else {
              alert("Cập nhật thất bại!");
              console.error("Lỗi không xác định:", error);
            }
          }
        }}
      />
    </div>
  );
};

export default Vouchers;
