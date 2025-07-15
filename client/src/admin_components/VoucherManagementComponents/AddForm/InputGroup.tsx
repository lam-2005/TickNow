import TextField from "@mui/material/TextField";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { VoucherReq } from "@/interfaces/vouchers.interface";

type InputGroupProps = {
  formData: VoucherReq;
  setFormData: (data: VoucherReq) => void;
};

const InputGroup = ({ formData, setFormData }: InputGroupProps) => {
  const onChangeData = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="flex flex-col gap-7 pt-2">
      <TextField
        className="w-full"
        required
        id="outlined-required"
        label="Mã code"
        defaultValue={formData?.code}
        onChange={(e) => onChangeData("code", e.target.value)}
        placeholder="Nhập mã code"
      />

      <TextField
        className="w-full"
        type="number"
        required
        id="outlined-required"
        label="Mức giảm (%)"
        defaultValue={formData?.discount_type}
        onChange={(e) => onChangeData("discount_type", e.target.value)}
        placeholder="Nhập mức giảm (%)"
      />

      <TextField
        className="w-full"
        type="number"
        required
        id="outlined-required"
        label="Số lượng tối đa"
        defaultValue={formData?.max_users}
        onChange={(e) => onChangeData("max_users", e.target.value)}
        placeholder="Nhập số lượng tối đa"
      />

      <TextField
        className="w-full"
        type="date"
        required
        id="outlined-required"
        label="Ngày bắt đầu"
        defaultValue={formData?.start_date}
        onChange={(e) => onChangeData("start_date", e.target.value)}
        placeholder="Nhập ngày bắt đầu"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        className="w-full"
        type="date"
        required
        id="outlined-required"
        label="Ngày kết thúc"
        defaultValue={formData?.end_date}
        onChange={(e) => onChangeData("end_date", e.target.value)}
        placeholder="Nhập ngày kết thúc"
        InputLabelProps={{ shrink: true }}
      />

      <div>
        <InputLabel id="demo-simple-select-helper-label2 mt-8">
          Trạng thái
        </InputLabel>
        <Select
          className="w-full"
          labelId="demo-simple-select-helper-label2"
          id="demo-simple-select-helper"
          value={formData?.is_active}
          label="Trạng thái"
          disabled={false}
          onChange={(e) => onChangeData("is_active", e.target.value)}
        >
          <MenuItem value={"true"}>Hoạt động</MenuItem>
          <MenuItem value={"false"}>Không hoạt động</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default InputGroup;
