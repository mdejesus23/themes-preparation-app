import { useSong } from './useSong';
import Loader from '../../ui/Loader';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
      {song ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-4 text-center text-2xl font-bold">{song.title}</h2>
          <img
            src={song.imageUrl}
            alt={song.title}
            className="mb-4 w-full rounded-lg"
          />
        </div>
      ) : (
        <div>No song found.</div>
      )}
    </div>
  );
}

export default SongItem;
