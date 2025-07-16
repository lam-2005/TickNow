"use client";
import { UserType } from "@/interfaces/user.interface";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import ChangePasswordPopup from "../Popup/ChangePasswordPopup";
import { updateUserAPI } from "@/services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/contexts/useAuth";
export type DataEditProfileReq = {
  name?: string;
  phone?: string;
  year?: string | number;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;

  retypePassword?: string;
};
const ProfileInfo = ({ info, token }: { info: UserType; token: string }) => {
  const { setUser } = useAuth();
  const [infoUser, setInfoUser] = useState(info);
  const date = new Date(infoUser?.year);
  const formattedDateData = date.toISOString().split("T")[0];
  const formattedDateDisplay = date.toLocaleDateString("vi-vn", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const focusRef = useRef<HTMLInputElement>(null);
  const { touched, touchedPhone, touchedFullName, touchedDateOfBirth } =
    useTouched();
  const [editProfile, setEditProfile] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [formdata, setFormdata] = useState<DataEditProfileReq>({
    name: info.name || "",
    phone: info?.phone || "",
    year: formattedDateData || "",
  });
  const errors = validateForm({
    name: formdata.name,
    phone: formdata.phone,
    year: formdata.year?.toString(),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (editProfile) {
      focusRef.current?.focus();
    }
  }, [editProfile]);
  const handleEditProfile = async () => {
    try {
      await updateUserAPI(info._id, formdata);
      toast.success("Chỉnh sửa thành công");
      setEditProfile(false);

      localStorage.setItem("user", JSON.stringify(formdata?.name) || "");
      const newName = localStorage.getItem("user") || "";
      setUser({ name: JSON.parse(newName), token: token });
      setInfoUser({
        ...infoUser,
        name: formdata.name || "",
        phone: formdata.phone || "",
        year: formdata.year || "",
      });
    } catch (error) {
      toast.error(`Chỉnh sửa thất bại ${error}`);
      console.error(error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-[repeat(2,minmax(0,360px))] gap-x-10 gap-y-5">
        <div className="space-y-2.5">
          <span className="block">Họ và tên</span>
          {editProfile ? (
            <>
              <input
                onBlur={touchedFullName}
                ref={focusRef}
                className={`max-w-[360px] w-full border px-5 py-2.5 focus:border-foreground outline-none transition-all ${
                  touched.name && errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-stone-500 focus:border-foreground"
                }`}
                name="name"
                type="text"
                placeholder="Nhập họ và tên"
                value={formdata.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.name}
                </p>
              )}
            </>
          ) : (
            <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
              {infoUser?.name}
            </div>
          )}
        </div>
        <div className="space-y-2.5">
          <span className="block">Email</span>
          <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
            {infoUser?.email}
          </div>
        </div>
        <div className="space-y-2.5">
          <span className="block">Số điện thoại</span>
          {editProfile ? (
            <>
              <input
                onBlur={touchedPhone}
                className={`max-w-[360px] w-full border px-5 py-2.5 focus:border-foreground outline-none transition-all ${
                  touched.phone && errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-stone-500 focus:border-foreground"
                }`}
                name="phone"
                type="text"
                placeholder="Nhập số điện thoại"
                value={formdata.phone}
                onChange={handleChange}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.phone}
                </p>
              )}
            </>
          ) : (
            <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
              {infoUser?.phone || "Chưa có số điện thoại"}
            </div>
          )}
        </div>
        <div className="space-y-2.5">
          <span className="block">Năm sinh</span>
          {editProfile ? (
            <>
              <input
                onBlur={touchedDateOfBirth}
                className={`max-w-[360px] w-fit border border-stone-500 px-5 py-2.5 focus:border-foreground outline-none transition-all bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                  touched.year && errors.year
                    ? "border-red-500! focus:border-red-500"
                    : "border-stone-500 focus:border-foreground"
                }`}
                name="year"
                type="date"
                value={formdata.year}
                onChange={handleChange}
              />
              {touched.year && errors.year && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.year}
                </p>
              )}
            </>
          ) : (
            <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
              {formattedDateDisplay}
            </div>
          )}
        </div>
        {editPass && (
          <ChangePasswordPopup info={info} onClose={() => setEditPass(false)} />
        )}
      </div>
      <div className="flex gap-5 mt-6">
        {!editProfile && (
          <Button
            onClick={() => setEditPass(true)}
            title="Đổi mật khẩu"
            className="[&_span]:text-sm bg-transparent border-1 border-foreground text-foreground before:bg-primary [&_span]:text-foreground hover:[&_span]:text-white hover:border-primary"
          />
        )}
        {editProfile ? (
          <>
            <Button
              title="Lưu thay đổi"
              className="[&_span]:text-sm disabled:brightness-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={errors.name || errors.phone ? true : false}
              onClick={handleEditProfile}
            />
            <Button
              title="Hủy"
              className="[&_span]:text-sm bg-transparent border-1 border-foreground text-foreground before:bg-primary [&_span]:text-foreground hover:[&_span]:text-white hover:border-primary"
              onClick={() => setEditProfile(false)}
            />
          </>
        ) : (
          <Button
            title="Chỉnh sửa thông tin"
            className="[&_span]:text-sm"
            onClick={() => setEditProfile(true)}
          />
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
