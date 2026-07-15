import toast from 'react-hot-toast';
import useUserStore from '../../store/useUserStore';
import { HiMiniPlus, HiMinusSmall } from 'react-icons/hi2';
import useThemeStore from '../../store/themeStore';

// Maps a reading category to its final-selection slot + label.
const SLOTS = {
  Historical: { key: 'firstReading', label: '1st Reading' },
  Prophetical: { key: 'secondReading', label: '2nd Reading' },
  Epistle: { key: 'thirdReading', label: '3rd Reading' },
  Gospel: { key: 'gospel', label: 'Gospel' },
};

function ReadingVoteItem({
  reading,
  maxVotes = 1,
  finalReadings = {},
  setFirstReading,
  setSecondReading,
  setThirdReading,
  setGospel,
}) {
  const user = useUserStore((state) => state.user);
  const incrementVotes = useThemeStore((state) => state.incrementAdditionalVotes);
  const decrementVotes = useThemeStore((state) => state.decrementAdditionalVotes);
  const themeData = useThemeStore((state) => state.themeWithReadings);

  const { _id, reading: verse, voteCount } = reading;
  const isUserVotedReading = user.votedReadingIds.includes(_id);

  const slot = SLOTS[reading.category];
  const isSelected = slot && finalReadings[slot.key] === verse;

  const handleSelect = () => {
    switch (reading.category) {
      case 'Gospel':
        setGospel(verse);
        break;
      case 'Historical':
        setFirstReading(verse);
        break;
      case 'Prophetical':
        setSecondReading(verse);
        break;
      case 'Epistle':
        setThirdReading(verse);
        break;
      default:
        return;
    }
    toast.success(`Selected as ${slot.label}: ${verse}`);
  };

  const additionalVotes =
    themeData.readings.find((rd) => rd._id === _id)?.additionalVotes || 0;
  const totalVotes = voteCount + additionalVotes;
  const pct = Math.round((totalVotes / maxVotes) * 100);

  return (
    <tr
      className={`border-b border-borderColor last:border-0 ${
        isSelected ? 'bg-sidebarActive' : 'hover:bg-bgSecondary/60'
      }`}
    >
      {/* Reading */}
      <td className="py-3 pl-4 pr-3">
        <div className="flex items-center gap-2">
          {isUserVotedReading && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-green" title="You voted" />
          )}
          <span className="font-medium text-textPrimary">{verse}</span>
        </div>
        <span className="text-xs text-textSecondary">{reading.category}</span>
      </td>

      {/* Votes: bar + count + controls */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-28 overflow-hidden rounded-full bg-progressTrack">
            <div
              className="h-full rounded-full bg-progressFill"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <span className="w-10 text-sm font-semibold text-textPrimary">
            {totalVotes}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => incrementVotes(_id)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-borderColor text-green transition-colors hover:bg-badgeGreenBg"
              aria-label="Add vote"
            >
              <HiMiniPlus />
            </button>
            <button
              onClick={() => decrementVotes(_id)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-borderColor text-red-500 transition-colors hover:bg-red-50"
              aria-label="Remove vote"
            >
              <HiMinusSmall />
            </button>
          </div>
        </div>
      </td>

      {/* Choose as */}
      <td className="py-3 pl-3 pr-4 text-right">
        <button
          onClick={handleSelect}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            isSelected
              ? 'bg-green text-white'
              : 'border border-borderColor bg-bgPrimary text-textSecondary hover:border-green hover:text-green'
          }`}
        >
          <span
            className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
              isSelected ? 'border-white' : 'border-textSecondary'
            }`}
          >
            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
          </span>
          {slot?.label || 'Select'}
        </button>
      </td>
    </tr>
  );
}

export default ReadingVoteItem;
