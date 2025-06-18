"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Cinema } from "@/interfaces/cinema.interface";
import { getCinemaList } from "@/services/cinema.service";

const col: Column<Cinema>[] = [
  { key: "name", title: "Tên rạp" },
  {
    key: "location",
    title: "Địa chỉ",
    render(row: Cinema) {
      return <p>{row.location.deatil_location}</p>;
    },
  },
  {
    key: "image",
    title: "Hình ảnh",
    render(row: Cinema) {
      return (
        <Image
          src={row.image}
          alt={`Logo của ${row.name}`}
          width={80}
          height={50}
          className="rounded border border-gray-200 object-cover shadow-sm"
        />
      );
    },
  },
  {
    title: "Thao tác",
    render(row: Cinema) {
      return (
        <div className="flex space-x-2">
          <button
            // onClick={() => handleEdit(row._id)}
            className="text-blue-500 hover:underline"
          >
            Sửa
          </button>
          <button
            // onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:underline"
          >
            Xóa
          </button>
        </div>
      );
    },
  },
];

const handleEdit = (id: number) => {
  alert(`Edit cinema ID ${id}`);
};

const handleDelete = (id: number) => {
  alert(`Delete cinema ID ${id}`);
};

const AdminCinema = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Cinema[] | []>([]);

  const getCinema = async () => {
    try {
      const res = await getCinemaList();
      setData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCinema();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="card">
      <HeadingCard title="Quản lý rạp chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={data} />
    </div>
  );
};

export default AdminCinema;
