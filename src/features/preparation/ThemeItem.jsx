import Button from '../../ui/Button';
import { formatDate } from '../../utils/formatDate';
import Modal from '../../ui/Modal';
import PasscodeForm from './PasscodeForm';

function ThemeItem({ theme }) {
  const { id: themeId, title, createdAt, description, passcode } = theme;
  return (
    <li className="flex transform cursor-pointer flex-col items-center gap-y-5 border border-lightGrey bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <h2 className="text-center font-headfont text-2xl font-semibold">
        {title}
      </h2>
      <p className="font-bodyFont">{description}</p>
      <p className="text-xs text-grey">{formatDate(createdAt)}</p>

      <Modal>
        <Modal.Open opens="passcode-form">
          <Button style="secondary">Use this theme</Button>
        </Modal.Open>

        <Modal.Window name="passcode-form">
          <PasscodeForm theme={theme} />
        </Modal.Window>
      </Modal>
    </li>
  );
}

export default ThemeItem;
