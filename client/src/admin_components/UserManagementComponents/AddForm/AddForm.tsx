"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchUsers, addUser } from "@/utils/redux/slices/userSlice";
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
    status: true,
    role: false,
  });

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const pattern = /^0\d{9}$/;
    return pattern.test(phone);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, year, password, confirmPassword } = formData;

    if (!name || !email || !phone || !year || !password || !confirmPassword) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!validateEmail(email)) {
      toast.warning("Email không đúng định dạng!");
      return;
    }

    if (!validatePhone(phone)) {
      toast.warning("Số điện thoại phải bắt đầu bằng 0 và đủ 10 số!");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Mật khẩu xác nhận không khớp!");
      return;
    }

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
