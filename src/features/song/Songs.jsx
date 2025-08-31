import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../ui/Button';
import { useSongs } from './useSongs';
import Loader from '../../ui/Loader';
import { SONGS_PER_PAGE } from '../../data/constant';
import { HiArrowPath } from 'react-icons/hi2';
import useUserStore from '../../store/useUserStore';

function SongBook() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Derive state from URL
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
    setInputValue(search); // Keep input in sync with URL search query
  }, [search]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = {
      page: '1',
      search: inputValue.trim(),
    };
    if (category) params.category = category;
    setSearchParams(params);
  }

  function handleChangeCategory(newCategory) {
    const params = {
      page: '1',
      category: newCategory,
    };
    setSearchParams(params); // Removes search query when category changes
  }

  function handleReset() {
    setSearchParams({ page: '1' });
  }

  function handlePageChange(newPage) {
    const params = {
      page: newPage.toString(),
    };
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
    <div className="flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search title..."
            className="w-full rounded-sm border border-grey bg-lightGrey px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-yellow"
          />

          <button
            type="button"
            className="absolute right-[0.8rem] top-[9px]"
            onClick={handleReset}
          >
            <HiArrowPath size={20} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button design="primary" type="submit">
            Search
          </Button>
        </div>
      </form>

      <div className="mt-6 w-full">
        <select
          value={category}
          onChange={(e) => handleChangeCategory(e.target.value)}
          className="w-full rounded border border-grey bg-lightGrey px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-yellow"
        >
          <option value="">All Categories</option>
          <option value="pre-catechumenate">Pre-catechumenate</option>
          <option value="catechumenate">Catechumenate</option>
          <option value="election">Election</option>
          <option value="liturgical">Liturgical</option>
        </select>
      </div>

      {/* psalms lists  */}
      <div className="my-12 w-full max-w-3xl space-y-4">
        {songs && songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={song._id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b pb-3 last:border-b-0"
            >
              {/* Song Number */}
              <span className="text-gray-400 w-6 text-right text-sm">
                #{(page - 1) * SONGS_PER_PAGE + index + 1}
              </span>

              {/* Song Title */}
              <a
                href={
                  isAuthenticated
                    ? `/songs/${song._id} `
                    : `/song-book/${song._id}`
                }
                className="truncate text-base font-medium text-blue-700 hover:underline"
              >
                {song.title}
              </a>

              {/* Category */}
              <span className="text-gray-600 truncate text-right text-sm">
                {song.category}
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No songs found.</div>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SongBook;
