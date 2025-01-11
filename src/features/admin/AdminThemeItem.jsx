import ConfirmDelete from '../../ui/ConfirmDelete';
import ConfirmResetVotes from '../../ui/ConfirmResetVotes';
import { formatDate } from '../../utils/formatDate';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { HiPencil, HiEye, HiTrash, HiArrowPath } from 'react-icons/hi2';
import AddThemeForm from './AddThemeForm';
import { Link } from 'react-router-dom';
import { useDeleteTheme } from './useDeleteTheme';
import { useResetVotes } from './useResetVotes';

function AdminThemeItem({ theme }) {
  const { id: themeId, title, createdAt } = theme;
  const { isDeleting, deleteTheme } = useDeleteTheme();
  const { isReseting, resetVotes } = useResetVotes();

  return (
    <li className="flex transform cursor-pointer flex-col items-center gap-y-5 border border-lightGrey bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-center font-headfont text-2xl font-semibold">
            {title}
          </h2>
          <p className="text-xs text-neutral-700">{formatDate(createdAt)}</p>
        </div>

        <Modal>
          <Menus>
            <Menus.Toggle id={themeId} />

            <Menus.List id={themeId}>
              <Link
                to={themeId}
                className="hover:bg-gray-50 flex w-full items-center gap-4 border-none bg-none p-3 text-left text-sm transition-all"
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
                <Menus.Button icon={<HiArrowPath />}>Reset Votes</Menus.Button>
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
      <p className="font-bodyFont">{theme.description}</p>
    </li>
  );
}

export default AdminThemeItem;
