import Button from "../Button/Button";
import Input from "./Input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import React, { useState } from "react";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useRouter } from "next/navigation";
const LoginForm = ({
  closeForm,
  setOpenForm,
  setOpenReset,
}: {
  setOpenForm: () => void;
  setOpenReset: () => void;
  closeForm: () => void;
}) => {
  const router = useRouter();
  const { touched, touchedEmail, touchedPassword } = useTouched();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const { setUser, setAdmin } = useAuth();
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
      const res = await fetch("/api/auth/user", {
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
      toast.success("Đăng nhập thành công");
      if (result.isAdmin) {
        localStorage.setItem("admin", JSON.stringify(result.res.data.user));
        setAdmin({ name: result.res.data.user, token: result.res.data.token });
        router.replace("/admin");
      } else {
        localStorage.setItem("user", JSON.stringify(result.res.data.user));
        setUser({ name: result.res.data.user, token: result.res.data.token });
        closeForm();
      }
    } catch (err) {
      toast.error(`Đăng nhập thất bại: ${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Đăng nhập vào TichNow</h2>
      <form action="" className="w-full space-y-5 mt-6" onSubmit={handleLogin}>
        <div className="space-y-5">
          <Input
            key={"email"}
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onBlur={touchedEmail}
            error={touched.email ? errors.email : undefined}
          />
          <Input
            key={"password"}
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
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
        </div>
        <Button
          title="Đăng nhập"
          className="w-full uppercase"
          disabled={errors.email || errors.password ? true : false}
        />
      </form>
      <div className="text-foreground text-center space-y-1 mt-5 ">
        <p className="text-base">Gặp sự cố khi đăng nhập?</p>
        <div className="flex gap-1 flex-wrap justify-center">
          <span
            onClick={setOpenReset}
            className="text-primary text-base font-semibold cursor-pointer hover:text-foreground transition-colors duration-500"
          >
            Khôi phục mật khẩu
          </span>{" "}
          hoặc{" "}
          <span
            onClick={setOpenForm}
            className="text-primary text-base font-semibold cursor-pointer hover:text-foreground transition-colors duration-500"
          >
            Đăng ký tài khoản
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
