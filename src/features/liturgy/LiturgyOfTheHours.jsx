import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiturgyOfTheHours } from './useLiturgyOfTheHours';
import Loader from '../../ui/Loader';
import { HiArrowSmallRight, HiArrowSmallLeft } from 'react-icons/hi2';

const SEASONS = [
  'Advent',
  'Christmas',
  'Lent',
  'Paschal Time',
  'Ordinary Time',
];

function LiturgyOfTheHours({ season, week }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [seasonState, setSeasonState] = useState(season || '');
  const [weekState, setWeekState] = useState(week || '');
  const { isPending, data, error } = useLiturgyOfTheHours(
    page,
    seasonState,
    weekState,
  );

  if (isPending) return <Loader />;
  if (error) {
    console.error('Error fetching liturgy of the hours:', error);
    return <p className="text-red-500">Failed to load liturgy of the hours.</p>;
  }

  const readings = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalDocuments = data?.totalDocuments || 0;

  const handleSeasonChange = (e) => {
    setSeasonState(e.target.value);
    setWeekState('');
    setPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header with season filter */}
      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-textSecondary">
          {totalDocuments} readings total
        </p>

        <select
          value={seasonState}
          onChange={handleSeasonChange}
          className="rounded-lg border border-borderColor bg-bgPrimary px-3 py-2 text-sm text-textPrimary outline-none transition-colors hover:border-textSecondary focus:border-blue"
        >
          <option value="">All Seasons</option>
          {SEASONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-borderColor">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-borderColor bg-bgSecondary text-xs uppercase text-textSecondary">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Season</th>
              <th className="px-4 py-3">Week</th>
              <th className="hidden px-4 py-3 md:table-cell">Day</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderColor">
            {readings.map((reading, index) => (
              <tr
                key={reading._id}
                onClick={() => navigate(`${reading._id}`)}
                className="cursor-pointer bg-bgPrimary text-textPrimary transition-colors hover:bg-bgSecondary"
              >
                <td className="px-4 py-3 text-textSecondary">
                  {(page - 1) * 20 + index + 1}
                </td>
                <td className="px-4 py-3 font-medium">{reading.title}</td>
                <td className="px-4 py-3">{reading.season}</td>
                <td className="px-4 py-3">{reading.week}</td>
                <td className="hidden px-4 py-3 md:table-cell">
                  {reading.day}
                </td>
              </tr>
            ))}
            {readings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-textSecondary"
                >
                  No readings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition-colors hover:bg-borderColor active:scale-95 disabled:opacity-40"
        >
          <HiArrowSmallLeft size={18} />
          Previous
        </button>

        <span className="text-sm text-textSecondary">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition-colors hover:bg-borderColor active:scale-95 disabled:opacity-40"
        >
          Next
          <HiArrowSmallRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default LiturgyOfTheHours;
