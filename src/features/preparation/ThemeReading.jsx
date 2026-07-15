import { HiCheck } from 'react-icons/hi2';
import useThemeStore from '../../store/themeStore';
import { useParams } from 'react-router-dom';
import { useVoteReading } from './useVoteReading';
import useUserStore from '../../store/useUserStore';
import Modal from '../../ui/Modal';
import Reading from './Reading';
import CategoryPill from '../../ui/CategoryPill';

// Renders one reading either as a table row (desktop, variant="row") or a
// stacked card (mobile, variant="card"). Both share the same interactions:
// verse passage modal, category pill, done toggle, and vote/unvote.
function ThemeReading({ reading, variant = 'row' }) {
  const { _id: id, reading: verse } = reading;
  const toggleReadingDone = useThemeStore((state) => state.toggleReadingDone);
  const { themeId } = useParams();
  const { isVoting, voteUnvoteReading } = useVoteReading(themeId);
  const user = useUserStore((state) => state.user);

  const isUserVoted = user.votedReadingIds.includes(id);

  const handleVoteToggle = (readingId) => {
    voteUnvoteReading(readingId, {
      onSuccess: () => {
        if (isUserVoted) {
          useUserStore.getState().removeVotedReadingId(readingId);
        } else {
          useUserStore.getState().addVotedReadingId(readingId);
        }
      },
    });
  };

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

  const statusToggle = (
    <button
      onClick={() => toggleReadingDone(id)}
      title={reading.isDone ? 'Mark not done' : 'Mark done'}
      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
        reading.isDone
          ? 'border-green bg-green text-white'
          : 'border-borderColor text-transparent hover:border-green'
      }`}
    >
      <HiCheck size={16} />
    </button>
  );

  const voteButton = (
    <button
      onClick={() => handleVoteToggle(reading._id)}
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

  // Mobile card
  if (variant === 'card') {
    return (
      <li className="rounded-xl border border-borderColor bg-bgPrimary p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {verseButton}
            <p className="mt-0.5 text-xs text-textSecondary">{verse}</p>
          </div>
          <CategoryPill category={reading.category} />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-borderColor pt-3">
          <span className="flex items-center gap-2 text-xs text-textSecondary">
            {statusToggle}
            {reading.isDone ? 'Done' : 'Mark done'}
          </span>
          {voteButton}
        </div>
      </li>
    );
  }

  // Desktop table row
  return (
    <tr className="border-b border-borderColor last:border-0 hover:bg-bgSecondary/60">
      <td className="py-3 pl-4 pr-3">{verseButton}</td>
      <td className="hidden px-3 py-3 text-sm text-textSecondary sm:table-cell">
        {verse}
      </td>
      <td className="px-3 py-3">
        <CategoryPill category={reading.category} />
      </td>
      <td className="px-3 py-3">{statusToggle}</td>
      <td className="py-3 pl-3 pr-4 text-right">{voteButton}</td>
    </tr>
  );
}

export default ThemeReading;
