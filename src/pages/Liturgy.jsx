import OfficeOfReadings from '../features/liturgy/OfficeOfReadings';
import LiturgyOfTheDay from '../features/liturgy/LiturgyOfTheDay';

function Liturgy() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center">
      <h1 className="mb-4 font-headfont text-3xl font-bold md:text-4xl">
        Office of the Readings
      </h1>

      {/* <LiturgyOfTheDay /> */}

      {/* Additional content can be added here */}
      <OfficeOfReadings />
    </div>
  );
}
export default Liturgy;
