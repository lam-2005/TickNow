"use client";
import React from "react";

export interface Column<T> {
  key?: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
}

const Table = <T extends { _id: string | number }>({
  column,
  data,
  currentPage,
  rowsPerPage,
}: {
  column: Column<T>[];
  data: T[];
  currentPage?: number;
  rowsPerPage?: number;
}) => {
  return (
    <>
      <table
        className="border-collapse w-full overflow-x-auto border-none [&_td]:py-2.5 [&_td]:px-5 [&_td]:text-start
        [&_th]:py-2.5 [&_th]:px-5 [&_th]:text-start"
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
          {data.map((row, index) => (
            <tr key={row._id} className="">
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
          ))}
        </tbody>
      </table>
      <div className="w-full h-px bg-border-container"></div>
    </>
  );
};

export default Table;
