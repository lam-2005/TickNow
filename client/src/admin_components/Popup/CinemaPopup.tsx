"use client";
import React, { useEffect, useState } from "react";
import AddPopup from "@/admin_components/Popup/AddPopup";

interface CinemaForm {
  name: string;
  location: string;
  image: string | File;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CinemaForm) => void;
  defaultValues?: CinemaForm;
  title: string;
}

const CinemaPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  title,
}) => {
  const [form, setForm] = useState<CinemaForm>({
    name: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    } else {
      setForm({ name: "", location: "", image: "" });
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({
        ...prev,
        image: e.target.files![0], // giữ dưới dạng File để xử lý upload
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <AddPopup title={title} onClose={onClose}>
      <div className="space-y-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên rạp"
          className="w-full border border-black rounded px-3 py-2 placeholder-gray-400"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Địa chỉ"
          className="w-full border border-black rounded px-3 py-2 placeholder-gray-400"
        />

        {/* Nút chọn ảnh */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-black rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        {/* Hiển thị tên ảnh nếu có */}
        {typeof form.image === "object" && (
          <p className="text-sm text-gray-500">Ảnh đã chọn: {form.image.name}</p>
        )}
      </div>

      <div className="flex justify-start gap-2 mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
        >
          Lưu
        </button>
      </div>
    </AddPopup>
  );
};

export default CinemaPopup;
