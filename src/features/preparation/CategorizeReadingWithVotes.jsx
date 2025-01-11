import ReadingVoteItem from './ReadingVoteItem';

function CategorizeReadingWithVotes({
  readings,
  setFirstReading,
  setSecondReading,
  setThirdReading,
  setGospel,
}) {
  return (
    <>
      <ul className="w-full">
        <h2 className="text-center font-headfont text-xl font-bold">
          {readings[0].category}
        </h2>
        {readings.map((reading) => (
          <ReadingVoteItem
            setFirstReading={setFirstReading}
            setSecondReading={setSecondReading}
            setThirdReading={setThirdReading}
            setGospel={setGospel}
            key={reading.id}
            reading={reading}
          />
        ))}
      </ul>
    </>
  );
}

export default CategorizeReadingWithVotes;
