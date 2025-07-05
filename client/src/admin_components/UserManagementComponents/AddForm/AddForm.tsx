"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchUsers,addUser } from "@/utils/redux/slices/userSlice";
import { toast } from "react-toastify";
import InputGroup from "./InputGroup";
import { UserReq } from "@/interfaces/user.interface";

const AddForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<UserReq>({
    name: "",
    email: "",
    phone: "",
    year: "",
    password: "",
    confirmPassword: "",
    status: true, // Mặc định là active
    role: false, // Mặc định là user
  });

  const handleAddUser = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.year ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    toast.warning("Vui lòng nhập đầy đủ thông tin bắt buộc!");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.warning("Mật khẩu xác nhận không khớp!");
    return;
  }

  const confirmAdd = confirm("Bạn có muốn thêm người dùng mới?");
      if (!confirmAdd) return;

      try {
        await dispatch(
          addUser({
            ...formData,
            status: Boolean(formData.status),
            role: Boolean(formData.role),
          })
        ).unwrap();

        await dispatch(fetchUsers({ page: 1, limit: 5 }));
        toast.success("Thêm người dùng thành công!");

        // Reset
        setFormData({
          name: "",
          email: "",
          phone: "",
          year: "",
          password: "",
          confirmPassword: "",
          status: true,
          role: false,
        });
      } catch (err) {
        console.error("Lỗi thêm người dùng:", err);
        toast.error("Thêm người dùng thất bại!");
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
          Thêm Người Dùng
        </button>
      </div>
    </>
  );
};

export default AddForm;
