import Button from './Button';

function CategoryMenu({ setIsCategoryShow }) {
  return (
    <div className="mx-auto mt-6 flex w-full items-center justify-between rounded-md bg-dark font-semibold text-white md:w-[60%] xl:w-[50%]">
      <Button
        onClick={() => setIsCategoryShow('all')}
        design="categorySelector"
      >
        All
      </Button>
      <Button
        onClick={() => setIsCategoryShow('historical')}
        design="categorySelector"
      >
        Historical
      </Button>
      <Button
        onClick={() => setIsCategoryShow('prophetical')}
        design="categorySelector"
      >
        Prophetical
      </Button>
      <Button
        onClick={() => setIsCategoryShow('epistle')}
        design="categorySelector"
      >
        Epistle
      </Button>
      <Button
        onClick={() => setIsCategoryShow('gospel')}
        design="categorySelector"
      >
        Gospel
      </Button>
    </div>
  );
}

export default CategoryMenu;
