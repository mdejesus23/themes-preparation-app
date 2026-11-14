import { useCallback, useEffect, useMemo, useState } from 'react';

// The API has no field for reading order yet, so the admin's custom sequence
// is kept in localStorage per theme. Readings missing from the saved order
// (e.g. newly added ones) keep their server order and go to the end.
const storageKey = (themeId) => `reading-order:${themeId}`;

function loadOrder(themeId) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(themeId)));
    return Array.isArray(saved) ? saved : null;
  } catch {
    return null;
  }
}

function saveOrder(themeId, order) {
  try {
    if (order) localStorage.setItem(storageKey(themeId), JSON.stringify(order));
    else localStorage.removeItem(storageKey(themeId));
  } catch {
    // Storage unavailable (private mode, quota): order just won't persist.
  }
}

export function useReadingOrder(themeId, readings) {
  const [order, setOrder] = useState(() => loadOrder(themeId));

  useEffect(() => {
    setOrder(loadOrder(themeId));
  }, [themeId]);

  const ordered = useMemo(() => {
    if (!order) return readings;
    const rank = new Map(order.map((id, i) => [id, i]));
    return readings
      .map((reading, i) => ({ reading, i }))
      .sort((a, b) => {
        const ra = rank.get(a.reading._id) ?? order.length + a.i;
        const rb = rank.get(b.reading._id) ?? order.length + b.i;
        return ra - rb;
      })
      .map(({ reading }) => reading);
  }, [order, readings]);

  const commit = useCallback(
    (ids) => {
      setOrder(ids);
      saveOrder(themeId, ids);
    },
    [themeId],
  );

  // Moves `draggedId` so it sits before or after `targetId`.
  const moveReading = useCallback(
    (draggedId, targetId, position = 'before') => {
      if (draggedId === targetId) return;
      const ids = ordered.map((r) => r._id).filter((id) => id !== draggedId);
      const targetIndex = ids.indexOf(targetId);
      if (targetIndex === -1) return;
      ids.splice(position === 'after' ? targetIndex + 1 : targetIndex, 0, draggedId);
      commit(ids);
    },
    [ordered, commit],
  );

  // Moves a reading one step up (-1) or down (+1) within `visibleIds`, the
  // readings currently shown, so arrows respect the active category filter.
  const stepReading = useCallback(
    (id, direction, visibleIds) => {
      const i = visibleIds.indexOf(id);
      const neighbor = visibleIds[i + direction];
      if (i === -1 || !neighbor) return;
      moveReading(id, neighbor, direction > 0 ? 'after' : 'before');
    },
    [moveReading],
  );

  const resetOrder = useCallback(() => commit(null), [commit]);

  return {
    orderedReadings: ordered,
    moveReading,
    stepReading,
    resetOrder,
    isCustomOrder: Boolean(order),
  };
}
