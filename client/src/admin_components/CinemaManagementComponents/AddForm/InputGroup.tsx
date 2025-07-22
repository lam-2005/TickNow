"use client";
import React, { useState } from "react";
import { CinemaReq } from "@/interfaces/cinema.interface";
import { LocationOptionsType } from "./AddForm";
import Button from "@mui/material/Button";
import Image from "next/image";
import { styled } from "@mui/material/styles";

type Props = {
  formData: CinemaReq;
  setFormData: (data: CinemaReq) => void;
  locationOptions: LocationOptionsType[];
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputGroupCinema = ({
  formData,
  setFormData,
  locationOptions,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium">
          Tên rạp <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Nhập tên rạp"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="my-5">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Hình ảnh rạp
          <VisuallyHiddenInput
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
        </Button>
        {preview && formData.image && (
          <Image
            alt="cinema image"
            src={preview || ""}
            width={300}
            height={300}
          />
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Khu vực <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.id_location}
          onChange={(e) =>
            setFormData({
              ...formData,
              id_location: e.target.value,
            })
          }
        >
          <option value="">-- Chọn khu vực --</option>
          {locationOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Địa chỉ chi tiết <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Nhập địa chỉ chi tiết"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.deatil_location}
          onChange={(e) =>
            setFormData({
              ...formData,
              deatil_location: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Trạng thái <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: Number(e.target.value) })
          }
        >
          <option value={2}>Hoạt động</option>
          <option value={1}>Không hoạt động</option>
        </select>
      </div>
    </div>
  );
};

export default InputGroupCinema;
