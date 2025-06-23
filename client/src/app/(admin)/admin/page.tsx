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

const Vouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const fetchVoucher = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await voucherService.getVoucher(`?limit=${rowsPerPage}&page=${page}`);
      console.log("Dữ liệu từ API:", res?.data.voucher);
      setVouchers(res?.data.voucher || []);
      setTotalItems(res?.data.pagination?.total || 0);
      setCurrentPage(res?.data.pagination?.page || 1);
    } catch (error) {
      console.error("Lỗi khi fetch voucher: ", error);
      setError("Không thể tải danh sách vouchers. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage]);

  useEffect(() => {
    fetchVoucher(currentPage);
  }, [fetchVoucher, currentPage]);

  const handleEdit = (id: string | number) => {
    alert(`Sửa voucher ID: ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Xóa voucher ID: ${id}`);
  };

  const col: Column<Voucher>[] = [
    { key: "code", title: "Mã code" },
    { key: "discount_type", title: "Mức giảm giá (%)" },
    { key: "max_users", title: "Số lượng đã dùng" },
    { key: "start_date", title: "Ngày bắt đầu" },
    { key: "end_date", title: "Ngày kết thúc" },
    {
      key: "is_active",
      title: "Trạng Thái",
      render: (row: Voucher) =>
        row.is_active === 1 || row.is_active === "1"
          ? "Hoạt Động"
          : "Ngừng Hoạt Động",
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex space-x-2">
          <ActionButton
            label="Sửa"
            onClick={handleEdit}
            id={row.id}
            bgColor="bg-yellow-500"
          />
          <ActionButton
            label="Xóa"
            onClick={handleDelete}
            id={row.id}
            bgColor="bg-red-500"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <>
          <Table column={col} data={vouchers.map(v => ({ ...v, id: v.id }))} />
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
    </div>
  );
};

export default Vouchers;
