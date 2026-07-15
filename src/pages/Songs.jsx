import SongBook from '../features/song/Songs';

function Songs() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          Psalms / Song Book
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Sing to the Lord a new song.
        </p>
      </div>
      <SongBook />
    </>
  );
}

export default Songs;
