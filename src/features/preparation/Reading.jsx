import { useBibleReading } from './useBibleReadings';
import Loader from '../../ui/Loader';

function Reading({ verse }) {
  const { isPending, data, error } = useBibleReading(verse);

  if (isPending) return <Loader />;

  if (error) {
    console.error('Error fetching office of readings:', error);
    return (
      <p className="text-red-500">{`Failed to load this bible verse ${verse}.`}</p>
    );
  }

  const bibleVerse = data.data.text;

  return (
    <div>
      <h4 className="mb-4 text-center font-bold text-textPrimary">{verse}</h4>
      <p className="text-textSecondary">{bibleVerse}</p>
    </div>
  );
}

export default Reading;
