"use client";

import React, { useState } from "react";
import HeadingCard from "../HeadingCard/HeadingCard";
import { DataEditProfileReq } from "@/components/ProfilePage/ProfileInfo";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { updateUserAPI } from "@/services/user.service";
import { toast } from "react-toastify";
import { UserType } from "@/interfaces/user.interface";
const EditPassword = ({ Info }: { Info: UserType }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [pending, setPending] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [formdata, setFormdata] = useState<DataEditProfileReq>({
    password: "",
    confirmPassword: "",
    newPassword: "",
  });
  const {
    touched,
    touchedPassword,
    touchedConfirmPassword,
    touchedNewPassword,
  } = useTouched();

  const errors = validateForm({
    password: formdata.password,
    confirmPassword: formdata.confirmPassword,
    newPassword: formdata.newPassword,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditPass = async () => {
    setPending(true);
    if (
      !formdata.password ||
      !formdata.newPassword ||
      !formdata.confirmPassword
    ) {
      toast.warning("Vui lòng nhập đầu đủ thông tin!");
      return;
    }
    try {
      await updateUserAPI(Info._id, {
        retypePassword: formdata.password,
        password: formdata.newPassword,
      });
      toast.success("Đổi mật khẩu thành công");
      setFormdata({
        password: "",
        confirmPassword: "",
        newPassword: "",
      });
      touched.password = false;
      touched.newPassword = false;
      touched.confirmPassword = false;
    } catch (error) {
      toast.error(`Đổi mật khẩu thất bại: ${error}`);
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  if (formdata.confirmPassword !== formdata.newPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  } else {
    errors.confirmPassword = "";
  }
  return (
    <div className="flex-column gap-5">
      <div>
        <HeadingCard title="Đổi mật khẩu" />
        <div className="space-y-2.5 mt-4">
          <div className="flex text-lg items-start">
            <span className="font-bold flex-2/10">Mật khẩu hiện tại:</span>
            <div className="relative flex-column gap-2 w-full ">
              <div className="relative w-full">
                <input
                  onBlur={touchedPassword}
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className={`border peer w-full border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-primary  ${
                    touched.password && errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <span
                  className={`absolute peer-focus/input:block  right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                    formdata.password ? "block" : "hidden"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>{" "}
              </div>
              {touched.password && errors.password && (
                <p className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm w-fit">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="flex text-lg items-start">
            <span className="font-bold flex-2/10">Mật khẩu mới:</span>
            <div className="relative flex-column gap-2 w-full">
              <div className="relative w-full">
                <input
                  onBlur={touchedNewPassword}
                  name="newPassword"
                  value={formdata.newPassword}
                  onChange={handleChange}
                  type={showNewPassword ? "text" : "password"}
                  className={`border w-full border-gray-300 rounded-md p-2  mt-1 outline-none focus:border-primary ${
                    touched.password && errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                  placeholder="Nhập mật khẩu mới"
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
          </div>
          <div className="flex text-lg items-start">
            <span className="font-bold flex-2/10">Xác nhận mật khẩu mới:</span>
            <div className="relative flex-column gap-2 w-full">
              <div className="relative w-full ">
                <input
                  onBlur={touchedConfirmPassword}
                  name="confirmPassword"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  className={`border w-full border-gray-300 rounded-md p-2  mt-1 outline-none focus:border-primary ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                  placeholder="Xác nhận mật khẩu mới"
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
          </div>
        </div>
      </div>
      <button
        disabled={
          errors.password ||
          errors.newPassword ||
          errors.confirmPassword ||
          !formdata.password ||
          !formdata.confirmPassword ||
          !formdata.newPassword ||
          pending
            ? true
            : false
        }
        className="btn self-start disabled:brightness-40 disabled:cursor-not-allowed"
        onClick={handleEditPass}
      >
        {pending ? "Đang xử lí..." : "Xác nhận"}
      </button>
    </div>
  );
};

export default EditPassword;
