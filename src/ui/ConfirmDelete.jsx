import Button from './Button';

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-[40rem] flex-col gap-3">
      <h1>Delete {resourceName}</h1>
      <p className="text-gray-500 mb-3">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        s
        <Button type="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="tertiary" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
