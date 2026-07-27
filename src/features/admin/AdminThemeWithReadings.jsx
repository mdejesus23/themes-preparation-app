import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi2';
import { formatDate } from '../../utils/formatDate';
import { themeMeta } from '../../utils/placeholderImage';
import AdminThemeReading from './AdminThemeReading';
import AddReadingForm from './AddReadingForm';
import CategoryMenu from '../../ui/CategoryMenu';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Loader from '../../ui/Loader';
import { useAdminThemesWithReadings } from './useAdminThemesWithReadings';

function AdminThemeWithReadings() {
  const { themeId } = useParams();
  const { isPending, data, error } = useAdminThemesWithReadings(themeId);
  const [isCategoryShow, setIsCategoryShow] = useState('all');

  if (isPending) return <Loader />;

  if (error) return <p className="text-textPrimary">{error.message}</p>;

  const myThemesWithReadings = data?.data;
  const { readings = [], title, createdAt } = myThemesWithReadings ?? {};
  const meta = themeMeta(myThemesWithReadings?.id || title);

  const total = readings.length;
  // The admin endpoint may or may not include tallies; only show the column
  // when it actually does, rather than rendering a misleading 0.
  const showVotes = readings.some((r) => typeof r.voteCount === 'number');
  const totalVotes = readings.reduce((sum, r) => sum + (r.voteCount || 0), 0);

  const filtered =
    isCategoryShow === 'all'
      ? readings
      : readings.filter((r) => r.category.toLowerCase() === isCategoryShow);

  const columnCount = showVotes ? 4 : 3;

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
        <div className="flex items-center gap-6 rounded-xl border border-borderColor bg-bgPrimary px-4 py-2.5 shadow-sm">
          <div>
            <p className="text-xs font-medium text-textSecondary">Readings</p>
            <p className="font-headfont text-lg font-bold text-textPrimary">
              {total}
            </p>
          </div>
          {showVotes && (
            <div>
              <p className="text-xs font-medium text-textSecondary">
                Total Votes
              </p>
              <p className="font-headfont text-lg font-bold text-textPrimary">
                {totalVotes}
              </p>
            </div>
          )}
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
              <AdminThemeReading
                key={reading._id}
                reading={reading}
                themeId={themeId}
                showVotes={showVotes}
                variant="card"
              />
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
                <th className="px-3 py-3 font-semibold">Category</th>
                {showVotes && (
                  <th className="px-3 py-3 font-semibold">Votes</th>
                )}
                <th className="py-3 pl-3 pr-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((reading) => (
                  <AdminThemeReading
                    key={reading._id}
                    reading={reading}
                    themeId={themeId}
                    showVotes={showVotes}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columnCount}
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
        <p className="text-xs text-textSecondary">
          Showing {filtered.length} of {total} readings
        </p>
        <Modal>
          <Modal.Open opens="add-reading-form">
            <Button design="secondary">
              <HiOutlinePlus size={18} /> Add Reading
            </Button>
          </Modal.Open>

          <Modal.Window name="add-reading-form">
            <AddReadingForm myThemesWithReadings={myThemesWithReadings} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default AdminThemeWithReadings;
