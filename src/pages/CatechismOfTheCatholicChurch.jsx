import Catechism from '../features/catechism/Catechism';

function CatechismOfTheCatholicChurch() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          Catechism of the Catholic Church
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Read. Reflect. Live the Faith.
        </p>
      </div>

      <Catechism />
    </div>
  );
}
export default CatechismOfTheCatholicChurch;
