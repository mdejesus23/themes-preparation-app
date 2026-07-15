import Button from './Button';

const CATEGORIES = [
  { key: 'all', label: 'All Readings' },
  { key: 'historical', label: 'Historical' },
  { key: 'prophetical', label: 'Prophetical' },
  { key: 'epistle', label: 'Epistle' },
  { key: 'gospel', label: 'Gospel' },
];

function CategoryMenu({ setIsCategoryShow, active = 'all' }) {
  return (
    <>
      {/* Mobile: dropdown */}
      <div className="sm:hidden">
        <select
          value={active}
          onChange={(e) => setIsCategoryShow(e.target.value)}
          className="w-full rounded-xl border border-borderColor bg-bgPrimary px-4 py-2.5 text-sm font-semibold text-textPrimary focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: pill row */}
      <div className="hidden w-full items-center gap-1.5 overflow-x-auto rounded-xl border border-borderColor bg-bgSecondary p-1.5 sm:flex">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.key}
            onClick={() => setIsCategoryShow(cat.key)}
            design="categorySelector"
            active={active === cat.key}
          >
            {cat.label}
          </Button>
        ))}
      </div>
    </>
  );
}

export default CategoryMenu;
