import ReadingVoteItem from './ReadingVoteItem';

function CategorizeReadingWithVotes({ readings }) {
  return (
    <>
      <ul className="w-full">
        <h2 className="text-center font-headfont text-xl font-bold">
          {readings[0].category}
        </h2>
        {readings.map((reading) => (
          <ReadingVoteItem key={reading.id} reading={reading} />
        ))}
      </ul>
    </>
  );
}

export default CategorizeReadingWithVotes;
