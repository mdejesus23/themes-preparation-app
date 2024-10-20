import { HiCheck, HiXMark } from 'react-icons/hi2';
import Button from '../../ui/Button';
import useThemeStore from '../../store/themeStore';

function ThemeReading({ reading }) {
  const { _id: id, reading: verse } = reading;
  const toggleReadingDone = useThemeStore((state) => state.toggleReadingDone);

  return (
    <li
      className={`${reading.isDone ? 'bg-lightGreen' : ''} mt-4 flex w-full items-center justify-between gap-x-1 rounded-xl border p-2`}
    >
      <p className="font-bodyFont font-semibold">{verse}</p>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => toggleReadingDone(id)}
          className="text-2xl text-green"
        >
          {!reading.isDone ? <HiCheck size={30} /> : <HiXMark size={30} />}
        </Button>
        <Button className="rounded-md bg-yellow px-3 py-1 font-semibold text-dark hover:scale-[1.1]">
          Vote
        </Button>
      </div>
    </li>
  );
}

export default ThemeReading;
