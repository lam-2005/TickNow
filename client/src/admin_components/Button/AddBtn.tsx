import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} className={"btn"}>
      <span>
        <IoMdAdd />
      </span>
      Thêm mới
    </button>
  );
};

export default AddBtn;
