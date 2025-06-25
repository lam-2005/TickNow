"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { Screening } from "@/interfaces/screening.interface";
import * as ScreeningService from "@/services/screening.service";
import AddForm from "@/admin_components/Popup/AddPopup";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import ActionButton from "@/admin_components/Button/ButtonActions";

const AdminScreening = () => {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddPopup, setShowAddPopup] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<Screening | null>(null);
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
    // alert(`Sửa suất chiếu có ID: ${id}`);
    const screen = screenings.find((u) => u._id === id);
    if (screen) {
      setSelectedScreen(screen);
      setIsEditOpen(true);
    }
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
        /</div>>
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
      ),
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản lý lịch chiếu">
        <AddBtn />
        <AddBtn onClick={() => setShowAddPopup(true)} />
      </HeadingCard>
      <OptionTable />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table column={columns} data={screenings} />
      )}

      <AddForm <Record<string,unknown>>
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        fields={[
          {label:"Tên phim", key: "movieName", required: true },
          {label:"Phòng chiếu", key: "roomCode", required: true },
          {label:"Giờ bắt đầu", key: "time_start", type:"date",  required: true },
          {label:"Giờ kết thúc", key: "time_end", type:"date",  required: true },
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            required: true,
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
          {
            label: "Loại chiếu",
            key: "showtype",
            type: "select",
            required: true,
            options: [
              { label: "Phụ đề", value: "2" },
              { label: "Thuyết minh", value: "1" },
              { label: "Lồng tiếng", value: "0" },
            ],
          },
        ]}
        onSubmit={async () => {
          try {
            // await userService.createUser(data);
            alert("Thêm người dùng thành công!");
            setShowAddPopup(false);
            // fetchUsers(currentPage);
          } catch (err) {
            alert("Thêm thất bại!");
            console.error(err);
          }
        }}
      />

      <PopupUpdateForm
      isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={selectedScreen as unknown as Record<string, unknown>}
        fields={[
          {label:"Tên phim", key: "movieName", },
          {label:"Phòng chiếu", key: "roomCode", },
          {label:"Giờ bắt đầu", key: "time_start", type:"date",  },
          {label:"Giờ kết thúc", key: "time_end", type:"date",  },
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
          {
            label: "Loại chiếu",
            key: "showtype",
            type: "select",
            
            options: [
              { label: "Phụ đề", value: "2" },
              { label: "Thuyết minh", value: "1" },
              { label: "Lồng tiếng", value: "0" },
            ],
          },
        ]}

              onSubmit={async () => {
          try {
            // await userService.createUser(data);
            alert("Thêm người dùng thành công!");
            setIsEditOpen(false);
            // fetchUsers(currentPage);
          } catch (err) {
            alert("Thêm thất bại!");
            console.error(err);
          }
        }}
      />

    </div>
  );
};

export default AdminScreening;
