"use client";
import React from "react";
import { UserReq } from "@/interfaces/user.interface";

type InputGroupProps = {
  formData: UserReq;
  setFormData: (data: UserReq) => void;
  onlyEditStatusAndRole?: boolean;
};

const InputGroup = ({ formData, setFormData, onlyEditStatusAndRole }: InputGroupProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      {!onlyEditStatusAndRole && (
        <>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tên người dùng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tên người dùng"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Số điện thoại"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Năm sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Năm sinh"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
        </>
      )}

      <div>
        <label className="block mb-1 text-sm font-medium">
          Vai trò <span className="text-red-500">*</span>
        </label>
        <select
          disabled={formData.role === true}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base bg-white disabled:bg-gray-100"
          value={formData.role === true ? "admin" : formData.role === false ? "user" : ""}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value === "admin" ? true : false })
          }
        >
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Trạng thái <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={
            formData.status === 1 || formData.status === "1"
              ? "1"
              : formData.status === 0 || formData.status === "0"
              ? "0"
              : ""
          }
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="">Chọn trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Ngừng hoạt động</option>
        </select>
      </div>
    </div>
  );
};

export default InputGroup;