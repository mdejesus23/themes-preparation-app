import { useLiturgyOfTheDay } from './useLiturgyOfTheDay';
import Loader from '../../ui/Loader';

function LiturgyOfTheDay() {
  const { isPending, data, error } = useLiturgyOfTheDay();

  if (isPending) return <Loader />;

  if (error) {
    console.error('Error fetching office of readings:', error);
    return <p className="text-red-500">Failed to load liturgical calendar.</p>;
  }

  const { date, season, season_week, weekday, celebrations } = data.data;

  return (
    <div className="mb-20">
      <p className="text-center text-base font-semibold">
        {`${season_week} week in ${season} time — ${weekday}, ${date}`}
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
