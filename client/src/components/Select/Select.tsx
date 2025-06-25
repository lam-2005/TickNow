"use client";
import { useTheme } from "@/hooks/contexts/useTheme";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";
import Option from "./Option";

export interface OptionType {
  id: string | number;
  label: string;
  onClick?: () => void;
}

interface SelectFieldProps<T> {
  id: string;
  icon?: React.ReactNode;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  data: T[];
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string | number;
  defaultSelected?: T | null;
  placeholder?: string;
  valueSelect?: (data: any) => void;
}

export function SelectField<T>({
  id,
  icon,
  openId,
  setOpenId,
  data,
  getOptionLabel,
  getOptionValue,
  defaultSelected = null,
  placeholder = "Chọn một mục",
  valueSelect,
}: SelectFieldProps<T>) {
  const [selected, setSelected] = useState<T | null>(defaultSelected);
  const isOpen = openId === id;

  const handleSelect = (option: T) => {
    setSelected(option);
    setOpenId(null);
    valueSelect(option);
  };

  return (
    <div className="relative select-none">
      <div
        onClick={() => setOpenId(isOpen ? null : id)}
        className="h-full flex items-center w-[330px] justify-between px-5 gap-5 cursor-pointer rounded-lg py-3"
      >
        <span className="text-xl">{icon}</span>
        <span className="line-clamp-1">
          {selected ? getOptionLabel(selected) : placeholder}
        </span>
        <span>
          <FaChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </div>

      {isOpen && (
        <Option<T>
          data={data}
          onSelect={handleSelect}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
        />
      )}
    </div>
  );
}

const Select = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-[80px] bg-background-card rounded-[100px] w-fit flex [&>div]:not-first:border-l-1 [&>div]:not-first:border-foreground shadow-foreground  ${
        theme === "light" && "shadow-lg"
      }`}
    >
      {children}
    </div>
  );
};

export default Select;
