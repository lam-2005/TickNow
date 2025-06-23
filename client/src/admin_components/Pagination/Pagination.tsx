import React from "react";

type Props = {
  currentPage: number;
  total: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  total,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(total / rowsPerPage);
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(startItem + rowsPerPage - 1, total);

  return (
    <div className="flex items-center justify-end space-x-4 p-4">
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <span>Rows per page:</span>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {[5, 10, 20].map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-700">
        {startItem}–{endItem} of {total}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          &lt;
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
