import React, { useState } from "react";
import Button from "../Button/Button";
interface ItemOptionType {
  id: string | number;
  label: string | number;
}

const ItemOption = ({ id, label }: ItemOptionType) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChecked = () => setChecked(!checked);
  return (
    <div
      className="flex gap-2.5 items-center w-1/2 cursor-pointer"
      onClick={handleChecked}
    >
      <div
        id={id as string}
        className={`${
          checked && "after:size-4 "
        } size-5 rounded-[5px] border-1 border-foreground relative after:absolute after:rounded-[5px] after:top-1/2 after:left-1/2 after:-translate-1/2 after:bg-foreground`}
      ></div>
      <label htmlFor={id as string}>{label}</label>
    </div>
  );
};

const Option = ({ label }: { label: string }) => {
  return (
    <div
      className="absolute top-[calc(100%_+_20px)] right-0 bg-background-card w-100 max-h-100 rounded-[10px] shadow-lg shadow-foreground z-1000 p-5 space-y-[15px] text-center
    after:absolute after:size-5 after:rotate-45 after:bg-background-card after:top-0 after:right-5 after:-translate-y-1/2 select-none
    "
    >
      <h2>{label}</h2>
      <hr />
      <div className="flex flex-wrap gap-y-5 max-h-[300px] h-fit  overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <ItemOption key={index} id={index} label={`Option ${index}`} />
        ))}
      </div>
      <div className="flex-column items-end gap-2.5">
        <button className="font-bold text-primary">Làm mới</button>
        <Button title="Chọn" className="w-full" />
      </div>
    </div>
  );
};

export default Option;
