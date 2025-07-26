"use client";
import { useAuth } from "@/hooks/contexts/useAuth";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

const AuthAdminForm = () => {
  const { touched, touchedEmail, touchedPassword } = useTouched();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const { setAdmin } = useAuth();
  const errors = validateForm({
    email: formData.email,
    password: formData.password,
  });
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.warning("Vui lòng nhập đầu đủ thông tin!");
      return;
    }
    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(`Đăng nhập thất bại: ${result.message}`);
        return;
      }
      const { token, user } = result.res.data;
      localStorage.setItem("admin", JSON.stringify(user));
      setAdmin({ name: user, token });
      toast.success("Đăng nhập thành công");
      router.push("/admin");
    } catch (err) {
      toast.error(`Đăng nhập thất bại: ${err}`);
      console.error(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form className="w-full">
      <div className="flex-column mb-4 gap-2">
        <div className="">
          <label className="block text-foreground mb-2" htmlFor="username">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className={`border-2 border-gray-300 rounded-md p-2 w-full mt-1 outline-none focus:border-primary ${
              touched.email && errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
            id="username"
            name="email"
            type="text"
            placeholder="Nhập địa chỉ email"
            value={formData.email}
            onChange={handleChange}
            onBlur={touchedEmail}
          />
        </div>
        {touched.email && errors.email && (
          <span className="text-red-600 text-[13px] w-fit bg-red-200 px-2 py-0.75 rounded-sm">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex-column mb-6 gap-2">
        <div className="">
          <label className="block text-foreground mb-2" htmlFor="password">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              className={`border-2 border-gray-300 rounded-md p-2 w-full mt-1 outline-none focus:border-primary  ${
                touched.password && errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              onBlur={touchedPassword}
            />
            {
              <span
                className={`absolute peer-focus/input:block right-0 top-1/2 text-foreground -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                  formData.password ? "block" : "hidden"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </span>
            }
          </div>
        </div>
        {touched.password && errors.password && (
          <span className="text-red-600 w-fit  text-[13px] bg-red-200 px-2 py-0.75 rounded-sm">
            {errors.password}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="btn w-full flex-center disabled:brightness-50 disabled:cursor-not-allowed"
          type="button"
          disabled={errors.email || errors.password ? true : false}
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default AuthAdminForm;
