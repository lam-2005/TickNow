"use client";
import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { ScreenReq, Screening } from "@/interfaces/screening.interface";

interface Props {
  data: Screening;
  onSubmit: (data: ScreenReq) => void;
  onCancel: () => void;
  onlyEditStatusAndRole?: boolean;
}

const UpdateForm = ({ data, onSubmit, onCancel, onlyEditStatusAndRole }: Props) => {
  const [formData, setFormData] = useState<ScreenReq>({
    id_room: data.id_room,
    id_movie: data.id_movie,
    time_start: data.time_start,
    time_end: data.time_end,
    date: data.date,
    showtype: data.showtype,
    roomCode: data.roomCode,
    movieName: data.movieName,
    status: String(data.status) === "true",
    role: String(data.role) === "false",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<ScreenReq> = {
      status: formData.status,
      role: formData.role,
    };
    onSubmit(payload as ScreenReq);
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
