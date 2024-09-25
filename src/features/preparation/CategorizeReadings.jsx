import ThemeReading from './ThemeReading';
import ReadingVoteItem from './ReadingVoteItem';

function CategorizeReadings({ readings, toggleDone }) {
  return (
    <ul className="w-full">
      <h2 className="text-center font-headfont text-xl font-bold">
        {readings[0].category}
      </h2>
      {readings.map((reading) => (
        <ThemeReading
          key={reading.id}
          reading={reading}
          toggleDone={toggleDone}
        />
      ))}
    </ul>
  );
}

export default CategorizeReadings;
