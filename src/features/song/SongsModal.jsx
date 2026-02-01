import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useSongs } from './useSongs';
import { useSong } from './useSong';
import Loader from '../../ui/Loader';
import { SONGS_PER_PAGE } from '../../data/constant';
import { HiArrowPath, HiArrowLeft } from 'react-icons/hi2';

function SongDetail({ songId, onBack }) {
  const { isPending, data, error } = useSong(songId);

  if (isPending) return <Loader />;

  if (error) {
    console.error('Error fetching song:', error);
    return <div className="text-red-500">Failed to load song.</div>;
  }

  const song = data?.data;

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <HiArrowLeft size={16} />
          Back to list
        </button>
      </div>
      {song ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-4 text-center text-2xl font-bold text-textPrimary">
            {song.title}
          </h2>
          <img
            src={song.imageUrl}
            alt={song.title}
            className="mb-4 w-full rounded-lg"
          />
        </div>
      ) : (
        <div className="text-textPrimary">No song found.</div>
      )}
    </div>
  );
}

function SongsModal() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);

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
    setSearch(inputValue.trim());
    setPage(1);
  }

  function handleChangeCategory(newCategory) {
    setCategory(newCategory);
    setSearch('');
    setInputValue('');
    setPage(1);
  }

  function handleReset() {
    setSearch('');
    setCategory('');
    setInputValue('');
    setPage(1);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handleSongClick(songId) {
    setSelectedSongId(songId);
  }

  function handleBackToList() {
    setSelectedSongId(null);
  }

  // Show song detail view
  if (selectedSongId) {
    return <SongDetail songId={selectedSongId} onBack={handleBackToList} />;
  }

  // Show loading state
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

      {/* songs list */}
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
              <button
                type="button"
                onClick={() => handleSongClick(song._id)}
                className="truncate text-left text-base font-medium text-yellow hover:underline"
              >
                {song.title}
              </button>

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

export default SongsModal;
