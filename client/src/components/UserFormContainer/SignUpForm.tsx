"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../Button/Button";
import validateSignup, { FieldsType } from "@/utils/validate";
import useTouched from "@/hooks/useTouched";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const SignUpForm = ({ setOpenForm }: { setOpenForm: () => void }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    touched,
    touchedEmail,
    touchedFullName,
    touchedDateOfBirth,
    touchedPassword,
    touchedConfirmPassword,
    touchedPhone,
  } = useTouched();
  const [formData, setFormData] = useState<FieldsType>({
    email: "",
    fullName: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const errors = validateSignup(formData);
  return (
    <>
      <h2 className="text-2xl font-semibold">Đăng ký tài khoản</h2>
      <form
        action=""
        className="w-full space-y-5 mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-5">
          <Input
            label="Email"
            value={formData.email}
            onBlur={touchedEmail}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={touched.email ? errors.email : undefined}
          />
          <Input
            label="Họ và tên"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            onBlur={touchedFullName}
            error={touched.fullName ? errors.fullName : undefined}
          />
          <div className="flex gap-5 flex-wrap">
            <Input
              label="Ngày sinh"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              onBlur={touchedDateOfBirth}
              error={touched.dateOfBirth ? errors.dateOfBirth : undefined}
            />
            <Input
              label="Số điện thoại"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              onBlur={touchedPhone}
              error={touched.phone ? errors.phone : undefined}
            />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            label="Mật khẩu"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onBlur={touchedPassword}
            error={touched.password ? errors.password : undefined}
          >
            {
              <span
                className={`absolute peer-focus/input:block  right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                  formData.password ? "block" : "hidden"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </span>
            }
          </Input>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            label="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            onBlur={touchedConfirmPassword}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          >
            <span
              className={`absolute peer-focus/input:block  right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer -translate-x-2.5 text-xl ${
                formData.confirmPassword ? "block" : "hidden"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>
          </Input>
        </div>
        <Button
          title="Đăng ký"
          className="w-full uppercase"
          disabled={
            errors.email ||
            errors.password ||
            errors.fullName ||
            errors.confirmPassword ||
            errors.phone ||
            errors.dateOfBirth
              ? true
              : false
          }
        />
      </form>
      <div className="text-subtitle text-center space-y-1 mt-5 ">
        <p className="text-base">
          Bạn đã có tài khoản?{" "}
          <span
            onClick={setOpenForm}
            className="text-primary text-base font-semibold cursor-pointer hover:text-foreground transition-colors duration-500"
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
