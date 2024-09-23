import resultArray from '../../data/results';
import { formatDate } from '../../utils/formatDate';

function Results() {
  return (
    <ul className="my-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
      {resultArray.map((item) => {
        return (
          <li className="flex transform cursor-pointer flex-col items-center gap-y-5 border border-lightGrey bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
            <div>
              <h2 className="font-headfont text-lg">{item.title}</h2>
              <p className="text-xs text-grey">{formatDate(item.createdAt)}</p>
            </div>

            <div className="flex w-full gap-x-2">
              <p className="font-headfont">First reading:</p>
              <p>{item.firstReading}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">First psalm:</p>
              <p>{item.firstPsalm}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Second reading:</p>
              <p>{item.secondReading}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Second psalm:</p>
              <p>{item.secondPsalm}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Third reading:</p>
              <p>{item.thirdReading}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Third psalm:</p>
              <p>{item.thirdPsalm}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Gospel:</p>
              <p>{item.gospel}</p>
            </div>

            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Final song:</p>
              <p>{item.finalSong}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Results;
