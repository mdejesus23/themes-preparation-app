import toast from 'react-hot-toast';
import useUserStore from '../../store/useUserStore';
import { useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import useThemeStore from '../../store/themeStore';
import { HiMinusSmall } from 'react-icons/hi2';

function ReadingVoteItem({
  reading,
  setFirstReading,
  setSecondReading,
  setThirdReading,
  setGospel,
}) {
  const user = useUserStore((state) => state.user);
  const incrementVotes = useThemeStore(
    (state) => state.incrementAdditionalVotes,
  );
  const decrementVotes = useThemeStore(
    (state) => state.decrementAdditionalVotes,
  );
  const themeData = useThemeStore((state) => state.themeWithReadings);

  const { _id, reading: verse, voteCount } = reading;

  const isUserVotedReading = user.votedReadingIds.includes(_id);

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

  const additionalVotes = themeData.readings.find(
    (rd) => rd._id == _id,
  ).additionalVotes;

  const totalVotes = voteCount + additionalVotes;

  return (
    <li
      key={_id}
      className={`mt-4 flex w-full cursor-pointer items-center justify-between gap-x-1 rounded-xl border p-2 transition-colors duration-200 ${totalVotes > 10 ? 'border-green-500' : totalVotes > 5 ? 'border-yellow-500' : 'border-gray-300'}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleSetFinalReadings()}
          className="text-left font-bodyFont font-semibold hover:text-lg"
        >
          {verse}
        </button>

        {/* Tooltip only shown if user voted */}
        {isUserVotedReading && (
          <div className="w-20 rounded bg-lightYellow px-2 py-1 text-xs font-bold text-neutral-700">
            You voted
          </div>
        )}
      </div>

      <div className="flex items-center gap-x-4">
        <button
          onClick={() => incrementVotes(_id)}
          className="text-green-600 transition hover:scale-110"
        >
          <HiMiniPlus />
        </button>
        <span
          className={`text-lg font-bold ${
            totalVotes >= 5
              ? 'text-green'
              : totalVotes > 2
                ? 'text-blue-800'
                : 'text-neutral-800'
          }`}
        >
          {totalVotes}
        </span>
        <button
          onClick={() => decrementVotes(_id)}
          className="text-red-500 transition hover:scale-110"
        >
          <HiMinusSmall />
        </button>
      </div>
    </li>
  );
}

export default ReadingVoteItem;
