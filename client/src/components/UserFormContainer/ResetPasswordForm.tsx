import React, { useState } from "react";
import Input from "./Input";
import Button from "../Button/Button";
import useTouched from "@/hooks/useTouched";
import validateForm from "@/utils/validate";
import { toast } from "react-toastify";
import { forgetPassAPI } from "@/services/user.service";

const ResetPasswordForm = ({ setOpenForm }: { setOpenForm: () => void }) => {
  const { touched, touchedEmail } = useTouched();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const errors = validateForm({ email });
  const handleForrgetPass = async () => {
    setLoading(true);
    if (!email) {
      toast.warning("Vui lòng nhập email của bạn");
      return;
    }
    try {
      await forgetPassAPI(email);
      toast.success("Một liên kết đã gửi đến, hãy kiểm tra email của bạn");
    } catch (error) {
      toast.error(`Không thể gửi email: ${error}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Khôi phục mật khẩu của bạn</h2>
      <p className="text-base text-foreground mt-6">
        Vì lý do bảo mật nên chúng tôi cần biết đó là bạn
      </p>
      <form
        action=""
        className="w-full space-y-5 mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-5">
          <Input
            label="Địa chỉ email của bạn"
            onBlur={touchedEmail}
            error={touched.email ? errors.email : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          title={loading ? "Đang gửi..." : "Gửi email khôi phục"}
          className="w-full uppercase"
          disabled={errors.email || loading ? true : false}
          onClick={handleForrgetPass}
        />
      </form>
      <div className="text-subtitle text-center space-y-1 mt-5 ">
        <p className="text-base">
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={setOpenForm}
            className="text-primary text-base font-semibold cursor-pointer hover:text-foreground transition-colors duration-500"
          >
            Đăng Ký
          </span>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordForm;
