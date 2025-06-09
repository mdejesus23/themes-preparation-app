import { useSongs } from './useSongs';
import Loader from '../../ui/Loader';

function SongBook() {
  const { isPending, data, error } = useSongs();

  // Handle loading state
  if (isPending) return <Loader />;

  if (error) {
    console.error('Error fetching songs:', error);
    return <div className="text-red-500">Failed to load songs.</div>;
  }

  const songs = data?.data;
  console.log('Fetched songs:', songs);

  return (
    <ul className="my-12">
      {songs && songs.length > 0 ? (
        songs.map((song, index) => (
          <li key={index} className="mb-4">
            <a href={`/songs/${song._id}`} className="block">
              <h3 className="cursor-pointer text-lg hover:underline">
                {song.title}
              </h3>
            </a>
          </li>
        ))
      ) : (
        <li>No songs available.</li>
      )}
    </ul>
  );
}

export default SongBook;
