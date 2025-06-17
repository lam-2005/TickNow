"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { ReviewType } from "@/interfaces/rating.interface";
import * as rateService from "@/services/rate.service";
import ActionButton from "@/admin_components/Button/ButtonActions";

const RatingManagement = () => {
  const [ratings, setRatings] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await rateService.getRateList("");
        console.log("Dữ liệu từ API:", res?.data);
        setRatings(res?.data || []);
      } catch (error) {
        console.error("Lỗi khi fetch ratings:", error);
        setError("Không thể tải danh sách đánh giá. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  const handleEdit = (id: string | number) => {
    alert(`Edit ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Delete ${id}`);
  };

  const col: Column<ReviewType>[] = [
    { key: "movieName", title: "Tên Phim" },
    { key: "ticketCode", title: "Mã Vé" },
    { key: "score", title: "Điểm" },
    {
      key: "date",
      title: "Ngày Đánh Giá",
      render: (row: ReviewType) => {
        const date = new Date(row.date);
        return !isNaN(date.getTime()) ? date.toLocaleDateString("vi-VN") : "Chưa Xác Định";
      },
    },
    { key: "comment", title: "Bình Luận" },
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
      <HeadingCard title="Quản Lý Đánh Giá">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <Table column={col} data={ratings} />
      )}
    </div>
  );
};

export default RatingManagement;