import { HiChevronRight } from 'react-icons/hi2';
import { HiOutlineBookOpen, HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { formatDate } from '../../utils/formatDate';
import { themeImage, themeMeta } from '../../utils/placeholderImage';
import Modal from '../../ui/Modal';
import PasscodeForm from './PasscodeForm';

function ThemeItem({ theme }) {
  const { title, createdAt, description, id, _id } = theme;
  const key = id || _id || title;
  const meta = themeMeta(key);
  const badgeTone =
    meta.status.tone === 'amber'
      ? 'bg-badgeAmberBg text-badgeAmberText'
      : 'bg-badgeGreenBg text-badgeGreenText';

  return (
    <li>
      <Modal>
        <Modal.Open opens="passcode-form">
          <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-borderColor bg-bgPrimary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            {/* Image + status badge */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={themeImage(key)}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${badgeTone}`}
              >
                {meta.status.label}
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-medium text-textSecondary">
                {formatDate(createdAt)}
              </p>
              <h3 className="mt-1 font-headfont text-lg font-bold text-textPrimary">
                {title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-textSecondary">
                {meta.year} &middot; {meta.color}
              </p>
              <p className="mt-3 line-clamp-2 flex-1 text-sm italic text-textSecondary">
                &ldquo;{description}&rdquo;
              </p>

              {/* Footer meta */}
              <div className="mt-4 flex items-center justify-between border-t border-borderColor pt-3 text-xs font-medium text-textSecondary">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <HiOutlineBookOpen size={15} /> {meta.readingsCount} Readings
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClipboardDocumentCheck size={15} />{' '}
                    {meta.resultsCount} Results
                  </span>
                </span>
                <HiChevronRight
                  size={18}
                  className="text-textSecondary transition-transform group-hover:translate-x-0.5 group-hover:text-green"
                />
              </div>
            </div>
          </article>
        </Modal.Open>

        <Modal.Window name="passcode-form">
          <PasscodeForm theme={theme} />
        </Modal.Window>
      </Modal>
    </li>
  );
}

export default ThemeItem;
