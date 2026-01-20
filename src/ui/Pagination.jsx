const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex items-center justify-between space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-bgSecondary px-3 py-1 text-textPrimary hover:bg-borderColor disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-textSecondary">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-bgSecondary px-3 py-1 text-textPrimary hover:bg-borderColor disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
