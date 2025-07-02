"use client";
import React from "react";
import { MovieType } from "@/interfaces/movie.interface";

type Props = {
  formData: Partial<MovieType>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<MovieType>>>;
};

const InputGroup = ({ formData, setFormData }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "status" ? Number(value) : value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div>
        <label className="block mb-1 font-medium">Tên phim</label>
        <input name="name" value={formData.name || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Ngày công chiếu</label>
        <input type="date" name="release_date" value={(formData.release_date || "").slice(0, 10)} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Đạo diễn</label>
        <input name="director" value={formData.director || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Diễn viên</label>
        <input name="actor" value={formData.actor || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Ngôn ngữ</label>
        <input name="language" value={formData.language || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Quốc gia</label>
        <input name="nation" value={formData.nation || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Thời lượng (phút)</label>
        <input type="number" name="duration" value={formData.duration || 0} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Độ tuổi</label>
        <input name="age" value={formData.age || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Trailer</label>
        <input name="trailer" value={formData.trailer || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Trạng thái</label>
        <select name="status" value={formData.status || 1} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base">
          <option value={1}>Đang chiếu</option>
          <option value={2}>Sắp chiếu</option>
          <option value={3}>Ngừng chiếu</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Hình ảnh</label>
        <input name="image" value={formData.image || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Banner</label>
        <input name="banner" value={formData.banner || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-3 text-base" />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 font-medium">Mô tả</label>
        <textarea name="description" value={formData.description || ""} onChange={handleChange} rows={4} className="input w-full text-base rounded-md" />
      </div>
    </div>
  );
};

export default InputGroup;
