import OfficeOfReadings from '../features/book/OfficeOfReadings';

function Liturgy() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center">
      <h1 className="mb-10 font-headfont text-3xl font-bold md:text-4xl">
        Office of Readings
      </h1>

      {/* Additional content can be added here */}
      <OfficeOfReadings />
    </div>
  );
}
export default Liturgy;
