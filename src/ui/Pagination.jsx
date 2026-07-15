const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const btn =
    'rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm font-medium text-textPrimary transition-colors hover:bg-bgSecondary disabled:opacity-40';
  return (
    <div className="mt-10 flex items-center justify-center gap-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={btn}
      >
        Previous
      </button>
      <span className="text-sm text-textSecondary">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={btn}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
