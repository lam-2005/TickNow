"use client";
import Button from "../Button/Button";
import Input from "./Input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import React, { useState } from "react";
import { validateLogin } from "@/utils/validation/login.validate";
import useTouched from "@/hooks/useTouched";
const LoginForm = ({
  setOpenForm,
  setOpenReset,
}: {
  setOpenForm: () => void;
  setOpenReset: () => void;
}) => {
  const { touched, touchedEmail, touchedPassword } = useTouched();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = validateLogin({ email, password });
  return (
    <>
      <h2 className="text-2xl font-semibold">Đăng nhập vào TichNow</h2>
      <form
        action=""
        className="w-full space-y-5 mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-5">
          <Input
            key={"email"}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={touchedEmail}
            error={touched.email ? errors.email : undefined}
          />
          <Input
            key={"password"}
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={touchedPassword}
            error={touched.password ? errors.password : undefined}
          >
            {
              <span
                className={`absolute peer-focus/input:block  right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                  password ? "block" : "hidden"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </span>
            }
          </Input>
        </div>
        <Button
          title="Đăng nhập"
          className="w-full uppercase"
          disabled={errors.email || errors.password ? true : false}
        />
      </form>
      <div className="text-subtitle text-center space-y-1 mt-5 ">
        <p className="text-base">Gặp sự cố khi đăng nhập?</p>
        <div className="flex gap-1 flex-wrap justify-center">
          <span
            onClick={setOpenReset}
            className="text-primary text-base font-semibold cursor-pointer hover:text-white transition-colors duration-500"
          >
            Khôi phục mật khẩu
          </span>{" "}
          hoặc{" "}
          <span
            onClick={setOpenForm}
            className="text-primary text-base font-semibold cursor-pointer hover:text-white transition-colors duration-500"
          >
            Đăng ký tài khoản
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
