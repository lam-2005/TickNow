"use client";
import React, { useEffect, useState } from "react";
import { MovieType } from "@/interfaces/movie.interface";
import InputGroup from "./InputGroup";

type Props = {
  data: MovieType;
  onSubmit: (data: Partial<MovieType>) => void;
  onCancel: () => void;
};

const UpdateForm = ({ data, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState<Partial<MovieType>>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-3xl h-full overflow-y-auto">
      <div className="flex-1 overflow-y-auto px-5">
        <InputGroup formData={formData} setFormData={setFormData}  />
      </div>
      <div className="flex justify-end gap-2 p-5 bg-background-card rounded-b-xl">
        <button type="button" className="btn bg-gray-400 hover:bg-gray-500" onClick={onCancel}>
          Hủy
        </button>
        <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white">
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
