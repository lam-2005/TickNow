"use client";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
type SelectProps<T> = {
  leftIcon: React.ReactNode;
  data: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const SelectComponent = <T,>({
  leftIcon,
  data,
  valueKey,
  labelKey,
  placeholder,
  defaultValue,
  onChange,
}: SelectProps<T>) => {
  const [selected, setSelected] = React.useState(defaultValue || "");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <FormControl className="w-[330px] h-full justify-center">
      <div className="flex items-center px-5">
        {leftIcon}

        <Select
          value={selected}
          onChange={handleChange}
          displayEmpty
          IconComponent={(props) => (
            <BiChevronDown
              {...props}
              style={{
                fontSize: "36px",
                color: "white",
              }}
            />
          )}
          className="text-white rounded-full bg-background-card text-center w-full"
          MenuProps={{
            PaperProps: {
              className: "bg-background-card text-white rounded-xl ",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:focus": {
              border: "none",
              boxShadow: "none",
            },
          }}
        >
          {placeholder && <MenuItem value="">{placeholder}</MenuItem>}
          {data.map((item, idx) => (
            <MenuItem key={idx} value={item[valueKey] as string}>
              {item[labelKey] as string}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
};

export const SelectContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-[80px] bg-background-card rounded-[100px] w-fit flex shadow-foreground items-center [&>div]:not-first:border-l-1 [&>div]:not-first:border-foreground ">
      {children}
    </div>
  );
};

export default SelectContainer;
