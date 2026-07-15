// Dummy imagery + derived display fields for the redesign.
//
// The real data model has no image / liturgical / status fields, so these
// helpers produce stable, deterministic placeholders keyed off an id or index.
// Swap the files in /public/placeholders to drop in real art later.

const THEME_IMAGES = [
  '/placeholders/theme-1.svg',
  '/placeholders/theme-2.svg',
  '/placeholders/theme-3.svg',
  '/placeholders/theme-4.svg',
  '/placeholders/theme-5.svg',
  '/placeholders/theme-6.svg',
];

// Stable hash so the same id always maps to the same placeholder.
function hashKey(key) {
  const str = String(key ?? '');
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h);
}

export function themeImage(key) {
  return THEME_IMAGES[hashKey(key) % THEME_IMAGES.length];
}

export function songImage(key) {
  return THEME_IMAGES[hashKey(key) % THEME_IMAGES.length];
}

const LITURGICAL_YEARS = ['Year A', 'Year B', 'Year C'];
const LITURGICAL_COLORS = ['White', 'Red', 'Green', 'Violet'];
const STATUSES = [
  { label: 'Upcoming', tone: 'green' },
  { label: 'In Progress', tone: 'amber' },
  { label: 'Completed', tone: 'green' },
];

// Deterministic dummy liturgical metadata for a theme card.
export function themeMeta(key) {
  const h = hashKey(key);
  return {
    year: LITURGICAL_YEARS[h % LITURGICAL_YEARS.length],
    color: LITURGICAL_COLORS[Math.floor(h / 3) % LITURGICAL_COLORS.length],
    status: STATUSES[h % STATUSES.length],
    readingsCount: 20 + (h % 15),
    resultsCount: 3 + (h % 6),
  };
}
