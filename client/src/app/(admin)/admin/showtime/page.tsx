"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { Screening } from "@/interfaces/screening.interface";
import * as ScreeningService from "@/services/screening.service";

const AdminScreening = () => {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenings = async () => {
      setLoading(true);
      try {
        const res = await ScreeningService.getScreeningList("?_limit=5");
        setScreenings(res?.data || []);
      } catch (error) {
        setError("Không thể tải danh sách suất chiếu.");
      } finally {
        setLoading(false);
      }
    };

    fetchScreenings();
  }, []);

  const handleEdit = (id: string | number) => {
    alert(`Sửa suất chiếu có ID: ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Xoá suất chiếu có ID: ${id}`);
  };

  const columns: Column<Screening>[] = [
    { key: "movieName", title: "Mã phim" },
    { key: "roomCode", title: "Phòng chiếu" },
    { key: "time_start", title: "Giờ bắt đầu" },
    { key: "time_end", title: "Giờ kết thúc" },
    {
      key: "date",
      title: "Ngày chiếu",
      render: (row) =>
        new Date(row.date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    { key: "status", title: "Trạng thái" },
    { key: "showtype", title: "Loại chiếu" },
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
      <HeadingCard title="Quản lý lịch chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table column={columns} data={screenings} />
      )}
    </div>
  );
};

export default AdminScreening;
