import LiturgyOfTheHours from '../features/liturgy/LiturgyOfTheHours';
import LiturgyOfTheDay from '../features/liturgy/LiturgyOfTheDay';
import HoursCard from '../features/liturgy/HoursCard';
import Loader from '../ui/Loader';

import { useLiturgyOfTheDay } from '../features/liturgy/useLiturgyOfTheDay';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const todayLabel = today.toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

function Header() {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          Liturgy of the Hours
        </h1>
        <p className="mt-1 text-sm text-textSecondary">Pray without ceasing.</p>
      </div>
      <span className="rounded-lg border border-borderColor bg-bgPrimary px-3 py-1.5 text-sm font-medium text-textSecondary">
        {todayLabel}
      </span>
    </div>
  );
}

function Liturgy() {
  const { isPending, data, error } = useLiturgyOfTheDay(year, month, day);

  if (isPending) return <Loader />;

  if (error) {
    return (
      <div className="w-full">
        <Header />
        <p className="text-red-500">Failed to load liturgical calendar.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <LiturgyOfTheDay
          date={data.data.date}
          season={data.data.season}
          season_week={data.data.season_week}
          weekday={data.data.weekday}
          celebrations={data.data.celebrations}
        />
        <HoursCard />
      </div>

      <div id="liturgy-readings" className="mt-8">
        <h2 className="mb-3 font-headfont text-lg font-bold text-textPrimary">
          Readings & Prayers
        </h2>
        <LiturgyOfTheHours
          season={data.data.season}
          week={data.data.season_week}
        />
      </div>
    </div>
  );
}

export default Liturgy;
