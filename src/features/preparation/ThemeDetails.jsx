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
  const markAllReadingsDone = useThemeStore(
    (state) => state.markAllReadingsDone,
  );
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
        <div className="flex justify-center">
          <svg
            width="10rem"
            height="10rem"
            version="1.1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m25 85.969c6.2773-2.2148 12.578-3.3086 18.883-3.3086 6.3008 0 12.629 1.0938 18.883 3.3086l-0.003906-53.078c-12.527-4.6094-25.234-4.6367-37.762 0zm9.3516-48.234c0-0.67578 0.54688-1.2227 1.2227-1.2227h3.3867v-3.3867c0-0.67578 0.54687-1.2227 1.2227-1.2227h5.4688c0.67578 0 1.2227 0.54688 1.2227 1.2227v3.3867h3.3867c0.67578 0 1.2227 0.54688 1.2227 1.2227v5.4688c0 0.67578-0.54688 1.2227-1.2227 1.2227h-3.3867v7.2656c0 0.65234-0.54688 1.2227-1.2227 1.2227h-5.4688c-0.67578 0-1.2227-0.54687-1.2227-1.2227v-7.2656h-3.3867c-0.67578 0-1.2227-0.54688-1.2227-1.2227zm-3.6484 20.055c8.75-3.3086 17.633-3.2812 26.406 0 0.65234 0.23438 0.96484 0.96484 0.73047 1.5898-0.28516 0.65234-0.98828 0.98828-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.625 0.23438-1.3555-0.078125-1.5898-0.73047-0.23047-0.625 0.082032-1.3555 0.73047-1.5898zm0 8.9336c8.75-3.2812 17.633-3.2812 26.406 0 0.65234 0.23438 0.96484 0.96484 0.73047 1.5898-0.28516 0.625-0.98828 0.96484-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.625 0.23438-1.3555-0.078125-1.5898-0.73047-0.23047-0.62891 0.082032-1.3555 0.73047-1.5898zm0 8.9062c8.75-3.2812 17.633-3.2812 26.406 0 0.65234 0.23438 0.96484 0.96484 0.73047 1.5898-0.26172 0.65234-0.98828 0.96484-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.65234 0.23438-1.3555-0.078125-1.5898-0.73047-0.23047-0.62891 0.082032-1.3555 0.73047-1.5898z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
            <path
              d="m41.434 43.18v7.2656h2.9961v-7.2656c0-0.67578 0.54687-1.2227 1.2227-1.2227h3.3867v-2.9961h-3.3867c-0.67578 0-1.2227-0.54688-1.2227-1.2227v-3.3867h-2.9961v3.3867c0 0.67578-0.54688 1.2227-1.2227 1.2227h-3.3867v2.9961h3.3867c0.67578-0.003906 1.2227 0.54297 1.2227 1.2227z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
            <path
              d="m103 32.891c-12.527-4.6094-25.234-4.6094-37.762 0v53.074c12.422-4.375 25.105-4.4531 37.762 0zm-32.086 7.0859c8.75-3.2812 17.633-3.2812 26.406 0 0.625 0.23438 0.96484 0.96484 0.73047 1.5898-0.26172 0.65234-0.96484 0.96484-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.625 0.23438-1.3555-0.078125-1.5898-0.73047-0.23438-0.62891 0.078125-1.3555 0.73047-1.5898zm0 8.9062c8.75-3.2812 17.633-3.2812 26.406 0 0.625 0.23438 0.96484 0.96484 0.73047 1.5898-0.26172 0.65234-0.96484 0.96484-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.625 0.23438-1.3555-0.078125-1.5898-0.73047s0.078125-1.3555 0.73047-1.5898zm0 8.9062c8.75-3.3086 17.633-3.2812 26.406 0 0.625 0.23438 0.96484 0.96484 0.73047 1.5898-0.26172 0.67578-0.96484 0.98828-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.625 0.23438-1.3555-0.078125-1.5898-0.73047-0.23438-0.625 0.078125-1.3555 0.73047-1.5898zm27.137 19.426c-0.26172 0.65234-0.96484 0.96484-1.6133 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.625 0.23438-1.3555-0.078124-1.5898-0.73047-0.23438-0.625 0.078125-1.3555 0.73047-1.5898 8.75-3.2812 17.633-3.2812 26.406 0 0.625 0.23828 0.96484 0.96484 0.73047 1.5898zm0-8.9062c-0.23438 0.625-0.96484 0.96484-1.5898 0.73047-8.1758-3.0742-16.484-3.0742-24.664 0-0.65234 0.23438-1.3555-0.10547-1.6133-0.73047-0.23438-0.625 0.078125-1.3555 0.73047-1.5898 8.75-3.3086 17.633-3.2812 26.406 0 0.625 0.23828 0.96484 0.96484 0.73047 1.5898z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
            <path
              d="m64.457 96.07c-0.28516 0.10547-0.59766 0.10547-0.88672 0l-2.3945-0.9375c-17.266-6.6406-27.762-2.6055-43.648 3.5156-0.80859 0.3125-1.668-0.28516-1.668-1.1445v-64.457h-5.8867v67.918h60.551v-7.1094c-1.1992 0.36328-2.4219 0.80859-3.6719 1.2773z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
            <path
              d="m62.035 92.844 1.9531 0.75391 1.9531-0.75391c1.5352-0.59766 3.0742-1.1211 4.5586-1.5625v-4.375c-2.0039 0.51953-4.1133 1.1992-6.043 1.9531-0.28516 0.10547-0.59766 0.10547-0.88672 0-13.203-4.9727-26.148-5.0781-39.352 0-0.80859 0.3125-1.668-0.28516-1.668-1.1445l0.003907-55.707c0-0.51953 0.3125-0.96484 0.78125-1.1445 13.488-5.1836 27.164-5.2344 40.68-0.15625 13.488-5.0781 27.164-5.0273 40.68 0.15625 0.46875 0.18359 0.78125 0.65234 0.78125 1.1445v55.707c0 0.88672-0.88672 1.457-1.668 1.1445-6.0664-2.3438-12.16-3.5664-18.281-3.75v4.1914c8.0742 0.39062 15.652 3.125 24.195 6.4062v-67.426l-3.5156-1.3555c-13.855-5.3398-27.918-5.625-41.797-0.85938-0.26172 0.078125-0.54688 0.078125-0.80859 0-13.859-4.7383-27.922-4.4492-41.777 0.86328l-3.5156 1.3555v67.426c14.973-5.7344 26.223-9.5859 43.727-2.8672z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
            <path
              d="m72.973 103.78 4.2188-3.75c0.46875-0.41797 1.1719-0.41797 1.6406 0l4.2188 3.75v-18.648c-3.3594 0.078126-6.7188 0.46875-10.078 1.1992v17.449z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
            <path
              d="m112.17 33.047v64.457c0 0.85938-0.88672 1.457-1.668 1.1445-9.3477-3.5938-16.852-6.4844-24.977-6.875v9.1914h32.527v-67.918z"
              fill="#ff9f5b"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-center font-headfont text-3xl font-bold md:text-4xl">
          {title}
        </h1>
        <p className="text-center text-xs text-grey">{formatDate(createdAt)}</p>
        <CategoryMenu setIsCategoryShow={setIsCategoryShow} />
        <div className="mt-5 flex justify-center">
          <Button onClick={markAllReadingsDone} design="secondary">
            Mark All Readings Done
          </Button>
        </div>

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
        className={`mt-10 ${isAllReadingsIsDone === false ? 'hidden' : 'block'}`}
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
