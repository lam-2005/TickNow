import React from "react";
import TextField from "@mui/material/TextField";
import { Post } from "@/interfaces/post.interface";
type InputGroupProps = {
  formData: Post;
  setFormData: (data: Post) => void;
  isCreate?: boolean; 
};
const InputGroup = ({ formData, setFormData, isCreate = false }: InputGroupProps) => {
  const onChangeData = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };
  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 10);
  };
  return (
    <div className="flex flex-col gap-7 pt-2">
      <TextField
        label="Tiêu đề"
        required
        defaultValue={formData.title}
        disabled={!isCreate}
        onChange={(e) => onChangeData("title", e.target.value)}
      />
      <TextField
        label="Nội dung"
        multiline
        rows={4}
        required
        defaultValue={formData.content}
        disabled={!isCreate}
        onChange={(e) => onChangeData("content", e.target.value)}
      />
      <TextField
        label="Ảnh (URL)"
        defaultValue={formData.image}
        disabled={!isCreate}
        onChange={(e) => onChangeData("image", e.target.value)}
      />
      <TextField
        type="date"
        label="Ngày bắt đầu"
        defaultValue={formatDate(formData.start_day)}
        disabled={!isCreate}
        onChange={(e) => onChangeData("start_day", e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        type="date"
        label="Ngày kết thúc"
        defaultValue={formatDate(formData.end_day)}
        disabled={!isCreate}
        onChange={(e) => onChangeData("end_day", e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
};

export default InputGroup;
