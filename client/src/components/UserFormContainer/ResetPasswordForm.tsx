import React from "react";
import Input from "./Input";
import Button from "../Button/Button";

const ResetPasswordForm = ({ setOpenForm }: { setOpenForm: () => void }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Khôi phục mật khẩu của bạn</h2>
      <p className="text-base text-subtitle mt-6">
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
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          title="Gửi email khôi phục"
          className="w-full uppercase"
          //   disabled={errors.email || errors.password ? true : false}
        />
      </form>
      <div className="text-subtitle text-center space-y-1 mt-5 ">
        <p className="text-base">
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={setOpenForm}
            className="text-primary text-base font-semibold cursor-pointer hover:text-white transition-colors duration-500"
          >
            Đăng Ký
          </span>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordForm;
