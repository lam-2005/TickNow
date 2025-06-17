"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import Image from "next/image";
import { Cinema } from "@/interfaces/cinema.interface";
import * as CinemaService from "@/services/cinema.service";

const AdminCinema = () => {
  const [cinemas, setCinemas] = useState<(Cinema & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      setLoading(true);
      try {
        const res = await CinemaService.getCinemaList();

        // ⚠️ Sửa ở đây nếu API trả về res.data là object chứa mảng
        const rawCinemas = Array.isArray(res) ? res : res.data;

        const dataWithId = rawCinemas.map((cinema: Cinema) => ({
          ...cinema,
          id: cinema._id,
        }));
        setCinemas(dataWithId);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách rạp chiếu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const handleEdit = (id: string) => {
    alert(`Sửa rạp có ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`Xóa rạp có ID: ${id}`);
  };

const columns: Column<Cinema & { id: string }>[] = [
  { key: "name", title: "Tên rạp" },
  {
    title: "Địa chỉ",
    render: (row) => row.location.deatil_location, // sửa đúng chính tả
  },
  {
    key: "image",
    title: "Hình ảnh",
    render: (row) => (
      <Image
        src={row.image || "/default.jpg"}
        alt={`Logo của ${row.name}`}
        width={80}
        height={50}
        className="rounded border border-gray-200 object-cover shadow-sm"
      />
    ),
  },
  {
    title: "Thao tác",
    render: (row) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(row.id)}
          className="text-blue-500 hover:underline"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(row.id)}
          className="text-red-500 hover:underline"
        >
          Xóa
        </button>
      </div>
    ),
  },
];


  return (
    <div className="card">
      <HeadingCard title="Quản lý rạp chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table column={columns} data={cinemas} />
      )}
    </div>
  );
};

export default AdminCinema;
