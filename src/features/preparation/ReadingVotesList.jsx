import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';

import themeData from '../../data/votedReading';

import CategorizeReadingWithVotes from './CategorizeReadingWithVotes';
import Button from '../../ui/Button';
import CategoryMenu from '../../ui/CategoryMenu';
import Modal from '../../ui/Modal';
import ResultForm from '../admin/ResultForm';

const data = themeData.readings;

function ReadingVotesList() {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [themeReadings, SetThemeReadings] = useState(data);

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
          {themeData.title}
        </h1>
        <p className="text-center text-xs text-grey">
          {formatDate(themeData.createdAt)}
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
            <Button type="secondary">Save final result</Button>
          </Modal.Open>

          <Modal.Window name="result-form">
            <ResultForm />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default ReadingVotesList;
