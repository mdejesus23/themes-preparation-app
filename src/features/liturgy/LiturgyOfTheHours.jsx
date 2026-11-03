import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiturgyOfTheHours } from './useLiturgyOfTheHours';
import Loader from '../../ui/Loader';
import {
  HiArrowSmallRight,
  HiArrowSmallLeft,
  HiMagnifyingGlass,
  HiXMark,
} from 'react-icons/hi2';

const SEARCH_DEBOUNCE_MS = 400;

const SEASONS = [
  'Advent',
  'Christmas',
  'Lent',
  'Paschal Time',
  'Ordinary Time',
];

function LiturgyOfTheHours({ season, week }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [seasonState, setSeasonState] = useState(season || '');
  const [weekState, setWeekState] = useState(week || '');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  // Debounce the search input so we don't hit the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        setSearch(trimmed);
        setPage(1);
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput, search]);

  const { isPending, isFetching, data, error } = useLiturgyOfTheHours(
    page,
    seasonState,
    weekState,
    search,
  );

  if (error) {
    console.error('Error fetching liturgy of the hours:', error);
    return <p className="text-red-500">Failed to load liturgy of the hours.</p>;
  }

  const readings = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalDocuments = data?.totalDocuments || 0;

  const handleSeasonChange = (e) => {
    setSeasonState(e.target.value);
    setWeekState('');
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header with search and season filter */}
      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-textSecondary">
          {totalDocuments} {search ? 'matching readings' : 'readings total'}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <HiMagnifyingGlass
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary"
            />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && handleClearSearch()}
              placeholder="Search title, day, week..."
              aria-label="Search liturgy of the hours"
              className="w-full rounded-lg border border-borderColor bg-bgPrimary py-2 pl-9 pr-8 text-sm text-textPrimary outline-none transition-colors placeholder:text-textSecondary hover:border-textSecondary focus:border-blue sm:w-64 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-textSecondary transition-colors hover:text-textPrimary"
              >
                <HiXMark size={16} />
              </button>
            )}
          </div>

          <select
            value={seasonState}
            onChange={handleSeasonChange}
            className="rounded-lg border border-borderColor bg-bgPrimary px-3 py-2 text-sm text-textPrimary outline-none transition-colors hover:border-textSecondary focus:border-blue"
          >
            <option value="">All Seasons</option>
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <>
          {/* Table */}
          <div
            className={`overflow-x-auto rounded-lg border border-borderColor transition-opacity ${isFetching ? 'opacity-60' : ''}`}
          >
            <table className="w-full text-left text-sm">
              <thead className="border-b border-borderColor bg-bgSecondary text-xs uppercase text-textSecondary">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Season</th>
                  <th className="px-4 py-3">Week</th>
                  <th className="hidden px-4 py-3 md:table-cell">Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                {readings.map((reading, index) => (
                  <tr
                    key={reading._id}
                    onClick={() => navigate(`${reading._id}`)}
                    className="cursor-pointer bg-bgPrimary text-textPrimary transition-colors hover:bg-bgSecondary"
                  >
                    <td className="px-4 py-3 text-textSecondary">
                      {(page - 1) * 20 + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium">{reading.title}</td>
                    <td className="px-4 py-3">{reading.season}</td>
                    <td className="px-4 py-3">{reading.week}</td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      {reading.day}
                    </td>
                  </tr>
                ))}
                {readings.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-textSecondary"
                    >
                      {search
                        ? `No readings match "${search}".`
                        : 'No readings found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition-colors hover:bg-borderColor active:scale-95 disabled:opacity-40"
            >
              <HiArrowSmallLeft size={18} />
              Previous
            </button>

            <span className="text-sm text-textSecondary">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition-colors hover:bg-borderColor active:scale-95 disabled:opacity-40"
            >
              Next
              <HiArrowSmallRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LiturgyOfTheHours;
