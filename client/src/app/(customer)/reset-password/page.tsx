"use client";
import Button from "@/components/Button/Button";
import { DataEditProfileReq } from "@/components/ProfilePage/ProfileInfo";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const ReserPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { touched, touchedConfirmPassword, touchedNewPassword } = useTouched();
  const [formdata, setFormdata] = useState<DataEditProfileReq>({
    confirmPassword: "",
    newPassword: "",
  });
  const errors = validateForm({
    confirmPassword: formdata.confirmPassword,
    newPassword: formdata.newPassword,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  if (formdata.confirmPassword !== formdata.newPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  } else {
    errors.confirmPassword = "";
  }
  return (
    <div className="max-w-[400px] m-auto mt-15">
      <h2 className="text-center mb-5">Đặt mật khẩu mới</h2>
      <form className="space-y-6 ">
        <div className="flex-column gap-2">
          <div className="relative">
            <input
              onBlur={touchedNewPassword}
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formdata.newPassword}
              onChange={handleChange}
              placeholder="Mật khẩu mới"
              className={`w-full px-4 py-3 bg-[#1c1c1c] border border-[#3f3f3f] text-sm placeholder-gray-400 outline-none focus:border-foreground transition ${
                touched.newPassword && errors.newPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#3f3f3f] focus:border-foreground"
              }`}
            />
            <span
              className={`absolute peer-focus/input:block  right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                formdata.newPassword ? "block" : "hidden"
              }`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>{" "}
          </div>
          {touched.newPassword && errors.newPassword && (
            <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
              {errors.newPassword}
            </p>
          )}
        </div>

        <div className="flex-column gap-2">
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formdata.confirmPassword}
              onChange={handleChange}
              onBlur={touchedConfirmPassword}
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              className={`w-full px-4 py-3 bg-[#1c1c1c] border border-[#3f3f3f] text-sm placeholder-gray-400 outline-none focus:border-foreground transition ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#3f3f3f] focus:border-foreground"
              }`}
            />
            <span
              className={`absolute peer-focus/input:block  right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                formdata.confirmPassword ? "block" : "hidden"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>{" "}
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <Button
          disabled={errors.confirmPassword || errors.newPassword ? true : false}
          title="Xác nhận"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default ReserPassword;
