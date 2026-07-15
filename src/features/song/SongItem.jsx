import { useSong } from './useSong';
import Loader from '../../ui/Loader';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowSmallLeft } from 'react-icons/hi2';

function SongItem() {
  const { songId } = useParams();
  const { isPending, data, error } = useSong(songId);

  const navigate = useNavigate();

  // Handle loading state
  if (isPending) return <Loader />;

  if (error) {
    console.error('Error fetching songs:', error);
    return <div className="text-red-500">Failed to load songs.</div>;
  }

  const song = data?.data;

  return (
    <div className="w-full">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-3 py-2 text-sm font-medium text-textPrimary transition-colors hover:bg-bgSecondary"
        >
          <HiArrowSmallLeft size={18} /> Go Back
        </button>
      </div>
      {song ? (
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-borderColor bg-bgPrimary shadow-sm">
          <img
            src={song.imageUrl}
            alt={song.title}
            className="max-h-[70vh] w-full object-contain"
          />
          <h2 className="p-5 text-center font-headfont text-xl font-bold text-textPrimary">
            {song.title}
          </h2>
        </div>
      ) : (
        <div className="text-textPrimary">No song found.</div>
      )}
    </div>
  );
}

export default SongItem;
