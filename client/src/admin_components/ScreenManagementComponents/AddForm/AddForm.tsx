"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchScreen,addScreen, updateScreen } from "@/utils/redux/slices/screenSlice";
import { toast } from "react-toastify";
import InputGroup from "./InputGroup";
import { ScreenReq } from "@/interfaces/screening.interface";

const AddForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<ScreenReq>({
    id_room: "",
    id_movie: "",
    time_start: "",
    time_end: "",
    date: "", 
    showtype: "",
    roomCode: "",
    movieName: "", 
    status: true, // Mặc định là active
    role: false, // Mặc định là user
    
  });

  const handleAddUser = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !formData.id_room ||
    !formData.id_movie ||
    !formData.time_start ||
    !formData.time_end ||
    !formData.date ||
    !formData.showtype||
    !formData.roomCode ||
    !formData.movieName
  ) {
    toast.warning("Vui lòng nhập đầy đủ thông tin bắt buộc!");
    return;
  }

  const confirmAdd = confirm("Bạn có muốn thêm Suất chiếu mới?");
      if (!confirmAdd) return;

      try {
        await dispatch(
          addScreen({
            ...formData,
            status: Boolean(formData.status),
            role: Boolean(formData.role),
          })
        ).unwrap();

        await dispatch(fetchScreen({ page: 1, limit: 5 }));
        toast.success("Thêm Suất chiếu thành công!");

        // Reset
        setFormData({
          id_room: "",
          id_movie: "",
          time_start: "",
          time_end: "",
          date: "", 
          showtype: "",
          roomCode: "",
          movieName: "",
          status: true,
          role: false,
        });
      } catch (err) {
        console.error("Lỗi thêm Suất chiếu:", err);
        toast.error("Thêm Suất chiếu thất bại!");
      }
    };

  console.log(formData);
  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex justify-end p-5 w-full bg-green rounded-2xl">
        <button className="btn" onClick={handleAddUser}>
          Thêm Suất chiếu
        </button>
      </div>
    </>
  );
};

export default AddForm;
