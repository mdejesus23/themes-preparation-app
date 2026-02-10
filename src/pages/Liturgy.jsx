import LiturgyOfTheHours from '../features/liturgy/LiturgyOfTheHours';
import LiturgyOfTheDay from '../features/liturgy/LiturgyOfTheDay';
import Loader from '../ui/Loader';

import { useLiturgyOfTheDay } from '../features/liturgy/useLiturgyOfTheDay';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

function Liturgy() {
  const { isPending, data, error } = useLiturgyOfTheDay(year, month, day);

  if (isPending) return <Loader />;
  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center">
        <h1 className="mb-4 font-headfont text-3xl font-bold md:text-4xl">
          Liturgy of the Hours
        </h1>
        <p className="text-red-500">Failed to load liturgical calendar.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center">
      <h1 className="mb-4 font-headfont text-3xl font-bold md:text-4xl">
        Liturgy of the Hours
      </h1>

      <LiturgyOfTheDay
        date={data.data.date}
        season={data.data.season}
        season_week={data.data.season_week}
        weekday={data.data.weekday}
        celebrations={data.data.celebrations}
      />

      {/* Additional content can be added here */}
      <LiturgyOfTheHours
        season={data.data.season}
        week={data.data.season_week}
      />
    </div>
  );
}
export default Liturgy;
