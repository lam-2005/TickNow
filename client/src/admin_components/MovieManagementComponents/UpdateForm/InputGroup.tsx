"use client";
import React from "react";
import { MovieReq } from "@/interfaces/movie.interface";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { GenreType } from "../AddForm/AddForm";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";


type InputGroupProps = {
  formData: MovieReq;
  setFormData: (data: MovieReq) => void;
  listOptionGenre: GenreType[];
};
const InputGroupMovie = ({ formData, setFormData, listOptionGenre }: InputGroupProps) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const handleGenreChange = ( values : GenreType[]) => {
  const ids = values.map(item => item.id);
    setFormData({ ...formData, genre: ids });
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 0.8,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 0.8,
  });


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-3xl gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Tên phim</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Ngày công chiếu</label>
        <input
          type="date"
          value={formData.release_date}
          onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
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
        <select name="status" value={formData.language} 
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        onChange={(e) => setFormData({ ...formData, language: Number(e.target.value) })}>
          <option value={1}>Phụ Đề</option>
          <option value={2}>Lồng Tiếng</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Trạng thái</label>
        <select name="status" value={formData.status} 
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}>
          <option value={1}>Đang chiếu</option>
          <option value={2}>Sắp chiếu</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Thời lượng (phút)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Độ tuổi</label>
        <input
          type="text"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Đạo diễn</label>
        <input
          type="text"
          value={formData.director}
          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
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
        <label className="block mb-1 text-sm font-medium">Trailer</label>
        <input
          type="text"
          value={formData.trailer}
          onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Thể loại</label>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          className="w-full"
          options={listOptionGenre}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          value={listOptionGenre.filter(option => formData.genre?.includes(option.id))}
          onChange={(_, values) => handleGenreChange(values)}
          renderOption={(props, option, { selected }) => {
            const {key,...optionProps} = props;
            return <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          }}
          renderInput={(params) => (
            <TextField {...params} label="Chọn Thể Loại" placeholder="Thể Loại" />
          )}
        />

      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Link hình ảnh</label>
        <Button
        component="label"
        variant="contained"
        style={{ width: "fit-content", marginTop: "1rem",height: "50px" }}
        tabIndex={-1}
        startIcon={<FaCloudUploadAlt />}
      >
        Tải lên hình ảnh
        <VisuallyHiddenInput
          accept="image/*"
          type="file"
          onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null })}
          multiple
        />
      </Button>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Link banner</label>
        <Button
        component="label"
        variant="contained"
        style={{ width: "fit-content", marginTop: "1rem",height: "50px" }}
        tabIndex={-1}
        startIcon={<FaCloudUploadAlt />}
      >
        Tải lên hình ảnh
        <VisuallyHiddenInput
          accept="image/*"
          type="file"
          onChange={(e) => setFormData({ ...formData, banner: e.target.files ? e.target.files[0] : null })}
          multiple
        />
      </Button>
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 text-sm font-medium">Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-base min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default InputGroupMovie;
