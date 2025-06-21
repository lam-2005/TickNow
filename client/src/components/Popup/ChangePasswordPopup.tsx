"use client";
import React from "react";

interface Props {
  onClose: () => void;
}

const ChangePasswordPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md bg-[#070707] text-white rounded-2xl px-8 py-10 shadow-xl border border-white/10">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500"
        >
          ✕
        </button>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold text-center mb-8 tracking-wide">
          Đổi mật khẩu
        </h2>

        {/* Form */}
        <form className="space-y-6">
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            className="w-full px-4 py-3 rounded-md bg-[#1c1c1c] border border-[#3f3f3f] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full px-4 py-3 rounded-md bg-[#1c1c1c] border border-[#3f3f3f] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full px-4 py-3 rounded-md bg-[#1c1c1c] border border-[#3f3f3f] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium text-sm tracking-wider transition-colors"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
