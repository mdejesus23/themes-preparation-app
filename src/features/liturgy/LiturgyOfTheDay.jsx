function LiturgyOfTheDay({ date, season, season_week, weekday, celebrations }) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-20">
      <p className="text-center text-sm font-semibold italic">
        {`${season_week} week in ${season} time — ${weekday}, ${formattedDate}`}
      </p>

      <ul className="text-gray-600 mt-2 list-inside list-disc text-sm">
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
