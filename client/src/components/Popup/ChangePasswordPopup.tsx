import React, { useState } from "react";
import Button from "../Button/Button";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import { DataEditProfileReq } from "../ProfilePage/ProfileInfo";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

interface Props {
  onClose: () => void;
}

const ChangePasswordPopup = ({ onClose }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    touched,
    touchedPassword,
    touchedConfirmPassword,
    touchedNewPassword,
  } = useTouched();
  const [formdata, setFormdata] = useState<DataEditProfileReq>({
    password: "",
    confirmPassword: "",
    newPassword: "",
  });
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-black/70 w-full h-full inset-0 relative z-51"
        onClick={onClose}
      ></div>
      <div className="absolute-center w-full max-w-md bg-[#070707] text-white rounded-2xl px-8 py-10 shadow-xl border border-white/10 z-52">
        {/* Nút đóng */}
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold text-center mb-8 tracking-wide">
          Đổi mật khẩu
        </h2>

        {/* Form */}
        <form className="space-y-6">
          <div className="flex-column gap-2">
            <div className="relative">
              <input
                onBlur={touchedPassword}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Mật khẩu hiện tại"
                className={`w-full px-4 py-3 bg-[#1c1c1c] border  text-sm placeholder-gray-400 outline-none focus:border-foreground transition ${
                  touched.password && errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#3f3f3f] focus:border-foreground"
                }`}
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
          <Button title="Xác nhận" className="w-full" />
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
