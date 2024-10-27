import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-6 space-x-2">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-l-lg hover:bg-gray-300 transition ${
        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={currentPage === 1}
    >
      «
    </button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-4 py-2 transition ${
          currentPage === page
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        {page}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-r-lg hover:bg-gray-300 transition ${
        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={currentPage === totalPages}
    >
      »
    </button>
  </div>
);

export default Pagination;
