// Small colored pill for a liturgical reading category.
const TONES = {
  Historical: 'bg-badgeAmberBg text-badgeAmberText',
  Prophetical: 'bg-[#e7eef6] text-[#3a6ea5]',
  Epistle: 'bg-[#f0e9f6] text-[#6c4f9e]',
  Gospel: 'bg-badgeGreenBg text-badgeGreenText',
};

function CategoryPill({ category }) {
  const tone = TONES[category] || 'bg-bgSecondary text-textSecondary';
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone}`}
    >
      {category}
    </span>
  );
}

export default CategoryPill;
