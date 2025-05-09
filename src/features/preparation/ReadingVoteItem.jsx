import toast from 'react-hot-toast';
import useUserStore from '../../store/useUserStore';
import { useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';

function ReadingVoteItem({
  reading,
  setFirstReading,
  setSecondReading,
  setThirdReading,
  setGospel,
}) {
  const [additionalVotes, setAdditionalVotes] = useState(0);
  const user = useUserStore((state) => state.user);
  console.log('user', user.votedReadingIds);

  const { _id, reading: verse, voteCount } = reading;
  console.log('reading', reading);

  const isUserVotedReading = user.votedReadingIds.includes(_id);
  console.log('isUserVotedReading', isUserVotedReading);

  const handleSetFinalReadings = () => {
    switch (reading.category) {
      case 'Gospel':
        setGospel(verse);
        toast.success(`reading set as gospel: ${verse}`);
        break;
      case 'Historical':
        setFirstReading(verse);
        toast.success(`reading set as first reading: ${verse}`);
        break;
      case 'Prophetical':
        setSecondReading(verse);
        toast.success(`reading set as second reading: ${verse}`);
        break;
      case 'Epistle':
        setThirdReading(verse);
        toast.success(`reading set as third reading: ${verse}`);
        break;
      default:
        console.warn('Unknown category:', reading.category);
    }
  };

  return (
    <li
      key={_id}
      className={`${isUserVotedReading ? 'bg-lightGreen text-neutral-700' : ''} mt-4 flex w-full cursor-pointer items-center justify-between gap-x-1 rounded-xl border p-2`}
    >
      <button
        onClick={() => handleSetFinalReadings()}
        className="font-bodyFont font-semibold hover:text-lg"
      >
        {verse}
      </button>
      <div className="flex items-center gap-x-2">
        <button onClick={() => setAdditionalVotes((prev) => prev + 1)}>
          <HiMiniPlus />
        </button>
        <p className="text-red text-lg font-semibold">
          {voteCount + additionalVotes}
        </p>
      </div>
    </li>
  );
}

export default ReadingVoteItem;
