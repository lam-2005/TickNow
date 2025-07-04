import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";
import { CinemaType } from "./AddForm";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DataRoomReq } from "@/interfaces/room.interface";
type InputGroupProps = {
  formData: DataRoomReq;
  setFormData: (data: DataRoomReq) => void;
  listOptionCinemas: CinemaType[];
};
const InputGroup = ({
  formData,
  setFormData,
  listOptionCinemas,
}: InputGroupProps) => {
  return (
    <div className="flex gap-5 items-center pt-2">
      <h2 className="text-xl text-nowrap">Nhập thông tin:</h2>
      <div className="flex gap-5">
        <Autocomplete
          disablePortal
          options={listOptionCinemas}
          size="small"
          className="min-w-[300px]"
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={
            listOptionCinemas.find((c) => c.id === formData.id_cinema) || null
          }
          onChange={(event, newValue) => {
            setFormData({
              ...formData,
              id_cinema: newValue ? newValue.id : "",
            });
          }}
          renderInput={(params) => <TextField {...params} label="Chọn rạp" />}
        />
        <FormControl className="w-[120px]" size="small">
          <InputLabel>Trạng thái</InputLabel>
          <Select
            label="Trạng thái"
            value={formData.status}
            onChange={(e) => {
              setFormData({ ...formData, status: e.target.value });
            }}
          >
            <MenuItem value={2}>Hoạt động</MenuItem>
            <MenuItem value={1}>Không hoạt động</MenuItem>
            <MenuItem value={3}>Bảo trì</MenuItem>
          </Select>
        </FormControl>

        <input
          type="number"
          name=""
          id=""
          placeholder="Số cột"
          className="py-[7px] px-[14px] outline-none border-[rgba(0,_0,_0,_0.23)] border-1 focus:border-primary rounded-[4px] w-[120px] hover:border-[rgba(0,_0,_0,_0.87)] placeholder:text-[rgba(0,_0,_0,_0.87)]"
          value={formData.column}
          onChange={(e) => setFormData({ ...formData, column: e.target.value })}
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="Số hàng"
          className="py-[7px] px-[14px] outline-none border-[rgba(0,_0,_0,_0.23)] border-1 focus:border-primary rounded-[4px] w-[100px] hover:border-[rgba(0,_0,_0,_0.87)] placeholder:text-[rgba(0,_0,_0,_0.87)]"
          value={formData.row}
          onChange={(e) => setFormData({ ...formData, row: e.target.value })}
        />
      </div>
    </div>
  );
};

export default InputGroup;
