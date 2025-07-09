import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { CinemaCreateOrUpdate, Location } from "@/interfaces/cinema.interface";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

const DEFAULT_FORM_DATA: CinemaCreateOrUpdate = {
  id: "",
  name: "",
  image: "",
  file: null,
  status: 1,
  id_location: "",
  deatil_location: "",
};

type InputGroupProps = {
  formData: CinemaCreateOrUpdate | null;
  setFormData: (data: CinemaCreateOrUpdate) => void;
  locations: Location[];
  isCreate?: boolean;
};

const InputGroup = ({
  formData,
  setFormData,
  locations,
  isCreate,
}: InputGroupProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      const current = formData ?? DEFAULT_FORM_DATA; // fallback nếu null
      setFormData({ ...current, file });
    }
  };

  const onChangeData = (key: string, value: string | number) => {
    const current = formData ?? DEFAULT_FORM_DATA;
    setFormData({ ...current, [key]: value });
  };

  return (
    <div className="gap-5 pt-2">
      <TextField
        className="w-full"
        required
        id="outlined-required"
        label="Tên rạp"
        defaultValue={formData?.name}
        onChange={(e) => onChangeData("name", e.target.value)}
        placeholder="Nhập tên rạp"
      />

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
            onChange={handleFileChange}
            multiple
          />
        </Button>
        {(preview || formData?.image) && (
          <Image
            alt="cinema image"
            src={preview || formData?.image || ""}
            width={300}
            height={300}
          />
        )}
      </div>

      <InputLabel id="demo-simple-select-helper-label">Thành phố</InputLabel>
      <Select
        className="w-full"
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={formData?.id_location}
        label="Thành phố"
        disabled={isCreate ? false : true}
        onChange={(e) => onChangeData("id_location", e.target.value)}
      >
        {locations?.map((location) => (
          <MenuItem key={location._id} value={location._id}>
            {location.name}
          </MenuItem>
        ))}
      </Select>

      <div className="mt-8">
        <TextField
          className="w-full mt-5"
          required
          id="outlined-required"
          label="Địa chỉ cụ thể"
          defaultValue={formData?.deatil_location}
          onChange={(e) => onChangeData("deatil_location", e.target.value)}
          placeholder="Nhập địa chỉ cụ thể"
        />
      </div>

      <InputLabel id="demo-simple-select-helper-label2 mt-8">
        Trạng thái
      </InputLabel>
      <Select
        className="w-full"
        labelId="demo-simple-select-helper-label2"
        id="demo-simple-select-helper"
        value={formData?.status}
        label="Trạng thái"
        disabled={false}
        onChange={(e) => onChangeData("status", e.target.value)}
      >
        <MenuItem value={1}>Hoạt động</MenuItem>
        <MenuItem value={2}>Không hoạt động</MenuItem>
      </Select>
    </div>
  );
};

export default InputGroup;
