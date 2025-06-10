import { useState } from 'react';

import { useSongs } from './useSongs';
import Loader from '../../ui/Loader';
import { SONGS_PER_PAGE } from '../../data/constant';

function SongBook() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  // ✅ Pass search into useSongs hook
  const { isPending, data, error } = useSongs({
    page,
    limit: SONGS_PER_PAGE,
    search,
  });

  if (isPending) return <Loader />;
  if (error) {
    console.error('Error fetching songs:', error);
    return <div className="text-red-500">Failed to load songs.</div>;
  }

  const { data: songs, currentPage, totalPages } = data;

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    setSearch(inputValue.trim()); // Set search term
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search title..."
          className="w-full flex-grow border px-4 py-2 text-sm shadow-sm"
        />
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="submit"
            className="w-full bg-blue-400 px-4 py-2 text-sm text-white hover:bg-blue-500 sm:w-auto"
          >
            Search
          </button>
          <button
            type="button"
            className="w-full bg-red-400 px-4 py-2 text-sm text-white sm:w-auto"
            onClick={() => {
              setInputValue('');
              setSearch('');
              setPage(1); // Reset to first page
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="my-12 w-full overflow-x-auto">
        <table className="border-gray-200 w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-gray-700 border-b px-4 py-2 text-left text-sm font-medium">
                #
              </th>
              <th className="text-gray-700 border-b px-4 py-2 text-left text-sm font-medium">
                Title
              </th>
              <th className="text-gray-700 border-b px-4 py-2 text-left text-sm font-medium">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {songs && songs.length > 0 ? (
              songs.map((song, index) => (
                <tr key={song._id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">
                    {(page - 1) * SONGS_PER_PAGE + index + 1}
                  </td>
                  <td className="border-b px-4 py-2">
                    <a
                      href={`/songs/${song._id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {song.title}
                    </a>
                  </td>
                  <td className="border-b px-4 py-2">{song.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-gray-500 px-4 py-4 text-center">
                  No songs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
