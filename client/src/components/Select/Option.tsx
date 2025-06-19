import React, { useState } from "react";
interface ItemOptionType {
  id: string | number;
  label: string | number;
}

const ItemOption = ({ id, label }: ItemOptionType) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChecked = () => setChecked(!checked);
  return (
    <div
      id={id as string}
      className="flex gap-2.5 items-center  cursor-pointer px-5 py-2.5 hover:bg-foreground hover:text-background"
      onClick={handleChecked}
    >
      {label}
    </div>
  );
};
const Option = ({ label }: { label: string }) => {
  return (
    <div
      className="absolute top-[calc(100%_+_20px)] right-0 bg-background-card w-100 max-h-100 rounded-[10px] shadow-lg shadow-foreground z-1000  text-center
    after:absolute after:size-5 after:rotate-45 after:bg-background-card after:top-0 after:right-5 after:-translate-y-1/2 select-none
    "
    >
      <h2 className="p-5">{label}</h2>
      <hr />
      <div className="flex flex-col max-h-[300px] h-fit overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <ItemOption key={index} id={index} label={`Option ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Option;
