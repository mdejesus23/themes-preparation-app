import { HiCheck, HiXMark } from 'react-icons/hi2';
import Button from '../../ui/Button';
import useThemeStore from '../../store/themeStore';
import { useParams } from 'react-router-dom';
import { useVoteReading } from './useVoteReading';
import useUserStore from '../../store/useUserStore';
import Modal from '../../ui/Modal';
import Reading from './Reading';

function ThemeReading({ reading }) {
  const { _id: id, reading: verse } = reading;
  const toggleReadingDone = useThemeStore((state) => state.toggleReadingDone);
  // const toggleVoteReading = useThemeStore((state) => state.toggleVoteReading);
  const { themeId } = useParams();
  const { isVoting, voteUnvoteReading } = useVoteReading(themeId);
  const user = useUserStore((state) => state.user);

  const isUserVoted = user.votedReadingIds.includes(id);

  const handleVoteToggle = (readingId) => {
    voteUnvoteReading(readingId, {
      onSuccess: () => {
        if (isUserVoted) {
          useUserStore.getState().removeVotedReadingId(readingId); // Remove the ID
        } else {
          useUserStore.getState().addVotedReadingId(readingId); // Add the ID
        }
      },
    });
  };

  return (
    <li
      className={`${reading.isDone ? 'bg-lightGreen' : ''} mt-4 flex w-full items-center justify-between gap-x-1 rounded-xl border p-2`}
    >
      <Modal>
        <Modal.Open opens="reading-verse">
          <p className="font-bodyFont font-semibold text-blue-800">{verse}</p>
        </Modal.Open>

        <Modal.Window name="reading-verse">
          <Reading verse={verse} />
        </Modal.Window>
      </Modal>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => toggleReadingDone(id)}
          className="text-2xl text-green"
        >
          {!reading.isDone ? <HiCheck size={30} /> : <HiXMark size={30} />}
        </Button>
        <Button
          onClick={() => handleVoteToggle(reading._id)}
          disabled={isVoting}
          className="rounded-md bg-yellow px-3 py-1 font-semibold text-dark hover:scale-[1.1]"
        >
          {isUserVoted ? 'Unvote' : 'Vote'}
        </Button>
      </div>
    </li>
  );
}

export default ThemeReading;
