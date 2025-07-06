"use client";
import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { UserReq, UserType } from "@/interfaces/user.interface";

interface Props {
  data: UserType;
  onSubmit: (data: UserReq) => void;
  onCancel: () => void;
  onlyEditStatusAndRole?: boolean;
}

const UpdateForm = ({ data, onSubmit, onCancel, onlyEditStatusAndRole }: Props) => {
  const [formData, setFormData] = useState<UserReq>({
    name: data.name,
    email: data.email,
    phone: data.phone,
    year: data.year,
    password: "",
    confirmPassword: "",
    status: data.status,
    role: data.role,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<UserReq> = {
      status: formData.status,
      role: formData.role,
    };
    onSubmit(payload as UserReq);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-5">
      <InputGroup
        formData={formData}
        setFormData={setFormData}
        onlyEditStatusAndRole={onlyEditStatusAndRole}
      />
      <div className="flex justify-end gap-3 py-5">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={onCancel}
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-success text-white rounded-md"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
