// Pagination.tsx
import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-end py-4 pr-4">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
          disabled
        >
          ««
        </button>
        <button
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-l border-gray-300 hover:bg-gray-50"
          disabled
        >
          «
        </button>

        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          disabled
        >
          1
        </button>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          ...
        </span>
        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          disabled
        >
          4
        </button>
        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
          disabled
        >
          5
        </button>
        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          disabled
        >
          6
        </button>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          ...
        </span>
        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          disabled
        >
          10
        </button>

        <button
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50"
          disabled
        >
          »
        </button>
        <button
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
          disabled
        >
          »»
        </button>
      </nav>
    </div>
  );
};

export default Pagination;