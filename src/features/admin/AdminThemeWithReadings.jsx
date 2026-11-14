import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineArrowPath } from 'react-icons/hi2';
import { formatDate } from '../../utils/formatDate';
import AdminThemeReading from './AdminThemeReading';
import AddReadingForm from './AddReadingForm';
import CategoryMenu from '../../ui/CategoryMenu';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Loader from '../../ui/Loader';
import { useAdminThemesWithReadings } from './useAdminThemesWithReadings';
import ResultBuilder from './ResultBuilder';
import { useReadingOrder } from './useReadingOrder';
import {
  EMPTY_FINAL_READINGS,
  assignReading,
  slotOfVerse,
} from './resultSlots';

// Stable fallback so useReadingOrder's memo doesn't recompute every render.
const EMPTY_LIST = [];

function AdminThemeWithReadings() {
  const { themeId } = useParams();
  const { isPending, data, error } = useAdminThemesWithReadings(themeId);
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [finalReadings, setFinalReadings] = useState(EMPTY_FINAL_READINGS);
  // Song/psalm/notes fields typed in the result form, kept while it's closed.
  const [draftResult, setDraftResult] = useState({});

  const handleAssign = useCallback(
    (slotKey, verse) =>
      setFinalReadings((prev) => assignReading(prev, slotKey, verse)),
    [],
  );
  const handleClear = useCallback(
    (slotKey) => setFinalReadings((prev) => ({ ...prev, [slotKey]: null })),
    [],
  );

  const myThemesWithReadings = data?.data;
  const {
    orderedReadings: readings,
    moveReading,
    stepReading,
    resetOrder,
    isCustomOrder,
  } = useReadingOrder(themeId, myThemesWithReadings?.readings ?? EMPTY_LIST);

  if (isPending) return <Loader />;

  if (error) return <p className="text-textPrimary">{error.message}</p>;

  const { title, createdAt } = myThemesWithReadings ?? {};

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

  // Props shared by the card and row renderings of one reading, including its
  // position in the full sequence and arrow moves within the visible list.
  const visibleIds = filtered.map((r) => r._id);
  const readingProps = (reading, index) => ({
    reading,
    themeId,
    showVotes,
    selectedSlot: slotOfVerse(finalReadings, reading.reading),
    onAssign: handleAssign,
    sequence: readings.indexOf(reading) + 1,
    onMove: moveReading,
    onStep: (direction) => stepReading(reading._id, direction, visibleIds),
    canMoveUp: index > 0,
    canMoveDown: index < filtered.length - 1,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-textSecondary">
            {formatDate(createdAt)}
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

      <ResultBuilder
        title={title}
        finalReadings={finalReadings}
        onAssign={handleAssign}
        onClear={handleClear}
        draftResult={draftResult}
        onDraftChange={setDraftResult}
      />

      {/* Tabs */}
      <CategoryMenu
        setIsCategoryShow={setIsCategoryShow}
        active={isCategoryShow}
      />

      {/* Mobile: stacked cards */}
      <div className="mt-5 sm:hidden">
        {filtered.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {filtered.map((reading, index) => (
              <AdminThemeReading
                key={reading._id}
                {...readingProps(reading, index)}
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
                filtered.map((reading, index) => (
                  <AdminThemeReading
                    key={reading._id}
                    {...readingProps(reading, index)}
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
        <div className="flex items-center gap-3">
          <p className="text-xs text-textSecondary">
            Showing {filtered.length} of {total} readings &middot; drag to
            reorder
          </p>
          {isCustomOrder && (
            <button
              type="button"
              onClick={resetOrder}
              className="inline-flex items-center gap-1 text-xs font-semibold text-textSecondary hover:text-green"
            >
              <HiOutlineArrowPath size={14} /> Reset order
            </button>
          )}
        </div>
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
