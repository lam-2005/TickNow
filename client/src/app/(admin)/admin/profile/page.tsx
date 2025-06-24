"use client";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import React from "react";

const ProfileUser = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <div className="card">
      <HeadingCard title="Thông tin người dùng"></HeadingCard>
      <div className="flex-column gap-5">
        <div className="space-y-2.5">
          <div className="flex text-lg items-center">
            <span className="font-bold flex-2/10">Họ và tên:</span>
            {isEditing ? (
              <input className="border border-gray-300 rounded-md p-2 flex-9/10 mt-1 outline-none focus:border-primary" />
            ) : (
              <div className="flex-9/10">Phan Phúc Lâm</div>
            )}
          </div>
          <div className="flex text-lg items-center">
            <span className="font-bold flex-2/10">Email:</span>
            {isEditing ? (
              <input className="border border-gray-300 rounded-md p-2 flex-9/10 mt-1 outline-none focus:border-primary" />
            ) : (
              <div className="flex-9/10">phanphuclam@gmail.com</div>
            )}
          </div>
          <div className="flex text-lg items-center">
            <span className="font-bold flex-2/10">Số điện thoại:</span>
            {isEditing ? (
              <input className="border border-gray-300 rounded-md p-2 flex-9/10 mt-1 outline-none focus:border-primary" />
            ) : (
              <div className="flex-9/10">0123456789</div>
            )}
          </div>
          <div className="flex text-lg items-center">
            <span className="font-bold flex-2/10">Ngày sinh:</span>
            {isEditing ? (
              <input className="border border-gray-300 rounded-md p-2 flex-9/10 mt-1 outline-none focus:border-primary" />
            ) : (
              <div className="flex-9/10">01/01/2000</div>
            )}
          </div>
        </div>
        {isEditing ? (
          <button
            className="btn self-start"
            onClick={() => setIsEditing(false)}
          >
            Lưu thay đổi
          </button>
        ) : (
          <button className="btn self-start" onClick={() => setIsEditing(true)}>
            Chỉnh sửa thông tin
          </button>
        )}
      </div>
      <hr />
      <div className="flex-column gap-5">
        <div>
          <HeadingCard title="Đổi mật khẩu" />
          <div className="space-y-2.5">
            <div className="flex text-lg items-center">
              <span className="font-bold flex-2/10">Mật khẩu hiện tại:</span>
              <input
                type="password"
                className="border border-gray-300 rounded-md p-2 flex-7/10 mt-1 outline-none focus:border-primary"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div className="flex text-lg items-center">
              <span className="font-bold flex-2/10">Mật khẩu mới:</span>
              <input
                type="password"
                className="border border-gray-300 rounded-md p-2 flex-7/10 mt-1 outline-none focus:border-primary"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className="flex text-lg items-center">
              <span className="font-bold flex-2/10">
                Xác nhận mật khẩu mới:
              </span>
              <input
                type="password"
                className="border border-gray-300 rounded-md p-2 flex-7/10 mt-1 outline-none focus:border-primary"
                placeholder="Xác nhận mật khẩu mới"
              />
            </div>
          </div>
        </div>
        <button className="btn self-start">Đổi mật khẩu</button>
      </div>
    </div>
  );
};

export default ProfileUser;
