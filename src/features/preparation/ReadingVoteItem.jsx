import toast from 'react-hot-toast';

function ReadingVoteItem({
  reading,
  setFirstReading,
  setSecondReading,
  setThirdReading,
  setGospel,
}) {
  const { _id, reading: verse, voteCount } = reading;

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
      onClick={() => handleSetFinalReadings()}
      key={_id}
      className={`$ mt-4 flex w-full cursor-pointer items-center justify-between gap-x-1 rounded-xl border p-2`}
    >
      <p className="font-bodyFont font-semibold">{verse}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-red text-lg font-semibold">{voteCount}</p>
      </div>
    </li>
  );
}

export default ReadingVoteItem;
