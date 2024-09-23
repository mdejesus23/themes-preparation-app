import Button from './Button';

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-3">
      <h1 className="font-headfont text-lg">Delete {resourceName}</h1>
      <p className="text-gray-500 mb-3">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="mx-auto flex justify-center gap-x-7">
        <Button type="cancel" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
