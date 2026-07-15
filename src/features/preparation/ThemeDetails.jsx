import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { themeMeta } from '../../utils/placeholderImage';
import ThemeReading from './ThemeReading';
import CategoryMenu from '../../ui/CategoryMenu';
import useThemeStore from '../../store/themeStore';
import {
  HiMiniArrowDownTray,
  HiOutlineArrowSmallRight,
  HiCheck,
} from 'react-icons/hi2';
import Papa from 'papaparse';

function ThemeDetails() {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const navigate = useNavigate();
  const { themeId } = useParams();
  const themeWithReadings = useThemeStore((state) => state.themeWithReadings);
  const markAllReadingsDone = useThemeStore(
    (state) => state.markAllReadingsDone,
  );
  const { readings, title, createdAt, _id: id } = themeWithReadings;
  const meta = themeMeta(id || title);

  const doneCount = readings.filter((r) => r.isDone).length;
  const total = readings.length;
  const isAllReadingsIsDone = total > 0 && doneCount === total;
  const progressPct = total ? Math.round((doneCount / total) * 100) : 0;

  useEffect(() => {
    if (themeId !== id) {
      navigate(`/themes`);
    }
  }, [themeId, id, navigate]);

  const filtered =
    isCategoryShow === 'all'
      ? readings
      : readings.filter((r) => r.category.toLowerCase() === isCategoryShow);

  const handleCsvExport = () => {
    const categories = ['Historical', 'Prophetical', 'Epistle', 'Gospel'];
    const structuredData = [];
    const maxRows = Math.max(
      0,
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
    const csv = Papa.unparse(structuredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${title}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-textSecondary">
            {formatDate(createdAt)} &middot; {meta.year} &middot; {meta.color}
          </p>
        </div>
        <div className="min-w-[180px]">
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-textSecondary">
            <span>Readings Progress</span>
            <span>
              {doneCount} / {total}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-progressTrack">
            <div
              className="h-full rounded-full bg-progressFill transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <CategoryMenu
        setIsCategoryShow={setIsCategoryShow}
        active={isCategoryShow}
      />

      {/* Mobile: stacked cards */}
      <div className="mt-5 sm:hidden">
        {filtered.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {filtered.map((reading) => (
              <ThemeReading key={reading._id} reading={reading} variant="card" />
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-borderColor bg-bgPrimary py-10 text-center text-textSecondary">
            No readings in this category.
          </p>
        )}
      </div>

      {/* Desktop: table */}
      <div className="mt-5 hidden overflow-hidden rounded-2xl border border-borderColor bg-bgPrimary shadow-sm sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-borderColor bg-bgSecondary text-left text-xs font-semibold uppercase tracking-wide text-textSecondary">
                <th className="py-3 pl-4 pr-3 font-semibold">Reading</th>
                <th className="hidden px-3 py-3 font-semibold sm:table-cell">
                  Reference
                </th>
                <th className="px-3 py-3 font-semibold">Category</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="py-3 pl-3 pr-4 text-right font-semibold">Vote</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((reading) => (
                  <ThemeReading key={reading._id} reading={reading} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-textSecondary"
                  >
                    No readings in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={markAllReadingsDone}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2.5 text-sm font-semibold text-textPrimary transition-colors hover:bg-bgSecondary sm:w-auto sm:justify-start"
        >
          <HiCheck size={18} /> Mark All Done
        </button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={handleCsvExport}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2.5 text-sm font-semibold text-textPrimary transition-colors hover:bg-bgSecondary sm:w-auto"
          >
            <HiMiniArrowDownTray size={18} /> Export Readings (CSV)
          </button>
          {isAllReadingsIsDone ? (
            <Link
              to="reading-votes"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lightGreen sm:w-auto"
            >
              Proceed to Reading Votes <HiOutlineArrowSmallRight size={18} />
            </Link>
          ) : (
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white opacity-50 sm:w-auto"
            >
              Proceed to Reading Votes <HiOutlineArrowSmallRight size={18} />
            </button>
          )}
        </div>
      </div>
      {!isAllReadingsIsDone && (
        <p className="mt-2 text-right text-xs text-textSecondary">
          Mark all readings done to proceed to voting.
        </p>
      )}
    </div>
  );
}

export default ThemeDetails;
