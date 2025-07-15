"use client";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CinemaReq, LocationType } from "@/interfaces/cinema.interface";

type InputGroupProps = {
  formData: CinemaReq;
  setFormData: (data: CinemaReq) => void;
  locations: LocationType[];
};

const InputGroup = ({ formData, setFormData, locations }: InputGroupProps) => {
  const selectedLocation = locations.find(
    (l) => l.id_location === formData.id_location
  ) || null;

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

      <div>
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
      </div>

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
