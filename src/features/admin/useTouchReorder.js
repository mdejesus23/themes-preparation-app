import { useCallback, useEffect, useRef, useState } from 'react';

// Pointer-based drag-to-reorder for the mobile reading cards. Native HTML5
// drag and drop doesn't fire on touch screens, so the card follows the finger
// via a transform, and the sibling under the pointer is marked with
// `data-drop="before|after"` (styled in CSS) to show where it will land.
//
// Siblings are the elements in the same list carrying `data-reading-id`.
// While dragging near the top/bottom edge the window auto-scrolls.

const EDGE = 80; // px from viewport edge where auto-scroll kicks in
const MAX_SPEED = 14; // px per frame at the very edge

export function useTouchReorder({ id, onMove }) {
  const itemRef = useRef(null);
  const drag = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const clearIndicator = () => {
    if (drag.current?.target) delete drag.current.target.dataset.drop;
  };

  const update = useCallback(() => {
    const d = drag.current;
    const el = itemRef.current;
    if (!d || !el) return;

    // Follow the finger, compensating for any scroll since the drag began.
    const dy = d.clientY - d.startY + (window.scrollY - d.startScrollY);
    el.style.transform = `translateY(${dy}px) scale(1.02)`;

    const siblings = Array.from(
      el.parentElement?.querySelectorAll(':scope > [data-reading-id]') ?? [],
    ).filter((node) => node !== el);

    // The dragged card is translated, so measure siblings (which stay put).
    let target = null;
    let position = null;
    for (const node of siblings) {
      const rect = node.getBoundingClientRect();
      if (d.clientY >= rect.top && d.clientY <= rect.bottom) {
        target = node;
        position = d.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
        break;
      }
    }

    if (target !== d.target || position !== d.position) {
      clearIndicator();
      if (target) target.dataset.drop = position;
      d.target = target;
      d.position = position;
    }
  }, []);

  // Auto-scroll loop, active only while dragging.
  useEffect(() => {
    if (!isDragging) return undefined;
    let frame;
    const tick = () => {
      const d = drag.current;
      if (d) {
        let speed = 0;
        if (d.clientY < EDGE) speed = -MAX_SPEED * (1 - d.clientY / EDGE);
        else if (d.clientY > window.innerHeight - EDGE)
          speed =
            MAX_SPEED * (1 - (window.innerHeight - d.clientY) / EDGE);
        if (speed) {
          window.scrollBy(0, speed);
          update();
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isDragging, update]);

  const finish = (commit) => {
    const d = drag.current;
    const el = itemRef.current;
    if (!d) return;
    if (commit && d.target && d.position) {
      onMove?.(id, d.target.dataset.readingId, d.position);
    }
    clearIndicator();
    if (el) el.style.transform = '';
    drag.current = null;
    setIsDragging(false);
  };

  // Spread onto the drag handle element.
  const handleProps = {
    onPointerDown: (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = {
        startY: e.clientY,
        clientY: e.clientY,
        startScrollY: window.scrollY,
        target: null,
        position: null,
      };
      setIsDragging(true);
    },
    onPointerMove: (e) => {
      if (!drag.current) return;
      drag.current.clientY = e.clientY;
      update();
    },
    onPointerUp: () => finish(true),
    onPointerCancel: () => finish(false),
    // Keep the browser from scrolling the page instead of dragging.
    style: { touchAction: 'none' },
  };

  // True while a handle drag is in progress; the card uses it to cancel the
  // native dragstart a mouse press on the handle would otherwise trigger.
  const isPointerDragging = () => drag.current !== null;

  return { itemRef, handleProps, isDragging, isPointerDragging };
}
