import Button from './Button';
import useThemeStore from '../store/themeStore';

function ConfirmResetVotes({ onConfirm, disabled, onCloseModal }) {
  const resetAllVotes = useThemeStore((state) => state.resetAllVotes);

  const handleResetVotes = async () => {
    await onConfirm(); // Wait for onConfirm to complete if it's an async operation
    resetAllVotes(); // Reset all votes
    onCloseModal(); // Close the modal after the confirmation completes
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-3">
      <h1 className="font-headfont text-lg text-textPrimary">Reset your votes</h1>
      <p className="mb-3 text-textSecondary">
        Are you sure you want to reset your votes permanently? This action
        cannot be undone.
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
