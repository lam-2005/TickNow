"use client";
import React from "react";
import { MovieType } from "@/interfaces/movie.interface";

type Props = {
  formData: Partial<MovieType>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<MovieType>>>;
};

const InputGroupMovie = ({ formData, setFormData }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Tên phim</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Ngày công chiếu</label>
        <input
          type="date"
          name="release_date"
          value={formData.release_date || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Quốc gia</label>
        <input
          type="text"
          name="nation"
          value={formData.nation || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Ngôn ngữ</label>
        <input
          type="text"
          name="language"
          value={formData.language || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Thời lượng (phút)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Độ tuổi</label>
        <input
          type="text"
          name="age"
          value={formData.age || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Đạo diễn</label>
        <input
          type="text"
          name="director"
          value={formData.director || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Diễn viên</label>
        <input
          type="text"
          name="actor"
          value={formData.actor || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Link trailer</label>
        <input
          type="text"
          name="trailer"
          value={formData.trailer || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Link hình ảnh</label>
        <input
          type="text"
          name="image"
          value={formData.image || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Link banner</label>
        <input
          type="text"
          name="banner"
          value={formData.banner || ""}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 text-sm font-medium">Mô tả</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="input w-full min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default InputGroupMovie;
