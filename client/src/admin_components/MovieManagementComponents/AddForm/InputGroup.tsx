"use client";
import React, { useState } from "react";
import { MovieReq } from "@/interfaces/movie.interface";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { GenreType } from "./AddForm";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Image from "next/image";

type InputGroupProps = {
  formData: MovieReq;
  setFormData: (data: MovieReq) => void;
  listOptionGenre: GenreType[];
  error: string;
};
const InputGroupMovie = ({
  formData,
  setFormData,
  listOptionGenre,
  error,
}: InputGroupProps) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const [previewImage, setPreviewImage] = useState<string | null>("");
  const [previewImageBanner, setPreviewImageBanner] = useState<string | null>(
    ""
  );
  // const [error, setError] = useState<string>("");
  // useEffect(() => {
  //   if (formData.release_date) {
  //     const currentDate = new Date();
  //     const releaseDate = new Date(formData.release_date);
  //     if (releaseDate < currentDate) {
  //       setError("Ngày công chiếu không được trước ngày hiện tại.");
  //     } else {
  //       setError("");
  //     }
  //   }
  // }, [formData.release_date]);
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const handleGenreChange = (values: GenreType[]) => {
    const ids = values.map((item) => item.id);
    setFormData({ ...formData, genre: ids });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData({ ...formData, image: file });
    }
  };

  const handleImageBannerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageBanner(imageUrl);
      setFormData({ ...formData, banner: file });
    }
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 0.8,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 0.8,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium">
          Tên phim <span className="text-error">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Ngày công chiếu <span className="text-error">*</span>
        </label>
        {/* {error && <p className="text-error">{error}</p>} */}
        <TextField
          className="w-full"
          type="date"
          required
          id="outlined-required"
          error={error ? true : false}
          helperText={error}
          value={formData.release_date}
          onChange={(e) =>
            setFormData({ ...formData, release_date: e.target.value })
          }
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Quốc gia</label>
        <input
          type="text"
          value={formData.nation}
          onChange={(e) => setFormData({ ...formData, nation: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Ngôn ngữ</label>
        <input
          type="text"
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
        {/* <select
          name="language"
          value={formData.language}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          onChange={(e) =>
            setFormData({ ...formData, language: Number(e.target.value) })
          }
        >
          <option value={1}>Phụ Đề</option>
          <option value={2}>Lồng Tiếng</option>
        </select> */}
      </div>

      {/* <div>
        <label className="block mb-1 font-medium">Trạng thái</label>
        <select name="status" value={formData.status} 
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}>
          <option value={1}>Đang chiếu</option>
          <option value={2}>Sắp chiếu</option>
        </select>
      </div> */}

      <div>
        <label className="block mb-1 text-sm font-medium">
          Thời lượng (phút) <span className="text-error">*</span>
        </label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Độ tuổi <span className="text-error">*</span>
        </label>
        <select
          name="status"
          value={formData.age}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        >
          <option value={"P"}>Mọi độ tuổi</option>
          <option value={"K"}>Trẻ dưới 13 tuổi</option>
          <option value={"13"}>Từ 13 tuổi trở lên</option>
          <option value={"16"}>Từ 16 tuổi trở lên</option>
          <option value={"18"}>Từ 18 tuổi trở lên</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Đạo diễn <span className="text-error">*</span>
        </label>
        <input
          type="text"
          value={formData.director}
          onChange={(e) =>
            setFormData({ ...formData, director: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Diễn viên</label>
        <input
          type="text"
          value={formData.actor}
          onChange={(e) => setFormData({ ...formData, actor: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Trailer <span className="text-error">*</span>
        </label>
        <input
          type="text"
          value={formData.trailer}
          onChange={(e) =>
            setFormData({ ...formData, trailer: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Thể loại <span className="text-error">*</span>
        </label>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          className="w-full"
          options={listOptionGenre}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          value={listOptionGenre.filter((option) =>
            formData.genre?.includes(option.id)
          )}
          onChange={(_, values) => handleGenreChange(values)}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn Thể Loại"
              placeholder="Thể Loại"
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Ảnh phim <span className="text-error">*</span>
        </label>
        <Button
          component="label"
          variant="contained"
          style={{ width: "fit-content", marginTop: "1rem", height: "50px" }}
          tabIndex={-1}
          startIcon={<FaCloudUploadAlt />}
        >
          Tải lên hình ảnh
          <VisuallyHiddenInput
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </Button>
        {previewImage && formData.image && (
          <Image
            alt="Ảnh phim"
            src={previewImage || ""}
            width={300}
            height={300}
          />
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Ảnh nền phim <span className="text-error">*</span>
        </label>
        <Button
          component="label"
          variant="contained"
          style={{ width: "fit-content", marginTop: "1rem", height: "50px" }}
          tabIndex={-1}
          startIcon={<FaCloudUploadAlt />}
        >
          Tải lên hình ảnh
          <VisuallyHiddenInput
            accept="image/*"
            type="file"
            onChange={handleImageBannerChange}
          />
        </Button>
        {previewImageBanner && formData.banner && (
          <Image
            alt="Ảnh phim"
            src={previewImageBanner || ""}
            width={300}
            height={300}
          />
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 text-sm font-medium">Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default InputGroupMovie;
