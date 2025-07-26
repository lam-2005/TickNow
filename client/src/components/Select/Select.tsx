"use client";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { BiChevronDown } from "react-icons/bi";

type SelectProps<T> = {
  leftIcon: React.ReactNode;
  data: T[];
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const SelectComponent = <T,>({
  leftIcon,
  data,
  getValue,
  getLabel,
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
    <FormControl
      className="bg-background-card max-sm:rounded-full 
  max-sm:w-[300px]!
  lg:w-[300px]
  md:w-[240px]
  sm:w-[200px]
 h-full
     "
    >
      <div className="flex items-center px-3 ">
        <div className="mr-2">{leftIcon}</div>

        <Select
          value={selected}
          onChange={handleChange}
          displayEmpty
          style={{
            textAlign: "center",
          }}
          IconComponent={(props) => (
            <BiChevronDown
              {...props}
              style={{
                fontSize: "1.75rem",
                color: "white",
              }}
            />
          )}
          className="text-white rounded-full bg-background-card text-center w-full"
          MenuProps={{
            PaperProps: {
              className:
                "bg-background-card text-white rounded-xl max-h-[280px]",
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
          {data?.map((item, idx) => (
            <MenuItem key={idx} value={getValue(item)}>
              {getLabel(item)}
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
    <div className="flex gap-3 p-3 max-sm:p-1 bg-background-card rounded-[100px] w-fit shadow-foreground items-center justify-start sm:[&>div]:not-first:border-l-1 sm:[&>div]:not-first:border-foreground max-sm:flex-col max-sm:bg-transparent">
      {children}
    </div>
  );
};

export default SelectContainer;
