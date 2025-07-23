import React from "react";
import { IoReload } from "react-icons/io5";

const LoadData = ({ onChangeData }: { onChangeData: () => Promise<void> }) => {
  return (
    <button className="btn bg-primary w-fit py-1 px-4" onClick={onChangeData}>
      <IoReload className="text-xl" />{" "}
      <span className="text-base font-normal">Tải dữ liệu</span>
    </button>
  );
};

export default LoadData;
