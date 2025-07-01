import React from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";

type PaginationProps = {
  currentPage: number;
  total: number;
  totalPages?: number;
  setPage: (page: number) => void;
  rowPerPage: number;
  setRowPerPage: (row: number) => void;
};
const Pagination = ({
  currentPage,
  total,
  totalPages,
  setPage,
  rowPerPage,
  setRowPerPage,
}: PaginationProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowPerPage(Number(e.target.value));
  };
  return (
    <div className="flex items-center justify-end gap-5">
      <div>Số hàng hiển thị:</div>
      <div className="relative inline-block">
        <select
          value={rowPerPage}
          onChange={handleChange}
          className="peer appearance-none outline-none border border-border-container focus:border-primary focus:ring-1 focus:ring-primary p-1 rounded-lg text-sm bg-white shadow-sm pr-6  transition"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <div className="absolute top-1/2 right-1 -translate-y-1/2 text-lg peer-focus:rotate-180 transition-transform">
          <BiChevronDown />
        </div>
      </div>
      <div>
        Hiển thị {(currentPage - 1) * rowPerPage + 1}–
        {Math.min(currentPage * rowPerPage, total)} của {total} mục
      </div>
      <div className="flex">
        <button
          onClick={() => setPage(currentPage - 1)}
          className={`flex-center text-3xl text-foreground  cursor-pointer ${
            currentPage === 1 ? "text-gray-400 pointer-events-none" : ""
          }`}
        >
          <BiChevronLeft />
        </button>
        <button
          onClick={() => setPage(currentPage + 1)}
          className={`flex-center text-3xl text-foreground  cursor-pointer ${
            totalPages && currentPage === totalPages
              ? "text-gray-400 pointer-events-none"
              : ""
          }`}
        >
          <BiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
