"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { getCinemaList } from "@/services/cinema.service";
import { Cinema } from "@/interfaces/cinema.interface";

import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";
import ActionButton from "@/admin_components/Button/ButtonActions";

const uploadToFirebase = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      resolve(mockUrl);
    }, 1000);
  });
};

const AdminCinema = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await getCinemaList();
        setCinemas(res.cinema || []);
      } catch (err) {
        console.error("Lỗi khi fetch cinema:", err);
        setError("Không thể tải danh sách rạp.");
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const handleEdit = (id: string | number) => {
    const data = cinemas.find((c) => c._id === id);
    if (data) {
      setSelectedCinema({
        name: data.name,
        location: data.location?.deatil_location || "",
        image: data.image || "",
      });
      setIsEditOpen(true);
    }
  };

  const handleDelete = (id: string | number) => {
    alert(`Xóa rạp ID: ${id}`);
  };

  const columns: Column<Cinema>[] = [
    { key: "name", title: "Tên rạp" },
    {
      key: "location",
      title: "Địa chỉ",
      render: (row) => row.location?.deatil_location || "Chưa có địa chỉ",
    },
    {
      key: "image",
      title: "Hình ảnh",
      render: (row) =>
        row.image ? (
          <Image
            src={row.image}
            alt={`Ảnh ${row.name}`}
            width={80}
            height={50}
            className="rounded border object-cover"
          />
        ) : (
          <span>Không có ảnh</span>
        ),
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton label="Sửa" onClick={handleEdit} bgColor="bg-yellow-500" id={row._id} />
          <ActionButton label="Xoá" onClick={handleDelete} bgColor="bg-red-500" id={row._id} />
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Rạp Chiếu">
        <AddBtn onClick={() => setShowAddPopup(true)} />
      </HeadingCard>

      <OptionTable />

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : (
        <Table column={columns} data={cinemas} />
      )}
      <AddForm<Record<string, unknown>>
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        fields={[
          { label: "Tên rạp", key: "name", required: true },
          { label: "Hình ảnh", key: "image", required: true },
          { label: "Địa chỉ chi tiết", key: "location", required: true },
        ]}
        onSubmit={async (data) => {
          try {
            let imageUrl = data.image;
            if (data.image instanceof File) {
              imageUrl = await uploadToFirebase(data.image);
            }
            const payload = {
              name: data.name,
              image: imageUrl,
              location: {
                deatil_location: data.location,
              },
            };
            console.log("Thêm rạp mới:", payload);
            alert("Thêm thành công!");
            setShowAddPopup(false);
          } catch (err) {
            console.error("Thêm thất bại:", err);
            alert("Thêm thất bại!");
          }
        }}
      />
      <PopupUpdateForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={selectedCinema as Record<string, unknown>}
        fields={[
          { label: "Tên rạp", key: "name" },
          { label: "Hình ảnh", key: "image" },
          { label: "Địa chỉ chi tiết", key: "location" },
        ]}
        onSubmit={async (data) => {
          try {
            let imageUrl = data.image;
            if (data.image instanceof File) {
              imageUrl = await uploadToFirebase(data.image);
            }
            const payload = {
              name: data.name,
              image: imageUrl,
              location: {
                deatil_location: data.location,
              },
            };
            console.log("Cập nhật rạp:", payload);
            alert("Cập nhật thành công!");
            setIsEditOpen(false);
          } catch (err) {
            console.error("Lỗi cập nhật:", err);
            alert("Cập nhật thất bại!");
          }
        }}
      />
    </div>
  );
};

export default AdminCinema;
