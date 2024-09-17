import Button from '../../ui/Button';

function CategoryMenu({ setIsCategoryShow }) {
  return (
    <div className="mx-auto mt-6 flex w-full items-center justify-between rounded-md bg-dark font-semibold text-white md:w-[60%] xl:w-[50%]">
      <Button onClick={() => setIsCategoryShow('all')} type="categorySelector">
        All
      </Button>
      <Button
        onClick={() => setIsCategoryShow('historical')}
        type="categorySelector"
      >
        Historical
      </Button>
      <Button
        onClick={() => setIsCategoryShow('prophetical')}
        type="categorySelector"
      >
        Prophetical
      </Button>
      <Button
        onClick={() => setIsCategoryShow('epistle')}
        type="categorySelector"
      >
        Epistle
      </Button>
      <Button
        onClick={() => setIsCategoryShow('gospel')}
        type="categorySelector"
      >
        Gospel
      </Button>
    </div>
  );
}

export default CategoryMenu;
