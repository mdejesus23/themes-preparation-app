import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';

import CategorizeReadingWithVotes from './CategorizeReadingWithVotes';
import Button from '../../ui/Button';
import CategoryMenu from '../../ui/CategoryMenu';
import Modal from '../../ui/Modal';
import ResultForm from '../admin/ResultForm';

function ReadingVotesList({ themeWithReadingsVotes }) {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [firstReading, setFirstReading] = useState(null);
  const [secondReading, setSecondReading] = useState(null);
  const [thirdReading, setThirdReading] = useState(null);
  const [gospel, setGospel] = useState(null);

  const finalReadings = {
    firstReading,
    secondReading,
    thirdReading,
    gospel,
  };

  const historical = themeWithReadingsVotes.readings.filter(
    (reading) => reading.category === 'Historical',
  );

  const prophetical = themeWithReadingsVotes.readings.filter(
    (reading) => reading.category === 'Prophetical',
  );

  const epistle = themeWithReadingsVotes.readings.filter(
    (reading) => reading.category === 'Epistle',
  );

  const gospels = themeWithReadingsVotes.readings.filter(
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
          {themeWithReadingsVotes.title}
        </h1>
        <p className="text-center text-xs text-grey">
          {formatDate(themeWithReadingsVotes.createdAt)}
        </p>
        <CategoryMenu setIsCategoryShow={setIsCategoryShow} />
        {/* save result button  */}
        <div className="mx-auto my-10 flex justify-center">
          <Modal>
            <Modal.Open opens="result-form">
              <Button design="secondary">Save final result</Button>
            </Modal.Open>

            <Modal.Window name="result-form">
              <ResultForm
                finalReadings={finalReadings}
                title={themeWithReadingsVotes.title}
              />
            </Modal.Window>
          </Modal>
        </div>

        <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {showAllReadings && (
            <>
              {' '}
              <CategorizeReadingWithVotes
                setGospel={setGospel}
                setThirdReading={setThirdReading}
                setFirstReading={setFirstReading}
                setSecondReading={setSecondReading}
                readings={historical}
              />
              <CategorizeReadingWithVotes
                setGospel={setGospel}
                setThirdReading={setThirdReading}
                setFirstReading={setFirstReading}
                setSecondReading={setSecondReading}
                readings={prophetical}
              />
              <CategorizeReadingWithVotes
                setGospel={setGospel}
                setThirdReading={setThirdReading}
                setFirstReading={setFirstReading}
                setSecondReading={setSecondReading}
                readings={epistle}
              />
              <CategorizeReadingWithVotes
                setGospel={setGospel}
                setThirdReading={setThirdReading}
                setFirstReading={setFirstReading}
                setSecondReading={setSecondReading}
                readings={gospels}
              />
            </>
          )}

          {showHistoricalReadings && (
            <CategorizeReadingWithVotes
              setGospel={setGospel}
              setThirdReading={setThirdReading}
              setFirstReading={setFirstReading}
              setSecondReading={setSecondReading}
              readings={historical}
            />
          )}
          {showPropheticalReadings && (
            <CategorizeReadingWithVotes
              setGospel={setGospel}
              setThirdReading={setThirdReading}
              setFirstReading={setFirstReading}
              setSecondReading={setSecondReading}
              readings={prophetical}
            />
          )}
          {showEpistleReadings && (
            <CategorizeReadingWithVotes
              setGospel={setGospel}
              setThirdReading={setThirdReading}
              setFirstReading={setFirstReading}
              setSecondReading={setSecondReading}
              readings={epistle}
            />
          )}
          {showGospelReadings && (
            <CategorizeReadingWithVotes
              setGospel={setGospel}
              setThirdReading={setThirdReading}
              setFirstReading={setFirstReading}
              setSecondReading={setSecondReading}
              readings={gospels}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ReadingVotesList;
