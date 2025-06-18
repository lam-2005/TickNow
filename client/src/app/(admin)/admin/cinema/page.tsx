"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { getCinemaList } from "@/services/cinema.service";
import { Cinema } from "@/interfaces/cinema.interface";

const AdminCinema = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCinemaList();
        console.log("Dữ liệu rạp:", res); 
        setCinemas(res || []);
      } catch (err) {
        console.error("Lỗi khi fetch cinema:", err);
        setError("Không thể tải danh sách rạp. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const handleEdit = (id: string | number) => {
    alert(`Edit cinema ID ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Delete cinema ID ${id}`);
  };

  const columns: Column<Cinema>[] = [
    {
      key: "name",
      title: "Tên rạp",
    },
    {
      key: "location",
      title: "Địa chỉ",
      render: (row: Cinema) =>
        row.location?.deatil_location || "Chưa có địa chỉ",
    },
    {
      key: "image",
      title: "Hình ảnh",
      render: (row: Cinema) =>
        row.image ? (
          <Image
            src={row.image}
            alt={`Logo của ${row.name}`}
            width={80}
            height={50}
            className="rounded border border-gray-200 object-cover shadow-sm"
          />
        ) : (
          <span>Không có ảnh</span>
        ),
    },
    {
      title: "Thao tác",
      render: (row: Cinema) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEdit(row._id)}
          >
            Sửa
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row._id)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Rạp Chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <Table column={columns} data={cinemas} />
      )}
    </div>
  );
};

export default AdminCinema;
