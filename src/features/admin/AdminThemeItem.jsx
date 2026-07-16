import ConfirmDelete from '../../ui/ConfirmDelete';
import ConfirmResetVotes from '../../ui/ConfirmResetVotes';
import { formatDate } from '../../utils/formatDate';
import { themeImage, themeMeta } from '../../utils/placeholderImage';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import {
  HiPencil,
  HiEye,
  HiTrash,
  HiArrowPath,
  HiChevronRight,
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import AddThemeForm from './AddThemeForm';
import { Link } from 'react-router-dom';
import { useDeleteTheme } from './useDeleteTheme';
import { useResetVotes } from './useResetVotes';

function AdminThemeItem({ theme }) {
  const { id: themeId, title, createdAt, description } = theme;
  const { isDeleting, deleteTheme } = useDeleteTheme();
  const { isReseting, resetVotes } = useResetVotes();

  const meta = themeMeta(themeId || title);
  const badgeTone =
    meta.status.tone === 'amber'
      ? 'bg-badgeAmberBg text-badgeAmberText'
      : 'bg-badgeGreenBg text-badgeGreenText';

  return (
    <li>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-borderColor bg-bgPrimary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
        {/* Image + status badge + actions menu */}
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={themeImage(themeId || title)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${badgeTone}`}
          >
            {meta.status.label}
          </span>

          <div className="absolute right-3 top-3 rounded-full bg-bgPrimary/90 shadow-sm backdrop-blur-sm">
            <Modal>
              <Menus>
                <Menus.Toggle id={themeId} />

                <Menus.List id={themeId}>
                  <Link
                    to={themeId}
                    className="flex w-full items-center gap-4 border-none bg-none p-3 text-left text-sm text-textPrimary transition-all hover:bg-bgSecondary"
                  >
                    <HiEye />
                    <span>View</span>
                  </Link>

                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="reset-votes">
                    <Menus.Button icon={<HiArrowPath />}>
                      Reset Votes
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>

                <Modal.Window name="edit">
                  <AddThemeForm themeToEdit={theme} />
                </Modal.Window>

                <Modal.Window name="delete">
                  <ConfirmDelete
                    disabled={isDeleting}
                    onConfirm={() => deleteTheme(themeId)}
                    resourceName="themes"
                  />
                </Modal.Window>

                <Modal.Window name="reset-votes">
                  <ConfirmResetVotes
                    disabled={isReseting}
                    onConfirm={() => resetVotes(themeId)}
                    themesTitle={title}
                  />
                </Modal.Window>
              </Menus>
            </Modal>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-medium text-textSecondary">
            {formatDate(createdAt)}
          </p>
          <h3 className="mt-1 font-headfont text-lg font-bold text-textPrimary">
            <Link to={themeId} className="hover:text-green">
              {title}
            </Link>
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
            <Link
              to={themeId}
              aria-label={`View ${title}`}
              className="text-textSecondary transition-transform hover:text-green group-hover:translate-x-0.5"
            >
              <HiChevronRight size={18} />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}

export default AdminThemeItem;
