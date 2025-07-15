"use client";
import { DataEditProfileReq } from "@/components/ProfilePage/ProfileInfo";
import { useAuth } from "@/hooks/contexts/useAuth";
import useTouched from "@/hooks/useTouched";
import { UserType } from "@/interfaces/user.interface";
import { updateUserAPI } from "@/services/user.service";
import validateForm from "@/utils/validate";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const EditProfile = ({
  Info,
  tokenAdmin,
}: {
  Info: UserType;
  tokenAdmin: string;
}) => {
  const [infoAdmin, setInfoAdmin] = useState(Info);
  const { setAdmin } = useAuth();
  const { touched, touchedPhone, touchedFullName, touchedDateOfBirth } =
    useTouched();

  const date = new Date(infoAdmin?.year);
  const formattedDateData = date.toISOString().split("T")[0];
  const formattedDateDisplay = date.toLocaleDateString("vi-vn", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<DataEditProfileReq>({
    name: Info.name || "",
    phone: Info?.phone || "",
    year: formattedDateData || "",
  });
  const errors = validateForm({
    name: formData.name,
    phone: formData.phone,
    year: formData.year?.toString(),
  });
  const focusRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditing) {
      focusRef.current?.focus();
    }
  }, [isEditing]);
  console.log(Info);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditProfile = async () => {
    // console.log(formData);
    // setIsEditing(false)
    try {
      await updateUserAPI(Info._id, formData);
      toast.success("chỉnh sửa thành công");
      setIsEditing(false);

      localStorage.setItem("admin", JSON.stringify(formData?.name) || "");
      const newName = localStorage.getItem("admin") || "";
      setAdmin({ name: JSON.parse(newName), token: tokenAdmin });
      setInfoAdmin({
        ...infoAdmin,
        name: formData.name || "",
        phone: formData.phone || "",
        year: formData.year || "",
      });
    } catch (error) {
      toast.error("chỉnh sửa thất bại");
      console.error(error);
    }
  };

  return (
    <div className="flex-column gap-5">
      <div className="space-y-2.5">
        <div className="flex text-lg items-start">
          <span className="font-bold flex-2/10">Email:</span>
          <div className="flex-9/10">{infoAdmin?.email}</div>
        </div>
        <div className="flex text-lg items-start">
          <span className="font-bold flex-2/10">Họ và tên:</span>
          {isEditing ? (
            <div className="flex-column flex-9/10  gap-2">
              <input
                onBlur={touchedFullName}
                name="name"
                value={formData.name}
                onChange={handleChange}
                ref={focusRef}
                className={`border border-gray-300 rounded-md p-2  mt-1 outline-none focus:border-primary ${
                  touched.name && errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                }`}
                placeholder="Nhập họ và tên"
              />
              {touched.name && errors.name && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.name}
                </p>
              )}
            </div>
          ) : (
            <div className="flex-9/10">{infoAdmin?.name}</div>
          )}
        </div>

        <div className="flex text-lg items-center">
          <span className="font-bold flex-2/10">Số điện thoại:</span>
          {isEditing ? (
            <div className="flex-column flex-9/10  gap-2">
              <input
                onBlur={touchedPhone}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`border border-gray-300 rounded-md p-2  mt-1 outline-none focus:border-primary ${
                  touched.phone && errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                }`}
                placeholder="Nhập số điện thoại"
              />

              {touched.phone && errors.phone && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.phone}
                </p>
              )}
            </div>
          ) : (
            <div className="flex-9/10">{infoAdmin?.phone}</div>
          )}
        </div>
        <div className="flex text-lg items-center">
          <span className="font-bold flex-2/10">Ngày sinh:</span>
          {isEditing ? (
            <div className="flex-column flex-9/10  gap-2">
              <input
                onBlur={touchedDateOfBirth}
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`border border-gray-300 rounded-md p-2  mt-1  flex-9/10 outline-none focus:border-primary w-fit self-start ${
                  touched.year && errors.year
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-primary"
                }`}
                placeholder="Nhập ngày sinh"
                type="date"
              />
              {touched.year && errors.year && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.year}
                </p>
              )}
            </div>
          ) : (
            <div className="flex-9/10">{formattedDateDisplay}</div>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="flex gap-5 ">
          <button
            className="btn disabled:brightness-50 disabled:cursor-not-allowed"
            disabled={errors.name || errors.phone ? true : false}
            onClick={handleEditProfile}
          >
            Lưu thay đổi
          </button>
          <button
            className="btn  bg-error "
            onClick={() => setIsEditing(false)}
          >
            Hủy
          </button>
        </div>
      ) : (
        <button className="btn self-start " onClick={() => setIsEditing(true)}>
          Chỉnh sửa thông tin
        </button>
      )}
    </div>
  );
};

export default EditProfile;
