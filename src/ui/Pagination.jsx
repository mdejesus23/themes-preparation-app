const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-12 flex items-center justify-between space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md bg-yellow px-3 py-1 text-textPrimary hover:bg-borderColor disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-textSecondary">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md bg-yellow px-3 py-1 text-textPrimary hover:bg-borderColor disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
