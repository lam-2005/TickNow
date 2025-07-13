import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-background-card w-[500px] h-fit p-7.25  shadow-xl  rounded-[10px]">
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
          Đăng nhập vào trang quản trị của TickNow
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
          <div className="mb-6">
            <label className="block text-foreground mb-2" htmlFor="password">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full mt-1 outline-none focus:border-primary"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn w-full flex-center" type="button">
              Đăng nhập
            </button>
          </div>
          <Link
            href="/admin/forget-password"
            className="flex mt-4 justify-end text-primary"
          >
            Quên mật khẩu?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
