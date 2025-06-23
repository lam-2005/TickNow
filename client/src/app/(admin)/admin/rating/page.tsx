"use client";
import React, { useEffect, useState } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { ReviewType } from "@/interfaces/rating.interface";
import * as rateService from "@/services/rate.service";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";

const RatingManagement = () => {
  const [ratings, setRatings] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const limit = rowsPerPage;

  const fetchRatings = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await rateService.getRateList(`?limit=${limit}&page=${page}`);
      const data = res?.data;
      console.log("Dữ liệu từ API:", data);
      setRatings(data.rate || []);
      setTotalItems(data.pagination?.total || 0);
      setCurrentPage(data.pagination?.page || 1);
    } catch (err) {
      console.error("Lỗi khi fetch ratings:", err);
      setError("Không thể tải danh sách đánh giá. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings(currentPage);
  }, [currentPage, rowsPerPage]);

  const handleEdit = (id: string | number) => {
    alert(`Sửa ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Xóa ${id}`);
  };

  const col: Column<ReviewType>[] = [
    { key: "movieName", title: "Tên Phim" },
    { key: "userName", title: "Tên Người Dùng" },
    { key: "score", title: "Điểm" },
    {
      key: "date",
      title: "Ngày Đánh Giá",
      render: (row: ReviewType) => {
        const date = new Date(row.date);
        return !isNaN(date.getTime()) ? date.toLocaleDateString("vi-VN") : "Chưa Xác Định";
      },
    },
    {
      key: "comment",
      title: "Bình Luận",
      render: (row: ReviewType) => (
        <span className="line-clamp-2 block max-w-xs">{row.comment}</span>
      ),
    },
    {
      title: "Thao Tác",
      render(row: ReviewType) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Sửa"
              onClick={handleEdit}
              bgColor="bg-yellow-500"
              id={row._id}
            />
            <ActionButton
              label="Xóa"
              onClick={handleDelete}
              bgColor="bg-red-500"
              id={row._id}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Đánh Giá" />
      <OptionTable />

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <>
          <Table column={col} data={ratings} />
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

export default RatingManagement;
