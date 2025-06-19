"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
// import { UserType } from "@/interfaces/user.interface";
import * as voucherService from "@/services/vouchers.service";
// import ActionButton from "@/admin_components/Button/ButtonActions";
// import Pagination from "@/admin_components/Pagination/Pagination";
import { Voucher } from "@/interfaces/vouchers.interface";
const Vouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoucher = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await voucherService.getVoucher("?_limit=5");
        console.log("Dữ liệu từ API:", res?.data);
        setVouchers(res?.data);
      } catch (error) {
        console.error("Lỗi khi fetch voucher: ", error);
        setError("Không thể tải danh sách vouchers. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchVoucher();
  }, []);

  const handleEdit = (id: string | number) => {
    alert(`Edit ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Delete ${id}`);
  };

  const col: Column<Voucher>[] = [
    { key: "code", title: "Mã code" },
    { key: "discount_type", title: "Mức giảm giá(%)" },
    { key: "max_users", title: "Số lượng đã dùng" },
    { key: "start_date", title: "Ngày bắt đầu" },
    { key: "end_date", title: "Ngày kết thúc" },
    {
      key: "is_active",
      title: "Trạng Thái",
      render: (row: Voucher) => (row.is_active === 1 || row.is_active === "1" ? "Hoạt Động" : "Ngừng Hoạt Động"),
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEdit(row.id)}
          >
            Sửa
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row.id)}
          >
            Xóa
          </button>
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
        <Table column={col} data={vouchers} />        
        {/* <Pagination /> */}
        </>
      )}
</div>
  );
};

export default Vouchers;