import { HiCheck } from 'react-icons/hi2';
import Button from '../../ui/Button';

function CategorizeReadings({ readings }) {
  return (
    <ul className="w-full">
      <h2 className="text-center font-headfont text-xl font-bold">
        {readings[0].category}
      </h2>
      {readings.map((reading) => (
        <li
          key={reading._id}
          className="mt-4 flex w-full items-center justify-between gap-x-1 rounded-xl border p-2"
        >
          <p className="font-bodyFont font-semibold">{reading.reading}</p>
          <div className="flex items-center gap-x-2">
            <Button className="text-green text-2xl">
              <HiCheck size={30} />
            </Button>
            <Button className="rounded-md bg-yellow px-3 py-1 font-semibold text-dark hover:scale-[1.1]">
              Vote
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CategorizeReadings;
