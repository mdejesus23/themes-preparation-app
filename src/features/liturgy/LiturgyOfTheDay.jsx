function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-borderColor py-2.5 last:border-0">
      <span className="text-sm text-textSecondary">{label}</span>
      <span className="text-right text-sm font-semibold text-textPrimary">
        {value}
      </span>
    </div>
  );
}

function LiturgyOfTheDay({ season, season_week, weekday, celebrations }) {
  const celebration =
    celebrations && celebrations.length > 0
      ? celebrations[0].title
      : 'Weekday';

  return (
    <div className="rounded-2xl border border-borderColor bg-bgPrimary p-5 shadow-sm">
      <h2 className="mb-3 font-headfont text-lg font-bold text-textPrimary">
        Today in the Liturgy
      </h2>
      <div className="flex flex-col">
        <InfoRow label="Season" value={season || '—'} />
        <InfoRow label="Liturgical Week" value={`Week ${season_week}` || '—'} />
        <InfoRow label="Weekday" value={weekday || '—'} />
        <InfoRow label="Celebration" value={celebration} />
      </div>
      {celebrations && celebrations.length > 0 && (
        <ul className="mt-3 space-y-1">
          {celebrations.map((c, idx) => (
            <li key={idx} className="text-xs text-textSecondary">
              {c.title}{' '}
              <span className="opacity-70">
                ({c.rank}, {c.colour})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LiturgyOfTheDay;
