import { HiCheck, HiXMark } from 'react-icons/hi2';
import Button from '../../ui/Button';
import useThemeStore from '../../store/themeStore';
import { useParams } from 'react-router-dom';
import { useVoteReading } from './useVoteReading';

function ThemeReading({ reading }) {
  const { _id: id, reading: verse } = reading;
  const toggleReadingDone = useThemeStore((state) => state.toggleReadingDone);
  const toggleVoteReading = useThemeStore((state) => state.toggleVoteReading);
  const { themeId } = useParams();
  const { isVoting, voteUnvoteReading } = useVoteReading(themeId);

  const handleVoteToggle = (readingId) => {
    voteUnvoteReading(readingId, {
      // data in onSuccess is a response data
      onSuccess: () => {
        toggleVoteReading(reading._id);
      },
    });
  };

  return (
    <li
      className={`${reading.isDone ? 'bg-lightGreen' : ''} mt-4 flex w-full items-center justify-between gap-x-1 rounded-xl border p-2`}
    >
      <p className="font-bodyFont font-semibold">{verse}</p>
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
          {reading.voteCount > 0 ? 'Unvote' : 'Vote'}
        </Button>
      </div>
    </li>
  );
}

export default ThemeReading;
