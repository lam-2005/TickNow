"use client";
import React from "react";

export interface Column<T> {
  key?: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
}

const Table = <
  T extends { _id: string | number; [key: string]: string | number }
>({
  column,
  data,
  currentPage,
  rowsPerPage,
  className,
  id,
}: {
  column: Column<T>[];
  data: T[];
  currentPage?: number;
  rowsPerPage?: number;
  className?: string;
  id?: string;
}) => {
  return (
    <>
      <table
        className={`border-collapse w-full overflow-x-auto border-none [&_td]:py-2.5 [&_td]:px-5 [&_td]:text-start
        [&_th]:py-2.5 [&_th]:px-5 [&_th]:text-start ${className}`}
      >
        <thead className="bg-primary text-white">
          <tr>
            <th>#</th>
            {column.map((col) => (
              <th key={col.title}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody
          className="[&_tr]:bg-[#fdfdfd] [&_tr]:even:bg-[#f0f0f0] [&_tr]:hover:bg-[#f0f0f0]
        "
        >
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row?._id || row[`${id}`]} className="">
                <td>
                  {currentPage && rowsPerPage
                    ? (currentPage - 1) * rowsPerPage + index + 1
                    : index + 1}
                </td>
                {column.map((col) => (
                  <td key={col.title} className="">
                    {col.render
                      ? col.render(row)
                      : col.key
                      ? (row[col.key] as React.ReactNode)
                      : null}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={column.length + 1}>
                <p className="text-center">Không có dữ liệu</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full h-px bg-border-container"></div>
    </>
  );
};

export default Table;
