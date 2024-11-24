import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';

import CategorizeReadingWithVotes from './CategorizeReadingWithVotes';
import Button from '../../ui/Button';
import CategoryMenu from '../../ui/CategoryMenu';
import Modal from '../../ui/Modal';
import ResultForm from '../admin/ResultForm';

function ReadingVotesList({ themeWithReadingsVotes }) {
  const [isCategoryShow, setIsCategoryShow] = useState('all');

  const historical = themeWithReadingsVotes.readings.filter(
    (reading) => reading.category === 'Historical',
  );

  const prophetical = themeWithReadingsVotes.readings.filter(
    (reading) => reading.category === 'Prophetical',
  );

  const epistle = themeWithReadingsVotes.readings.filter(
    (reading) => reading.category === 'Epistle',
  );

  const gospel = themeWithReadingsVotes.readings.filter(
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
        <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {showAllReadings && (
            <>
              {' '}
              <CategorizeReadingWithVotes readings={historical} />
              <CategorizeReadingWithVotes readings={prophetical} />
              <CategorizeReadingWithVotes readings={epistle} />
              <CategorizeReadingWithVotes readings={gospel} />
            </>
          )}

          {showHistoricalReadings && (
            <CategorizeReadingWithVotes readings={historical} />
          )}
          {showPropheticalReadings && (
            <CategorizeReadingWithVotes readings={prophetical} />
          )}
          {showEpistleReadings && (
            <CategorizeReadingWithVotes readings={epistle} />
          )}
          {showGospelReadings && (
            <CategorizeReadingWithVotes readings={gospel} />
          )}
        </div>
      </div>
      <div className="mt-40">
        <Modal>
          <Modal.Open opens="result-form">
            <Button design="secondary">Save final result</Button>
          </Modal.Open>

          <Modal.Window name="result-form">
            <ResultForm themeWithReadingsVotes={themeWithReadingsVotes} />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default ReadingVotesList;
