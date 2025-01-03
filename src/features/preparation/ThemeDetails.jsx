import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import Button from '../../ui/Button';
import CategorizeReadings from './CategorizeReadings';
import CategoryMenu from '../../ui/CategoryMenu';
import useThemeStore from '../../store/themeStore';

function ThemeDetails() {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [isAllReadingsIsDone, setIsAllReadingsIsDone] = useState(false);

  const navigate = useNavigate();
  const { themeId } = useParams();

  const themeWithReadings = useThemeStore((state) => state.themeWithReadings);
  const { readings, title, createdAt, _id: id } = themeWithReadings;

  useEffect(() => {
    // Check if all readings are done
    const allDone = readings.every((reading) => reading.isDone);

    setIsAllReadingsIsDone(allDone);
  }, [readings]); // Dependency array to run whenever 'readings' changes

  useEffect(() => {
    if (themeId !== id) {
      navigate(`/themes`);
    }
  }, [themeId, id, navigate]);

  const historical = readings.filter(
    (reading) => reading.category === 'Historical',
  );

  const prophetical = readings.filter(
    (reading) => reading.category === 'Prophetical',
  );

  const epistle = readings.filter((reading) => reading.category === 'Epistle');

  const gospel = readings.filter((reading) => reading.category === 'Gospel');

  const showAllReadings = isCategoryShow === 'all';
  const showHistoricalReadings = isCategoryShow === 'historical';
  const showPropheticalReadings = isCategoryShow === 'prophetical';
  const showEpistleReadings = isCategoryShow === 'epistle';
  const showGospelReadings = isCategoryShow === 'gospel';

  return (
    <>
      <div className="w-full">
        <h1 className="text-center font-headfont text-3xl font-bold md:text-4xl">
          {title}
        </h1>
        <p className="text-center text-xs text-grey">{formatDate(createdAt)}</p>
        <CategoryMenu setIsCategoryShow={setIsCategoryShow} />
        <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {showAllReadings && (
            <>
              {' '}
              <CategorizeReadings readings={historical} />
              <CategorizeReadings readings={prophetical} />
              <CategorizeReadings readings={epistle} />
              <CategorizeReadings readings={gospel} />
            </>
          )}

          {showHistoricalReadings && (
            <CategorizeReadings readings={historical} />
          )}
          {showPropheticalReadings && (
            <CategorizeReadings readings={prophetical} />
          )}
          {showEpistleReadings && <CategorizeReadings readings={epistle} />}
          {showGospelReadings && <CategorizeReadings readings={gospel} />}
        </div>
      </div>
      <div
        className={`mt-40 ${isAllReadingsIsDone === false ? 'hidden' : 'block'}`}
      >
        <Button
          to={`reading-votes`}
          design="secondary"
          disabled={!isAllReadingsIsDone}
        >
          View reading votes
        </Button>
      </div>
    </>
  );
}

export default ThemeDetails;
