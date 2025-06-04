"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  return (
    <div className="container flex-column items-center mt-10 gap-10">
      <h2>Thông tin cá nhân</h2>
      <div className="space-x-10">
        <button className="active [&.active]:bg-primary [&.active]:border-transparent [&.active]:text-white py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm">
          Tài khoản của tôi
        </button>
        <button
          onClick={() => router.push("/booking-history")}
          className="py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm"
        >
          Lịch sử đặt vé
        </button>
      </div>
      <div className="grid grid-cols-[repeat(2,minmax(0,360px))] gap-x-10 gap-y-5">
        <div className="space-y-2.5">
          <span className="block">Họ và tên</span>
          <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
            Phan Phúc Lâm
          </div>
        </div>{" "}
        <div className="space-y-2.5">
          <span className="block">Email</span>
          <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
            phanphuclam@gmail.com
          </div>
        </div>{" "}
        <div className="space-y-2.5">
          <span className="block">Số điện thoại</span>
          <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
            0123456789
          </div>
        </div>{" "}
        <div className="space-y-2.5">
          <span className="block">Ngày sinh</span>
          <div className="max-w-[360px] w-full bg-background-card rounded-[5px] px-5 py-2.5 text-gray-400">
            01/01/2000
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          title="Đổi mật khẩu"
          className="[&_span]:text-sm bg-transparent border-1 border-foreground text-foreground before:bg-primary [&_span]:text-foreground hover:[&_span]:text-white hover:border-primary "
        />
        <Button title="Chỉnh sửa thông tin" className="[&_span]:text-sm " />
      </div>
    </div>
  );
};

export default Profile;
