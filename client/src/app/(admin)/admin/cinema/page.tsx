"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { Cinema } from "@/interfaces/cinema.interface";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemas, addCinema, updateCinema } from "@/utils/redux/slices/cinemaSlice";
import { cinemaDataSelector, cinemaStatusSelector, cinemaErrorSelector, cinemaTotalSelector } from "@/utils/redux/selectors/selectorCinema";
import { fetchLocations } from "@/utils/redux/slices/locationSlice";
import { locationDataSelector } from "@/utils/redux/selectors/selectorLocation";

const AdminCinema = () => {
  const dispatch = useDispatch();
  const cinemaData = useSelector(cinemaDataSelector);
  const cinemaStatusApi = useSelector(cinemaStatusSelector);
  const cinemaError = useSelector(cinemaErrorSelector);
  const cinemaTotal = useSelector(cinemaTotalSelector);
  const locationData = useSelector(locationDataSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<Record<string, unknown> | null>(null);
  
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCinemas({rowsPerPage, currentPage}));
  }, [rowsPerPage, currentPage, dispatch]);

  const handleAdd = async (data: Record<string, unknown>) => {
    const localtion = locationData.find((loc: any) => loc._id === data.location);
    if (!localtion) {
      alert("Địa chỉ không hợp lệ");
      return;
    }

    const parseData = {
      name: data.name,
      image: data.file instanceof File ? URL.createObjectURL(data.file) : data.file,
      location: {
        deatil_location: localtion.name,
        id_location: localtion._id,
      },
      status: data.status,
    };

    try {
      await dispatch(addCinema({ formData: parseData })).unwrap();
      alert("Thêm rạp thành công!");
      dispatch(fetchCinemas({rowsPerPage, currentPage}));
    } catch (error: any) {
      alert(`❌ Thất bại: ${error.message}`);
    }
  }

  const onOpenEdit = (id: string | number) => {
    const cinema = cinemaData.find((c) => c._id === id);
    if (!cinema) {
      alert("Voucher không tìm thấy");
      return;
    }

    setSelectedCinema(cinema);
    setIsEditOpen(true);
  };

  const handleEdit = async (data: Record<string, unknown>) => {
    const localtion = locationData.find((loc: any) => loc._id === data.location);
    if (!localtion) {
      alert("Địa chỉ không hợp lệ");
      return;
    }

    const parseData = {
      name: data.name,
      image: data.file instanceof File ? URL.createObjectURL(data.file) : data.file,
      location: {
        deatil_location: localtion.name,
        id_location: localtion._id,
      },
      status: data.status,
      id: data._id,
    };

    try {
      await dispatch(updateCinema({ formData: parseData })).unwrap();
      dispatch(fetchCinemas({rowsPerPage, currentPage}));
    } catch (error: any) {
      alert(`❌ Thất bại: ${error.message}`);
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
        row?.image ? (
          <div>TODO</div>
          // <Image
          //   src={row.image}
          //   alt={`Ảnh ${row.name}`}
          //   width={80}
          //   height={50}
          //   className="rounded border object-cover"
          // />
        ) : (
          <span>Không có ảnh</span>
        ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (row) => row?.status ? "Hoạt động" : "Ngừng hoạt động",
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton label="Sửa" onClick={onOpenEdit} bgColor="bg-yellow-500" id={row._id} />
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

      {cinemaStatusApi == 'loading' && <p className="text-center">Đang tải dữ liệu...</p>}
      {!cinemaStatusApi && <p className="text-primary text-center">{cinemaError}</p> }

      {cinemaData && 
        <>
          <Table column={columns} data={cinemaData} />
          <Pagination
            currentPage={currentPage}
            total={cinemaTotal}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </>
      }

      <AddForm<Record<string, unknown>>
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        fields={[
          { label: "Tên rạp", key: "name", required: true },
          { label: "Hình ảnh", key: "file", type: "file", required: true },
          {
            label: "Địa chỉ chi tiết",
            key: "location",
            type: "select",
            required: true,
            options: locationData?.map((location: any) => ({
              label: location.name,
              value: location._id,
            })) || [],
          },
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
        ]}
        onSubmit={handleAdd}
      />

      <PopupUpdateForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={selectedCinema as Record<string, unknown>}
        fields={[
          { label: "Tên rạp", key: "name" },
          { label: "Hình ảnh", key: "file", type: "file" },
          {
            label: "Địa chỉ chi tiết",
            key: "location",
            type: "select",
            options: locationData?.map((location: any) => ({
              label: location.name,
              value: location._id,
            })) || [],
          },
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            options: [
              { label: "Hoạt Động", value: "1" },
              { label: "Ngừng Hoạt Động", value: "0" },
            ],
          },
        ]}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default AdminCinema;
