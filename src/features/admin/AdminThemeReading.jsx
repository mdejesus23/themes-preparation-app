import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CategoryPill from '../../ui/CategoryPill';
import Reading from '../preparation/Reading';
import { useDeleteReading } from './useDeleteReading';

// Renders one reading of an admin-owned theme either as a table row (desktop,
// variant="row") or a stacked card (mobile, variant="card"). Both share the
// same interactions: verse passage modal, category pill, vote count, and
// delete. Mirrors ThemeReading, with the vote action swapped for delete.
function AdminThemeReading({
  reading,
  themeId,
  showVotes = false,
  variant = 'row',
}) {
  const { _id: id, reading: verse, voteCount } = reading;
  const { isDeleting, deleteReading } = useDeleteReading(themeId);

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

  // Mobile card
  if (variant === 'card') {
    return (
      <li className="rounded-xl border border-borderColor bg-bgPrimary p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">{verseButton}</div>
          <CategoryPill category={reading.category} />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-borderColor pt-3">
          <span className="text-xs text-textSecondary">
            {showVotes && `${voteCount ?? 0} ${voteCount === 1 ? 'vote' : 'votes'}`}
          </span>
          {deleteButton}
        </div>
      </li>
    );
  }

  // Desktop table row
  return (
    <tr className="border-b border-borderColor last:border-0 hover:bg-bgSecondary/60">
      <td className="py-3 pl-4 pr-3">{verseButton}</td>
      <td className="px-3 py-3">
        <CategoryPill category={reading.category} />
      </td>
      {showVotes && <td className="px-3 py-3">{votes}</td>}
      <td className="py-3 pl-3 pr-4 text-right">{deleteButton}</td>
    </tr>
  );
}

export default AdminThemeReading;
