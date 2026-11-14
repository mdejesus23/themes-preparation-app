// The four reading slots of a preparation result, in liturgical order. Each
// slot's `category` is the reading category that normally fills it.
export const RESULT_SLOTS = [
  { key: 'firstReading', label: '1st Reading', category: 'Historical' },
  { key: 'secondReading', label: '2nd Reading', category: 'Prophetical' },
  { key: 'thirdReading', label: '3rd Reading', category: 'Epistle' },
  { key: 'gospel', label: 'Gospel', category: 'Gospel' },
];

export const EMPTY_FINAL_READINGS = Object.fromEntries(
  RESULT_SLOTS.map((slot) => [slot.key, null]),
);

// MIME type used to carry a reading's verse through native drag and drop.
export const READING_DRAG_TYPE = 'application/x-reading';
// MIME type carrying the reading's id, used to reorder the readings list.
export const READING_ID_DRAG_TYPE = 'application/x-reading-id';

// Places `verse` in `slotKey`, removing it from any other slot first so one
// reading can't fill two slots at once.
export function assignReading(finalReadings, slotKey, verse) {
  const next = Object.fromEntries(
    Object.entries(finalReadings).map(([key, value]) => [
      key,
      value === verse ? null : value,
    ]),
  );
  next[slotKey] = verse;
  return next;
}

export function slotOfVerse(finalReadings, verse) {
  return RESULT_SLOTS.find((slot) => finalReadings[slot.key] === verse);
}
