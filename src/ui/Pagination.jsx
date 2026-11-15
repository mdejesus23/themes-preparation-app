import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const ELLIPSIS = '…';

// Page numbers to show: always the first and last page plus `siblings` pages
// on each side of the current one, with an ellipsis for each skipped range.
// e.g. current 6 of 20 → [1, …, 5, 6, 7, …, 20]
function getPageItems(currentPage, totalPages, siblings = 1) {
  // Small enough to show every page: first + last + current ± siblings + 2 gaps
  if (totalPages <= 5 + siblings * 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Keep the same number of slots near either edge so the control doesn't
  // change width as you page: e.g. page 1 of 20 → [1, 2, 3, 4, 5, …, 20].
  // Pages in the run next to an edge: first/last page + one ellipsis + this
  // run always add up to the same 5 + siblings * 2 slots.
  const edgeRun = 3 + siblings * 2;
  let start = currentPage - siblings;
  let end = currentPage + siblings;
  if (start <= 3) {
    start = 2;
    end = edgeRun;
  } else if (end >= totalPages - 2) {
    start = totalPages - edgeRun + 1;
    end = totalPages - 1;
  }
  const items = [1];
  if (start > 2) items.push(ELLIPSIS);
  for (let page = start; page <= end; page++) items.push(page);
  if (end < totalPages - 1) items.push(ELLIPSIS);
  items.push(totalPages);
  return items;
}

const baseBtn =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green disabled:cursor-not-allowed disabled:opacity-40';
const idleBtn =
  'border-borderColor bg-bgPrimary text-textPrimary hover:bg-bgSecondary disabled:hover:bg-bgPrimary';
const activeBtn = 'border-green bg-green text-white';

// `className` sets the outer spacing (defaults to mt-10) so pages can fit it
// into their own layout.
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = 'mt-10',
}) {
  // Nothing to paginate.
  if (!totalPages || totalPages <= 1) return null;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={isFirst}
        aria-label="Previous page"
        className={`${baseBtn} ${idleBtn} gap-1 px-3`}
      >
        <HiChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Desktop/tablet: numbered pages */}
      <ul className="hidden items-center gap-1 sm:flex">
        {getPageItems(currentPage, totalPages).map((item, i) =>
          item === ELLIPSIS ? (
            <li
              key={`ellipsis-${i}`}
              aria-hidden="true"
              className="flex h-9 min-w-9 items-center justify-center text-sm text-textSecondary"
            >
              {ELLIPSIS}
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => goTo(item)}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
                className={`${baseBtn} px-3 ${
                  item === currentPage ? activeBtn : idleBtn
                }`}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      {/* Mobile: compact counter */}
      <span
        aria-live="polite"
        className="px-2 text-sm text-textSecondary sm:hidden"
      >
        Page <span className="font-semibold text-textPrimary">{currentPage}</span>{' '}
        of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={isLast}
        aria-label="Next page"
        className={`${baseBtn} ${idleBtn} gap-1 px-3`}
      >
        <span className="hidden sm:inline">Next</span>
        <HiChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;
