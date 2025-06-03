"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table from "@/admin_components/Table/Table";
import React from "react";
import Image from "next/image";

interface Cinema {
  id: number;
  name: string;
  image: string;
  detail_location: string;
  id_location: number;
}

const cinemas: Cinema[] = [
  {
    id: 1,
    name: "TickNow Quang Trung",
    image: "/logo/logo.png",
    detail_location: "Gò Vấp, TP.HCM",
    id_location: 1,
  },
  {
    id: 2,
    name: "TickNow Quận 1",
    image: "/logo/logo.png",
    detail_location: "116 Nguyễn Du, Quận 1, TP.HCM",
    id_location: 2,
  },
  {
    id: 3,
    name: "TickNow Quận 12",
    image: "/logo/logo.png",
    detail_location: "310 Tô Ký, Quận 12, TP.HCM",
    id_location: 3,
  },
  {
    id: 4,
    name: "TickNow Quận 3",
    image: "/logo/logo.png",
    detail_location: "75 Trần Quốc Thảo, Quận 3, TP.HCM",
    id_location: 4,
  },
  {
    id: 5,
    name: "TickNow Bình Dương",
    image: "/logo/logo.png",
    detail_location: "Q. Thủ Dầu Một, Bình Dương",
    id_location: 5,
  },
];

const col = [
  { key: "name", title: "Tên rạp" },
  { key: "detail_location", title: "Địa chỉ" },
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
    key: "actions",
    title: "Thao tác",
    render(row: Cinema) {
      return (
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
  return (
    <div className="card">
      <HeadingCard title="Quản lý rạp chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={cinemas} />
    </div>
  );
};

export default AdminCinema;
