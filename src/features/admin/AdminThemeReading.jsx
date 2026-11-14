import { useState } from 'react';
import {
  HiTrash,
  HiOutlineBars3,
  HiChevronUp,
  HiChevronDown,
} from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CategoryPill from '../../ui/CategoryPill';
import Reading from '../preparation/Reading';
import { useDeleteReading } from './useDeleteReading';
import { useTouchReorder } from './useTouchReorder';
import { useVoteReading } from '../preparation/useVoteReading';
import useUserStore from '../../store/useUserStore';
import {
  RESULT_SLOTS,
  READING_DRAG_TYPE,
  READING_ID_DRAG_TYPE,
} from './resultSlots';

// Renders one reading of an admin-owned theme either as a table row (desktop,
// variant="row") or a stacked card (mobile, variant="card"). Both share the
// same interactions: verse passage modal, category pill, vote count, vote,
// delete, placing the reading into a result slot (by dragging it onto the
// Final Result panel or through the "Add to" picker), and reordering (by
// dragging it onto another reading, or with the up/down arrows, which also
// work on touch screens where native drag and drop doesn't).
function AdminThemeReading({
  reading,
  themeId,
  showVotes = false,
  variant = 'row',
  selectedSlot,
  onAssign,
  sequence,
  onMove,
  onStep,
  canMoveUp = false,
  canMoveDown = false,
}) {
  const { _id: id, reading: verse, voteCount } = reading;
  const { isDeleting, deleteReading } = useDeleteReading(themeId);
  const { isVoting, voteUnvoteReading } = useVoteReading(themeId);
  const isUserVoted = useUserStore(
    (state) => state.user?.votedReadingIds?.includes(id) ?? false,
  );
  const [isDragging, setIsDragging] = useState(false);
  // Where a reading dragged over this one would land: 'before' | 'after'.
  const [dropPosition, setDropPosition] = useState(null);
  // Touch/pointer reordering for the mobile card (native DnD needs a mouse).
  const {
    itemRef,
    handleProps,
    isDragging: isTouchDragging,
    isPointerDragging,
  } = useTouchReorder({ id, onMove });

  const handleVoteToggle = () => {
    voteUnvoteReading(id, {
      onSuccess: () => {
        const store = useUserStore.getState();
        if (isUserVoted) store.removeVotedReadingId(id);
        else store.addVotedReadingId(id);
      },
    });
  };

  const dragProps = {
    draggable: true,
    onDragStart: (e) => {
      // A press on the card's reorder handle is handled by useTouchReorder.
      if (isPointerDragging()) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData(READING_DRAG_TYPE, verse);
      e.dataTransfer.setData(READING_ID_DRAG_TYPE, id);
      e.dataTransfer.setData('text/plain', verse);
      e.dataTransfer.effectAllowed = 'copyMove';
      setIsDragging(true);
    },
    onDragEnd: () => setIsDragging(false),
    // Accept another reading dropped on this one to reorder the list.
    onDragOver: (e) => {
      if (!Array.from(e.dataTransfer.types).includes(READING_ID_DRAG_TYPE))
        return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const rect = e.currentTarget.getBoundingClientRect();
      const position =
        e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
      if (position !== dropPosition) setDropPosition(position);
    },
    onDragLeave: (e) => {
      // Ignore leave events fired when moving between this row's children.
      if (!e.currentTarget.contains(e.relatedTarget)) setDropPosition(null);
    },
    onDrop: (e) => {
      const draggedId = e.dataTransfer.getData(READING_ID_DRAG_TYPE);
      const position = dropPosition;
      setDropPosition(null);
      if (!draggedId) return;
      e.preventDefault();
      onMove?.(draggedId, id, position ?? 'before');
    },
  };

  const dragHandle = (
    <span
      className="hidden cursor-grab text-textSecondary active:cursor-grabbing sm:inline-flex"
      title="Drag to reorder, or into a Final Result slot"
    >
      <HiOutlineBars3 size={16} />
    </span>
  );

  const touchHandle = (
    <span
      {...handleProps}
      role="button"
      aria-label="Drag to reorder"
      title="Drag to reorder"
      className="-m-2 inline-flex shrink-0 cursor-grab select-none p-2 text-textSecondary active:cursor-grabbing"
    >
      <HiOutlineBars3 size={18} />
    </span>
  );

  const sequenceBadge = sequence != null && (
    <span className="w-5 shrink-0 text-right text-xs font-semibold tabular-nums text-textSecondary">
      {sequence}
    </span>
  );

  const arrowClass =
    'flex h-6 w-6 items-center justify-center rounded-full border border-borderColor text-textSecondary transition-colors hover:border-green hover:text-green disabled:opacity-30 disabled:hover:border-borderColor disabled:hover:text-textSecondary';

  const moveButtons = (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onStep?.(-1)}
        disabled={!canMoveUp}
        aria-label="Move up"
        className={arrowClass}
      >
        <HiChevronUp size={14} />
      </button>
      <button
        type="button"
        onClick={() => onStep?.(1)}
        disabled={!canMoveDown}
        aria-label="Move down"
        className={arrowClass}
      >
        <HiChevronDown size={14} />
      </button>
    </div>
  );

  const verseButton = (
    <Modal>
      <Modal.Open opens="reading-verse">
        <button className="text-left font-medium text-textPrimary hover:text-green">
          {verse}
        </button>
      </Modal.Open>
      <Modal.Window name="reading-verse">
        <Reading verse={verse} />
      </Modal.Window>
    </Modal>
  );

  const votes = (
    <span className="text-sm font-semibold text-textPrimary">
      {voteCount ?? 0}
    </span>
  );

  const slotPicker = (
    <select
      value={selectedSlot?.key ?? ''}
      onChange={(e) => e.target.value && onAssign(e.target.value, verse)}
      aria-label={`Add ${verse} to result`}
      className={`rounded-md border px-2 py-1 text-xs font-semibold transition-colors ${
        selectedSlot
          ? 'border-green bg-green text-white'
          : 'border-borderColor bg-bgPrimary text-textSecondary hover:border-green'
      }`}
    >
      <option value="" disabled>
        Add to…
      </option>
      {RESULT_SLOTS.map((slot) => (
        <option key={slot.key} value={slot.key}>
          {slot.label}
        </option>
      ))}
    </select>
  );

  const voteButton = (
    <button
      onClick={handleVoteToggle}
      disabled={isVoting}
      className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-60 ${
        isUserVoted
          ? 'border border-borderColor bg-bgPrimary text-textSecondary hover:bg-bgSecondary'
          : 'bg-green text-white hover:bg-lightGreen'
      }`}
    >
      {isUserVoted ? 'Unvote' : 'Vote'}
    </button>
  );

  const deleteButton = (
    <Modal>
      <Modal.Open opens="delete-reading">
        <button
          disabled={isDeleting}
          className="inline-flex items-center gap-1.5 rounded-md border border-borderColor bg-bgPrimary px-3 py-1 text-xs font-semibold text-red-600 transition-colors hover:border-red-600 hover:bg-red-50 disabled:opacity-60"
        >
          <HiTrash size={14} /> Delete
        </button>
      </Modal.Open>
      <Modal.Window name="delete-reading">
        <ConfirmDelete
          resourceName="Reading"
          disabled={isDeleting}
          onConfirm={() => deleteReading(id)}
        />
      </Modal.Window>
    </Modal>
  );

  const stateClasses = `${isDragging ? 'opacity-50' : ''} ${
    selectedSlot ? 'bg-sidebarActive' : ''
  }`;

  // Green line on the side the dragged reading would land.
  const cardDropIndicator =
    dropPosition === 'before'
      ? 'shadow-[0_-3px_0_var(--custom-green)]'
      : dropPosition === 'after'
        ? 'shadow-[0_3px_0_var(--custom-green)]'
        : '';
  const rowDropIndicator =
    dropPosition === 'before'
      ? '[&>td]:shadow-[inset_0_2px_0_var(--custom-green)]'
      : dropPosition === 'after'
        ? '[&>td]:shadow-[inset_0_-2px_0_var(--custom-green)]'
        : '';

  // Mobile card
  if (variant === 'card') {
    return (
      <li
        {...dragProps}
        ref={itemRef}
        data-reading-id={id}
        className={`rounded-xl border p-4 ${
          selectedSlot ? 'border-green' : 'border-borderColor bg-bgPrimary'
        } ${stateClasses} ${cardDropIndicator} ${
          isTouchDragging
            ? 'relative z-20 bg-bgPrimary opacity-90 shadow-lg'
            : 'shadow-sm transition-transform'
        } data-[drop=after]:shadow-[0_3px_0_var(--custom-green)] data-[drop=before]:shadow-[0_-3px_0_var(--custom-green)]`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {touchHandle}
            {sequenceBadge}
            {verseButton}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <CategoryPill category={reading.category} />
            {moveButtons}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-borderColor pt-3">
          <span className="text-xs text-textSecondary">
            {showVotes &&
              `${voteCount ?? 0} ${voteCount === 1 ? 'vote' : 'votes'}`}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {slotPicker}
            {voteButton}
            {deleteButton}
          </div>
        </div>
      </li>
    );
  }

  // Desktop table row
  return (
    <tr
      {...dragProps}
      className={`border-b border-borderColor last:border-0 ${
        selectedSlot ? '' : 'hover:bg-bgSecondary/60'
      } ${stateClasses} ${rowDropIndicator}`}
    >
      <td className="py-3 pl-4 pr-3">
        <div className="flex items-center gap-2">
          {dragHandle}
          {sequenceBadge}
          {verseButton}
        </div>
      </td>
      <td className="px-3 py-3">
        <CategoryPill category={reading.category} />
      </td>
      {showVotes && <td className="px-3 py-3">{votes}</td>}
      <td className="py-3 pl-3 pr-4">
        <div className="flex items-center justify-end gap-2">
          {slotPicker}
          {voteButton}
          {deleteButton}
        </div>
      </td>
    </tr>
  );
}

export default AdminThemeReading;
