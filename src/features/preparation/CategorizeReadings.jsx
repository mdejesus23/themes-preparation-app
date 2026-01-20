import { memo } from 'react';
import ThemeReading from './ThemeReading';

function CategorizeReadings({ readings }) {
  return (
    <ul className="w-full">
      <h2 className="text-center font-headfont text-xl font-bold text-textPrimary">
        {readings[0]?.category}
      </h2>
      {readings.map((reading) => (
        <ThemeReading key={reading._id} reading={reading} />
      ))}
    </ul>
  );
}

export default memo(CategorizeReadings);
