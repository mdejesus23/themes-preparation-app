import toast from 'react-hot-toast';
import useUserStore from '../../store/useUserStore';
import { HiMiniPlus, HiMinusSmall } from 'react-icons/hi2';
import useThemeStore from '../../store/themeStore';

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
        toast.success(`Reading set as Gospel: ${verse}`);
        break;
      case 'Historical':
        setFirstReading(verse);
        toast.success(`Reading set as First Reading: ${verse}`);
        break;
      case 'Prophetical':
        setSecondReading(verse);
        toast.success(`Reading set as Second Reading: ${verse}`);
        break;
      case 'Epistle':
        setThirdReading(verse);
        toast.success(`Reading set as Third Reading: ${verse}`);
        break;
      default:
        console.warn('Unknown category:', reading.category);
    }
  };

  const additionalVotes =
    themeData.readings.find((rd) => rd._id === _id)?.additionalVotes || 0;
  const totalVotes = voteCount + additionalVotes;

  return (
    <li
      key={_id}
      className={`mt-4 flex w-full items-center justify-between gap-x-4 rounded-xl border bg-bgSecondary p-3 transition-colors duration-200 ${
        totalVotes > 10
          ? 'border-green-500'
          : totalVotes > 5
            ? 'border-yellow-500'
            : 'border-borderColor'
      }`}
    >
      <div className="flex items-center gap-4">
        {isUserVotedReading && (
          <figure className="flex flex-col items-center">
            <div className="border-green-500 h-8 w-8 shrink-0 overflow-hidden rounded-full border-2">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt={`photo of ${user.username}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center font-bold text-textPrimary">
                  {user.username[0]}
                </div>
              )}
            </div>
            <figcaption className="mt-1 max-w-[4rem] truncate text-center text-[10px] font-medium text-textSecondary">
              {user.username}
            </figcaption>
          </figure>
        )}

        <div>
          <button
            onClick={handleSetFinalReadings}
            className="text-left font-bodyFont font-semibold text-textPrimary hover:text-lg"
          >
            {verse}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <button
          onClick={() => incrementVotes(_id)}
          className="text-green-600 transition hover:scale-110"
        >
          <HiMiniPlus />
        </button>
        <span
          className={`text-lg font-bold ${
            totalVotes >= 5
              ? 'text-green-600'
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
