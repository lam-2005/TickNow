import Image from "next/image";
import React from "react";

const ForgetPassword = () => {
  return (
    <div className="bg-background-card w-[500px] h-fit p-7.25 shadow-xl rounded-[10px]">
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <Image
            src={"/logo/logo.webp"}
            alt="logo-TickNow"
            width={150}
            height={50}
            priority
          />
        </div>
        <p className="text-xl font-bold my-5 text-foreground">
          Khôi phục mật khẩu của bạn
        </p>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-foreground mb-2" htmlFor="username">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full mt-1 outline-none focus:border-primary"
              id="username"
              type="text"
              placeholder="Nhập địa chỉ email"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn w-full flex-center" type="button">
              Gửi email khôi phục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
