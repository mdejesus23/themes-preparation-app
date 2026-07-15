import { useEffect, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { HiMagnifyingGlass, HiArrowPath, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSongs } from './useSongs';
import Loader from '../../ui/Loader';
import { SONGS_PER_PAGE } from '../../data/constant';
import useUserStore from '../../store/useUserStore';
import { songImage } from '../../utils/placeholderImage';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'pre-catechumenate', label: 'Pre-catechumenate' },
  { value: 'catechumenate', label: 'Catechumenate' },
  { value: 'election', label: 'Election' },
  { value: 'liturgical', label: 'Liturgical' },
];

function SongBook() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const [inputValue, setInputValue] = useState(search);

  const { isPending, data, error } = useSongs({
    page,
    limit: SONGS_PER_PAGE,
    search,
    category,
  });

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = { page: '1', search: inputValue.trim() };
    if (category) params.category = category;
    setSearchParams(params);
  }

  function handleChangeCategory(newCategory) {
    setSearchParams({ page: '1', category: newCategory });
  }

  function handleReset() {
    setInputValue('');
    setSearchParams({ page: '1' });
  }

  function handlePageChange(newPage) {
    const params = { page: newPage.toString() };
    if (search) params.search = search;
    if (category) params.category = category;
    setSearchParams(params);
  }

  if (isPending) return <Loader />;
  if (error) {
    console.error('Error fetching songs:', error);
    return <div className="text-red-500">Failed to load songs.</div>;
  }

  const { data: songs, currentPage, totalPages } = data;

  return (
    <div className="w-full">
      {/* Search + filter toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <HiMagnifyingGlass
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search psalms or songs..."
            className="w-full rounded-lg border border-borderColor bg-bgPrimary py-2.5 pl-10 pr-10 text-sm text-textPrimary placeholder:text-textSecondary focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          />
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary"
            aria-label="Reset"
          >
            <HiArrowPath size={18} />
          </button>
        </form>

        <select
          value={category}
          onChange={(e) => handleChangeCategory(e.target.value)}
          className="rounded-lg border border-borderColor bg-bgPrimary px-3 py-2.5 text-sm text-textPrimary focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Card grid */}
      {songs && songs.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {songs.map((song) => (
            <li key={song._id}>
              <NavLink
                to={
                  isAuthenticated
                    ? `/songs/${song._id}`
                    : `/song-book/${song._id}`
                }
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-borderColor bg-bgPrimary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="h-28 w-full overflow-hidden">
                  <img
                    src={song.imageUrl || songImage(song._id)}
                    alt={song.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="line-clamp-1 text-sm font-semibold text-textPrimary group-hover:text-green">
                    {song.title}
                  </h3>
                  {song.category && (
                    <p className="mt-0.5 text-xs capitalize text-textSecondary">
                      {song.category}
                    </p>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-borderColor bg-bgPrimary p-10 text-center text-textSecondary">
          No songs found.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm font-medium text-textPrimary transition-colors hover:bg-bgSecondary disabled:opacity-40"
          >
            <HiChevronLeft size={16} /> Prev
          </button>
          <span className="text-sm text-textSecondary">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm font-medium text-textPrimary transition-colors hover:bg-bgSecondary disabled:opacity-40"
          >
            Next <HiChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SongBook;
