import { useState } from 'react';
import { HiOutlineDocumentPlus, HiXMark } from 'react-icons/hi2';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ResultForm from './ResultForm';
import { RESULT_SLOTS, READING_DRAG_TYPE } from './resultSlots';

function hasReading(e) {
  return Array.from(e.dataTransfer.types).includes(READING_DRAG_TYPE);
}

function DropSlot({ slot, verse, onDropReading, onClear }) {
  const [isOver, setIsOver] = useState(false);

  function handleDragOver(e) {
    if (!hasReading(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isOver) setIsOver(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsOver(false);
    const dropped = e.dataTransfer.getData(READING_DRAG_TYPE);
    if (dropped) onDropReading(slot.key, dropped);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`flex min-h-[72px] flex-col justify-between rounded-xl border-2 border-dashed p-3 transition-colors ${
        isOver
          ? 'border-green bg-sidebarActive'
          : verse
            ? 'border-solid border-green bg-bgPrimary'
            : 'border-borderColor bg-bgSecondary/40'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
        {slot.label}
      </p>
      {verse ? (
        <div className="mt-1 flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-textPrimary">{verse}</span>
          <button
            type="button"
            onClick={() => onClear(slot.key)}
            aria-label={`Clear ${slot.label}`}
            className="shrink-0 rounded-full p-0.5 text-textSecondary hover:bg-bgSecondary hover:text-red-600"
          >
            <HiXMark size={16} />
          </button>
        </div>
      ) : (
        <span className="mt-1 text-xs italic text-textSecondary">
          Drop a {slot.category.toLowerCase()} reading
        </span>
      )}
    </div>
  );
}

// Drop zones for the four result readings plus the "Create Result" action.
function ResultBuilder({
  title,
  finalReadings,
  onAssign,
  onClear,
  draftResult,
  onDraftChange,
}) {
  const selectedCount = RESULT_SLOTS.filter((s) => finalReadings[s.key]).length;

  return (
    <section className="mb-6 rounded-2xl border border-borderColor bg-bgPrimary p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-headfont text-lg font-bold text-textPrimary">
            Final Result
          </h2>
          <p className="text-xs text-textSecondary">
            Drag readings into the slots, or use &ldquo;Add to&rdquo; on a
            reading. {selectedCount}/{RESULT_SLOTS.length} selected.
          </p>
        </div>
        <Modal>
          <Modal.Open opens="admin-result-form">
            <Button design="secondary">
              <HiOutlineDocumentPlus size={18} /> Create Result
            </Button>
          </Modal.Open>
          <Modal.Window name="admin-result-form">
            <ResultForm
              title={title}
              finalReadings={finalReadings}
              draftResult={draftResult}
              onDraftChange={onDraftChange}
            />
          </Modal.Window>
        </Modal>
      </div>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-4">
        {RESULT_SLOTS.map((slot) => (
          <DropSlot
            key={slot.key}
            slot={slot}
            verse={finalReadings[slot.key]}
            onDropReading={onAssign}
            onClear={onClear}
          />
        ))}
      </div>
    </section>
  );
}

export default ResultBuilder;
