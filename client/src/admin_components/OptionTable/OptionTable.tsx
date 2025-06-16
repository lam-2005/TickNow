"use client";
import React from "react";

import { CgExport } from "react-icons/cg";

const OptionTable = () => {
  const [searchText, setSearchText] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={"flex-between"}>
      <div>
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={searchText}
          onChange={handleSearch}
          className="min-w-[240px] bg-white border-2 border-border-container py-2 px-2.5 outline-none rounded-[5px] focus:border-primary shadow-primary shadow-[0_0_5px] transition-all duration-300 ease-in-out text-sm"
        />
      </div>

      {/* <button className={"btn"}>
        <span>
          <CgExport />
        </span>
        Xuất dữ liệu
      </button> */}
    </div>
  );
};

export default OptionTable;
