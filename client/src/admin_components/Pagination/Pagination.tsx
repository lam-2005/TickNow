import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxPagesToShow);
    }

    if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    if (start > 1) {
      pages.push(
        <span key="start-ellipsis" className="px-2 py-2 text-sm text-gray-500">
          ...
        </span>
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
            currentPage === i
              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      pages.push(
        <span key="end-ellipsis" className="px-2 py-2 text-sm text-gray-500">
          ...
        </span>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-end py-4 pr-4">
      <nav className="inline-flex shadow-sm rounded-md" aria-label="Pagination">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-2 text-sm font-medium border rounded-l-md bg-white text-gray-500 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          ««
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 text-sm font-medium border bg-white text-gray-500 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          «
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 text-sm font-medium border bg-white text-gray-500 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          »
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 text-sm font-medium border rounded-r-md bg-white text-gray-500 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          »»
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
