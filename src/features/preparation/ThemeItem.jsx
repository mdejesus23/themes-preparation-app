import Button from '../../ui/Button';
import { formatDate } from '../../utils/formatDate';
import Modal from '../../ui/Modal';
import PasscodeForm from './PasscodeForm';

function ThemeItem({ theme }) {
  const { title, createdAt, description } = theme;
  return (
    <li className="flex transform cursor-pointer flex-col items-center gap-y-5 border border-lightGrey bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <span>
        <svg
          className="current-fill"
          width="4rem"
          height="4rem"
          version="1.1"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m85.129 119.36 5.5352-4.1367c0.50391-0.37891 1.1992-0.37891 1.7031 0l5.5352 4.1367v-21.539h-12.773z" />
          <path d="m100.75 97.816h11.031v12.449h-11.031z" />
          <path d="m22.449 8.6445c-3.4336 0-6.2266 2.7969-6.2266 6.2266v3.9102c1.625-1.5391 3.8164-2.4883 6.2266-2.4883h89.324v-7.6445z" />
          <path d="m31.82 84.379v-65.25h-9.3711c-3.4336 0-6.2266 2.7969-6.2266 6.2266v61.516c1.625-1.5391 3.8164-2.4883 6.2266-2.4883z" />
          <path d="m16.227 93.449v4.0117c1.625-1.5391 3.8164-2.4883 6.2266-2.4883h89.324v-7.7461h-89.324c-3.4336 0-6.2266 2.7891-6.2266 6.2266z" />
          <path d="m16.227 104.04c0 3.4336 2.7969 6.2266 6.2266 6.2266h59.836v-12.449h-59.836c-3.4336 0-6.2266 2.7891-6.2266 6.2266z" />
          <path d="m66.891 58.086v11.969h5.3516v-11.969c0-0.78516 0.63672-1.4219 1.4219-1.4219h11.969v-5.3516h-11.969c-0.78516 0-1.4219-0.63672-1.4219-1.4219v-11.969h-5.3516v11.969c0 0.78516-0.63672 1.4219-1.4219 1.4219h-11.969v5.3516h11.969c0.78125-0.003906 1.4219 0.62891 1.4219 1.4219z" />
          <path d="m34.664 84.379h77.109v-65.25h-77.109zm15.984-34.488c0-0.78516 0.63672-1.4219 1.4219-1.4219h11.969v-11.969c0-0.78516 0.63672-1.4219 1.4219-1.4219h8.1953c0.78516 0 1.4219 0.63672 1.4219 1.4219v11.969h11.969c0.78516 0 1.4219 0.63672 1.4219 1.4219v8.1953c0 0.78516-0.63672 1.4219-1.4219 1.4219h-11.969v11.969c0 0.78516-0.63672 1.4219-1.4219 1.4219h-8.1953c-0.78516 0-1.4219-0.63672-1.4219-1.4219v-11.969h-11.969c-0.78516 0-1.4219-0.63672-1.4219-1.4219z" />
        </svg>
      </span>
      <h2 className="text-center font-headfont text-2xl font-semibold">
        {title}
      </h2>
      <p className="mt-[-1rem] text-xs text-grey">{formatDate(createdAt)}</p>
      <p className="font-bodyFont">{description}</p>

      <Modal>
        <Modal.Open opens="passcode-form">
          <Button design="secondary">Use this theme</Button>
        </Modal.Open>

        <Modal.Window name="passcode-form">
          <PasscodeForm theme={theme} />
        </Modal.Window>
      </Modal>
    </li>
  );
}

export default ThemeItem;
