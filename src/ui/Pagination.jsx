import { useId, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const ELLIPSIS = '…';

// Show the "Go to page" box only when some pages are hidden behind an ellipsis.
const JUMP_THRESHOLD = 7;

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

// Bring the top of the list back into view (and give it focus, so screen
// readers continue from the new results instead of the pagination controls).
function scrollToTarget(target) {
  const el = target?.current;
  if (!el) return;
  const reduceMotion = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  el.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  });
  el.focus?.({ preventScroll: true });
}

const baseBtn =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green disabled:cursor-not-allowed disabled:opacity-40';
const idleBtn =
  'border-borderColor bg-bgPrimary text-textPrimary hover:bg-bgSecondary disabled:hover:bg-bgPrimary';
const activeBtn = 'border-green bg-green text-white';

function PageList({ items, currentPage, onSelect, disabled, className }) {
  return (
    <ul className={`items-center gap-1 ${className}`}>
      {items.map((item, i) =>
        item === ELLIPSIS ? (
          <li
            key={`ellipsis-${i}`}
            aria-hidden="true"
            className="flex h-9 min-w-6 items-center justify-center text-sm text-textSecondary sm:min-w-9"
          >
            {ELLIPSIS}
          </li>
        ) : (
          <li key={item}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              disabled={disabled && item !== currentPage}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? 'page' : undefined}
              className={`${baseBtn} px-2.5 sm:px-3 ${
                item === currentPage ? activeBtn : idleBtn
              }`}
            >
              {item}
            </button>
          </li>
        ),
      )}
    </ul>
  );
}

function JumpToPage({ totalPages, onJump, disabled }) {
  const [value, setValue] = useState('');
  const inputId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    const page = parseInt(value, 10);
    if (Number.isNaN(page)) return;
    onJump(Math.min(Math.max(page, 1), totalPages));
    setValue('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 text-sm text-textSecondary"
    >
      <label htmlFor={inputId}>Go to page</label>
      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        min={1}
        max={totalPages}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder="#"
        className="h-9 w-16 rounded-lg border border-borderColor bg-bgPrimary px-2 text-center text-textPrimary outline-none [appearance:textfield] focus:border-green focus:ring-1 focus:ring-green disabled:opacity-40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="submit"
        disabled={disabled || !value}
        className={`${baseBtn} ${idleBtn} px-3`}
      >
        Go
      </button>
    </form>
  );
}

// Props:
// - `className` sets the outer spacing (defaults to mt-10).
// - `totalItems` + `pageSize` show a "Showing 21–40 of 192" summary.
// - `itemLabel` names the items in that summary (e.g. "songs").
// - `scrollTarget` is a ref to the top of the list; it's scrolled into view
//   and focused after a page change. Give that element tabIndex={-1}.
// - `disabled` locks the controls while the next page is loading.
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = 'mt-10',
  totalItems,
  pageSize,
  itemLabel = 'results',
  scrollTarget,
  disabled = false,
}) {
  // Nothing to paginate.
  if (!totalPages || totalPages <= 1) return null;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const goTo = (page) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage)
      return;
    onPageChange(page);
    scrollToTarget(scrollTarget);
  };

  const showSummary = totalItems > 0 && pageSize > 0;
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);
  const showJump = totalPages > JUMP_THRESHOLD;

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <nav
        aria-label="Pagination"
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={isFirst || disabled}
          aria-label="Previous page"
          className={`${baseBtn} ${idleBtn} gap-1 px-2.5 sm:px-3`}
        >
          <HiChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Mobile: current page only between first/last */}
        <PageList
          items={getPageItems(currentPage, totalPages, 0)}
          currentPage={currentPage}
          onSelect={goTo}
          disabled={disabled}
          className="flex sm:hidden"
        />
        {/* Tablet/desktop: one neighbour on each side */}
        <PageList
          items={getPageItems(currentPage, totalPages, 1)}
          currentPage={currentPage}
          onSelect={goTo}
          disabled={disabled}
          className="hidden sm:flex"
        />

        <button
          type="button"
          onClick={() => goTo(currentPage + 1)}
          disabled={isLast || disabled}
          aria-label="Next page"
          className={`${baseBtn} ${idleBtn} gap-1 px-2.5 sm:px-3`}
        >
          <span className="hidden sm:inline">Next</span>
          <HiChevronRight size={16} />
        </button>
      </nav>

      {(showSummary || showJump) && (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {showSummary && (
            <p className="text-sm text-textSecondary">
              Showing{' '}
              <span className="font-medium text-textPrimary">
                {rangeStart}–{rangeEnd}
              </span>{' '}
              of{' '}
              <span className="font-medium text-textPrimary">{totalItems}</span>{' '}
              {itemLabel}
            </p>
          )}
          {showJump && (
            <JumpToPage
              totalPages={totalPages}
              onJump={goTo}
              disabled={disabled}
            />
          )}
        </div>
      )}

      {/* Announce page changes on every screen size */}
      <p aria-live="polite" className="sr-only">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default Pagination;
