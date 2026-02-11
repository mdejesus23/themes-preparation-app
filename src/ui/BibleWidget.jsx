import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiBookOpen, HiXMark } from 'react-icons/hi2';
import { useBibleReading } from '../features/preparation/useBibleReadings';

function BibleWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [verse, setVerse] = useState('');
  const [searchVerse, setSearchVerse] = useState('');

  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, elX: 0, elY: 0 });
  const lastTouchTime = useRef(0);
  const buttonRef = useRef(null);

  // Default position (bottom-right, above scroll-to-top)
  const defaultX = typeof window !== 'undefined' ? window.innerWidth - 72 : 0;
  const defaultY = typeof window !== 'undefined' ? window.innerHeight - 140 : 0;
  const posX = position.x ?? defaultX;
  const posY = position.y ?? defaultY;

  const { isPending, data, error } = useBibleReading(searchVerse);

  const clampPosition = useCallback((x, y) => {
    const size = 56;
    return {
      x: Math.max(0, Math.min(x, window.innerWidth - size)),
      y: Math.max(0, Math.min(y, window.innerHeight - size)),
    };
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      // Ignore synthetic mouse events fired after touch
      if (!e.touches && Date.now() - lastTouchTime.current < 500) return;
      if (e.touches) lastTouchTime.current = Date.now();

      isDragging.current = true;
      hasMoved.current = false;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragStart.current = {
        mouseX: clientX,
        mouseY: clientY,
        elX: posX,
        elY: posY,
      };
      e.preventDefault();
    },
    [posX, posY],
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStart.current.mouseX;
      const dy = clientY - dragStart.current.mouseY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }

      const newPos = clampPosition(
        dragStart.current.elX + dx,
        dragStart.current.elY + dy,
      );
      setPosition(newPos);
    },
    [clampPosition],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (!hasMoved.current) {
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = verse.trim();
    if (!trimmed) return;
    setSearchVerse(trimmed);
  }

  // Panel position: open above or below the button depending on space
  const panelWidth = 350;
  const panelHeight = 420;
  const openAbove = posY > panelHeight + 10;
  const panelStyle = {
    position: 'fixed',
    left: Math.min(posX, window.innerWidth - panelWidth - 8),
    top: openAbove ? posY - panelHeight - 10 : posY + 66,
    width: panelWidth,
    height: panelHeight,
    zIndex: 9998,
  };

  return createPortal(
    <>
      {/* Floating button */}
      <button
        ref={buttonRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={{
          position: 'fixed',
          left: posX,
          top: posY,
          zIndex: 9999,
          touchAction: 'none',
        }}
        className="flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-yellow text-2xl text-dark shadow-lg transition-shadow hover:shadow-xl active:cursor-grabbing"
        aria-label="Open Bible lookup"
      >
        <HiBookOpen />
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <div
          style={panelStyle}
          className="flex flex-col overflow-hidden rounded-lg border border-borderColor bg-bgPrimary shadow-2xl transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-borderColor bg-yellow px-4 py-3">
            <h3 className="font-headfont text-sm font-bold text-dark">
              Bible Lookup
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg text-dark hover:text-neutral-600"
              aria-label="Close Bible lookup"
            >
              <HiXMark />
            </button>
          </div>

          {/* Results area */}
          <div className="styled-modal flex-1 overflow-y-auto p-4 text-sm text-textPrimary">
            {!searchVerse && !data && (
              <p className="text-center text-xs text-textSecondary">
                Type a verse reference below to look it up.
                <br />
                <span className="mt-1 block italic">
                  e.g. &quot;John 3:16&quot; or &quot;Genesis 1:1-3&quot;
                </span>
              </p>
            )}

            {isPending && (
              <div className="flex items-center justify-center py-8">
                <div className="loader" />
              </div>
            )}

            {error && !isPending && (
              <p className="text-center text-sm text-red-500">
                Could not fetch verse. Please check the reference and try again.
              </p>
            )}

            {data && !isPending && (
              <div>
                <p className="mb-2 font-headfont text-xs font-bold uppercase tracking-wide text-yellow">
                  {searchVerse}
                </p>
                <div
                  className="reading-content text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.text || '',
                  }}
                />
              </div>
            )}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-borderColor p-3"
          >
            <input
              type="text"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="e.g. John 3:16"
              className="flex-1 rounded-md border border-borderColor bg-bgSecondary px-3 py-2 text-sm text-textPrimary placeholder-textSecondary outline-none focus:border-yellow"
            />
            <button
              type="submit"
              disabled={isPending || !verse.trim()}
              className="rounded-md bg-yellow px-4 py-2 text-sm font-semibold text-dark transition-colors hover:bg-lightYellow disabled:opacity-50"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </>,
    document.body,
  );
}

export default BibleWidget;
