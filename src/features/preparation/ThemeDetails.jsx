import { formatDate } from '../../utils/formatDate';

import ThemeWithReading from '../../data/themeWithReadings';
import CategorizeReadings from './CategorizeReadings';

const historical = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Historical',
);

const prophetical = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Prophetical',
);

const epistle = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Epistle',
);

const gospel = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Gospel',
);

console.log(gospel);
function ThemeDetails() {
  return (
    <div className="w-full">
      <h1 className="text-center font-headfont text-3xl font-bold md:text-4xl">
        {ThemeWithReading.title}
      </h1>
      <p className="text-center text-xs text-grey">
        {formatDate(ThemeWithReading.createdAt)}
      </p>
      <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <CategorizeReadings readings={historical} />
        <CategorizeReadings readings={prophetical} />
        <CategorizeReadings readings={epistle} />
        <CategorizeReadings readings={gospel} />
      </div>
    </div>
  );
}

export default ThemeDetails;
