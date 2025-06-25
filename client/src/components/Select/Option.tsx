import React from "react";
import { OptionType } from "./Select";

export const ItemOption = ({ label, id, onClick }: OptionType) => {
  return (
    <div
      data-id={id}
      onClick={onClick}
      className="flex gap-2.5 items-center cursor-pointer px-5 py-2.5 hover:bg-foreground hover:text-background transition"
    >
      {label}
    </div>
  );
};

interface OptionProps<T> {
  data: T[];
  onSelect: (item: T) => void;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string | number;
}

function Option<T>({
  data,
  onSelect,
  getOptionLabel,
  getOptionValue,
}: OptionProps<T>) {
  return (
    <div
      className="absolute top-[calc(100%_+_20px)] right-0 bg-background-card w-[330px] rounded-[10px] shadow-lg shadow-foreground z-50 text-center
    after:absolute after:size-1 after:border-transparent after:border-b-background-card after:top-0 after:right-5 after:border-[15px]  select-none after:-translate-y-full"
    >
      <div className="flex flex-col max-h-[300px] overflow-y-auto">
        {data.map((item) => (
          <ItemOption
            key={getOptionValue(item)}
            id={getOptionValue(item)}
            label={getOptionLabel(item)}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default Option;
