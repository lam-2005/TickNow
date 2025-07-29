"use client";
import React, { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
import { CinemaReq, LocationType } from "@/interfaces/cinema.interface";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import env from "@/configs/environment";
import { FaRegTrashAlt } from "react-icons/fa";

type InputGroupProps = {
  formData: CinemaReq;
  setFormData: (data: CinemaReq) => void;
  locations: LocationType[];
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
const InputGroup = ({ formData, setFormData }: InputGroupProps) => {
  // const selectedLocation = locations.find(
  //   (l) => l.id_location === formData.id_location
  // ) || null;
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (formData.image && typeof formData.image === "string") {
      setPreview(formData.image);
    }
  }, [formData.image]);
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
        <label className="block mb-1 text-sm font-medium">Tên rạp *</label>
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
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {preview && formData.image && (
          <div className="mt-3 relative w-[300px] h-[200px] z-10">
            <Image
              alt="cinema image"
              src={`${
                typeof formData.image === "string"
                  ? `${env.IMG_API_URL}${formData.image}`
                  : preview || ""
              }`}
              width={300}
              height={300}
              style={{ objectFit: "cover", width: "300px", height: "200px" }}
              className="rounded-md"
            />

            <div
              onClick={() => {
                setPreview(null);
                setFormData({ ...formData, image: "" });
              }}
              className="absolute top-0 right-0 -translate-x-2.5 translate-y-2.5 p-2 z-11 text-error cursor-pointer bg-white rounded-md"
            >
              <FaRegTrashAlt />
            </div>
          </div>
        )}
      </div>
      {/* <div>
        <label className="block mb-1 text-sm font-medium">Địa chỉ chi tiết *</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base bg-gray-100 cursor-not-allowed"
          value={formData.deatil_location}
          disabled
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Tỉnh/Thành phố *</label>
        <Autocomplete
          disablePortal
          disabled
          options={locations}
          size="small"
          className="min-w-[300px]"
          getOptionLabel={(option) => option.location || ""}
          isOptionEqualToValue={(option, value) =>
            option.id_location === value.id_location
          }
          value={selectedLocation}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} label="Chọn tỉnh/thành" />}
        />
      </div> */}

      <div>
        <label className="block mb-1 text-sm font-medium">Trạng thái</label>
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: +e.target.value })
          }
        >
          <option value={1}>Không hoạt động</option>
          <option value={2}>Hoạt động</option>
        </select>
      </div>
    </div>
  );
};

export default InputGroup;
