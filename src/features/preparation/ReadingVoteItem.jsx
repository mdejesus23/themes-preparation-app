function ReadingVoteItem({ reading }) {
  const { id, reading: verse, voteCount } = reading;
  return (
    <li
      key={id}
      className={`mt-4 flex w-full items-center justify-between gap-x-1 rounded-xl border p-2`}
    >
      <p className="font-bodyFont font-semibold">{verse}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-lg font-semibold text-red">{voteCount}</p>
      </div>
    </li>
  );
}

export default ReadingVoteItem;
