"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import CinemaPopup from "@/admin_components/Popup/CinemaPopup";

import { getCinemaList } from "@/services/cinema.service";
import { Cinema } from "@/interfaces/cinema.interface";

// ✅ Hàm giả lập upload ảnh lên Firebase (bạn cần thay thế bằng Firebase thật)
const uploadToFirebase = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file); // chỉ demo, không dùng khi deploy thật
      resolve(mockUrl);
    }, 1000); // giả lập thời gian upload
  });
};

interface CinemaForm {
  name: string;
  location: string;
  image: string | File;
}

const AdminCinema = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<CinemaForm | null>(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await getCinemaList();
        console.log(res);

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

  const handleOpenAdd = () => {
    setIsEdit(false);
    setEditData(null);
    setPopupOpen(true);
  };

  const handleEdit = (id: string | number) => {
    const data = cinemas.find((c) => c._id === id);
    if (data) {
      setEditData({
        name: data.name,
        location: data.location?.deatil_location || "",
        image: data.image || "",
      });
      setIsEdit(true);
      setPopupOpen(true);
    }
  };

  const handleDelete = (id: string | number) => {
    alert(`Xóa rạp ID: ${id}`);
  };

  const handleSubmit = async (formData: CinemaForm) => {
    try {
      let imageUrl = formData.image;

      // Nếu người dùng chọn ảnh mới (dạng File), upload trước
      if (formData.image instanceof File) {
        imageUrl = await uploadToFirebase(formData.image);
      }

      const payload = {
        name: formData.name,
        location: formData.location,
        image: imageUrl,
      };

      if (isEdit) {
        console.log("Cập nhật rạp:", payload);
        // gọi API cập nhật tại đây
      } else {
        console.log("Thêm rạp mới:", payload);
        // gọi API thêm mới tại đây
      }

      setPopupOpen(false);
    } catch (err) {
      console.error("Lỗi khi xử lý submit:", err);
    }
  };

  const columns: Column<Cinema>[] = [
    { key: "name", title: "Tên rạp" },
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
            alt={`Logo ${row.name}`}
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
      render: (row: Cinema) => (
        <div className="flex gap-3">
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
        <AddBtn onClick={handleOpenAdd} />
      </HeadingCard>

      <OptionTable />

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Table column={columns} data={cinemas} />
      )}

      <CinemaPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={handleSubmit}
        title={isEdit ? "Sửa Rạp Chiếu" : "Thêm Rạp Chiếu Mới"}
        defaultValues={editData || undefined}
      />
    </div>
  );
};

export default AdminCinema;
