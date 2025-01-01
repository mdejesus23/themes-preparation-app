import Button from './Button';

function ConfirmResetVotes({ themesTitle, onConfirm, disabled, onCloseModal }) {
  const handleResetVotes = async () => {
    await onConfirm(); // Wait for onConfirm to complete if it's an async operation
    onCloseModal(); // Close the modal after the confirmation completes
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-3">
      <h1 className="font-headfont text-lg">Reset Votes of {themesTitle}</h1>
      <p className="text-gray-500 mb-3">
        Are you sure you want to reset votes of this {themesTitle} permanently?
        This action cannot be undone.
      </p>

      <div className="mx-auto flex justify-center gap-x-7">
        <Button design="cancel" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button design="danger" disabled={disabled} onClick={handleResetVotes}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default ConfirmResetVotes;
