import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import Button from '../../ui/Button';
import ThemeWithReading from '../../data/themeWithReadings';
import CategorizeReadings from './CategorizeReadings';
import CategoryMenu from '../../ui/CategoryMenu';

const data = ThemeWithReading.readings.map((themeReading) => {
  return { ...themeReading, done: false };
});

function ThemeDetails() {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [themeReadings, SetThemeReadings] = useState(data);

  function toggleDone(id) {
    console.log('click', id);
    SetThemeReadings((prevReading) =>
      prevReading.map((reading) =>
        reading.id === id ? { ...reading, done: !reading.done } : reading,
      ),
    );
  }

  const historical = themeReadings.filter(
    (reading) => reading.category === 'Historical',
  );

  const prophetical = themeReadings.filter(
    (reading) => reading.category === 'Prophetical',
  );

  const epistle = themeReadings.filter(
    (reading) => reading.category === 'Epistle',
  );

  const gospel = themeReadings.filter(
    (reading) => reading.category === 'Gospel',
  );

  const showAllReadings = isCategoryShow === 'all';
  const showHistoricalReadings = isCategoryShow === 'historical';
  const showPropheticalReadings = isCategoryShow === 'prophetical';
  const showEpistleReadings = isCategoryShow === 'epistle';
  const showGospelReadings = isCategoryShow === 'gospel';

  return (
    <>
      <div className="w-full">
        <h1 className="text-center font-headfont text-3xl font-bold md:text-4xl">
          {ThemeWithReading.title}
        </h1>
        <p className="text-center text-xs text-grey">
          {formatDate(ThemeWithReading.createdAt)}
        </p>
        <CategoryMenu setIsCategoryShow={setIsCategoryShow} />
        <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {showAllReadings && (
            <>
              {' '}
              <CategorizeReadings
                toggleDone={toggleDone}
                readings={historical}
              />
              <CategorizeReadings
                toggleDone={toggleDone}
                readings={prophetical}
              />
              <CategorizeReadings toggleDone={toggleDone} readings={epistle} />
              <CategorizeReadings toggleDone={toggleDone} readings={gospel} />
            </>
          )}

          {showHistoricalReadings && (
            <CategorizeReadings toggleDone={toggleDone} readings={historical} />
          )}
          {showPropheticalReadings && (
            <CategorizeReadings
              toggleDone={toggleDone}
              readings={prophetical}
            />
          )}
          {showEpistleReadings && (
            <CategorizeReadings toggleDone={toggleDone} readings={epistle} />
          )}
          {showGospelReadings && (
            <CategorizeReadings toggleDone={toggleDone} readings={gospel} />
          )}
        </div>
      </div>
      <div className="mt-40">
        <Button to={`reading-votes`} type="secondary">
          View reading votes
        </Button>
      </div>
    </>
  );
}

export default ThemeDetails;
