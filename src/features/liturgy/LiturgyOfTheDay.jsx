import { useLiturgyOfTheDay } from './useLiturgyOfTheDay';
import Loader from '../../ui/Loader';

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

function LiturgyOfTheDay() {
  const { isPending, data, error } = useLiturgyOfTheDay(year, month, day);

  if (isPending) return <Loader />;

  if (error) {
    console.error('Error fetching office of readings:', error);
    return <p className="text-red-500">Failed to load liturgical calendar.</p>;
  }

  const { date, season, season_week, weekday, celebrations } = data.data;
  const formattedDate = new Date(date.toString()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-20">
      <p className="text-center text-base font-semibold">
        {`${season_week} week in ${season} time — ${weekday}, ${formattedDate}`}
      </p>

      <ul className="text-gray-600 mt-2 list-inside list-disc">
        {celebrations.map((c, idx) => (
          <li key={idx}>
            {c.title}{' '}
            <span className="text-gray-500 text-sm">
              ({c.rank}, {c.colour})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiturgyOfTheDay;
