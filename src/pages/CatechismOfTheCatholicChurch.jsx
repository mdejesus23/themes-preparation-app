import Catechism from '../features/catechism/Catechism';

function CatechismOfTheCatholicChurch() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center">
      <h1 className="mb-4 text-center font-headfont text-3xl font-bold md:text-4xl">
        Catechism of the Catholic Church
      </h1>

      <Catechism />
    </div>
  );
}
export default CatechismOfTheCatholicChurch;
