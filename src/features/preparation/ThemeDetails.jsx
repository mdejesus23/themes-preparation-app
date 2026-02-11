import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import Button from '../../ui/Button';
import CategorizeReadings from './CategorizeReadings';
import CategoryMenu from '../../ui/CategoryMenu';
import useThemeStore from '../../store/themeStore';
import { HiMiniArrowDownTray, HiMagnifyingGlass } from 'react-icons/hi2';
import Papa from 'papaparse';
import { HiOutlineArrowSmallRight } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import { useBibleReading } from './useBibleReadings';
import Loader from '../../ui/Loader';

function ThemeDetails() {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [isAllReadingsIsDone, setIsAllReadingsIsDone] = useState(false);
  const [searchVerse, setSearchVerse] = useState('');
  const [submittedVerse, setSubmittedVerse] = useState('');

  // Only fetch when submittedVerse is set
  const {
    isPending: isSearching,
    data: verseData,
    error: searchError,
  } = useBibleReading(submittedVerse || undefined);
  const navigate = useNavigate();
  const { themeId } = useParams();
  const themeWithReadings = useThemeStore((state) => state.themeWithReadings);
  const markAllReadingsDone = useThemeStore(
    (state) => state.markAllReadingsDone,
  );
  const { readings, title, createdAt, _id: id } = themeWithReadings;
  // console.log('themeWithReadings', themeWithReadings);

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

  const handleCsvExport = () => {
    // Restructure the data
    const categories = ['Historical', 'Prophetical', 'Epistle', 'Gospel'];
    const structuredData = [];

    // Find the maximum number of readings in any category
    const maxRows = Math.max(
      ...categories.map(
        (cat) => readings.filter((r) => r.category === cat).length,
      ),
    );

    for (let i = 0; i < maxRows; i++) {
      const row = {};
      categories.forEach((category) => {
        const filteredReadings = readings.filter(
          (r) => r.category === category,
        );
        row[category] = filteredReadings[i]?.reading || '';
      });
      structuredData.push(row);
    }
    // console.log('structuredData', structuredData);
    const csv = Papa.unparse(structuredData);
    const blog = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blog);

    link.setAttribute('href', url);
    link.setAttribute('download', `${title}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-center font-headfont text-3xl font-bold text-textPrimary md:text-4xl">
          {title}
        </h1>

        <p className="text-center text-xs text-textSecondary">
          {formatDate(createdAt)}
        </p>
        <CategoryMenu setIsCategoryShow={setIsCategoryShow} />
        <div className="mt-5 flex justify-center gap-2">
          <Button onClick={markAllReadingsDone} design="secondary">
            Mark All Done
          </Button>
          <Button design="secondary" onClick={handleCsvExport}>
            Export
            <HiMiniArrowDownTray />
          </Button>

          <div
            className={`${isAllReadingsIsDone === false ? 'hidden' : 'flex'}`}
          >
            <Button
              to={`reading-votes`}
              design="secondary"
              disabled={!isAllReadingsIsDone}
            >
              <HiOutlineArrowSmallRight />
            </Button>
          </div>
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
    </>
  );
}

export default ThemeDetails;
