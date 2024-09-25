import ConfirmDelete from '../../ui/ConfirmDelete';
import { formatDate } from '../../utils/formatDate';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { HiPencil, HiEye, HiTrash } from 'react-icons/hi2';
import AddThemeForm from './AddThemeForm';
import Button from '../../ui/Button';

function AdminThemeItem({ theme }) {
  const { id, title, createdAt } = theme;
  // console.log(id);
  return (
    <li className="flex transform cursor-pointer flex-col items-center gap-y-5 border border-lightGrey bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="flex w-full justify-between">
        <h2 className="text-center font-headfont text-2xl font-semibold">
          {theme.title}
        </h2>
        <Modal>
          <Menus>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Button to={theme.slug}>
                <HiEye /> View
              </Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <AddThemeForm themeToEdit={theme} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="themes" />
            </Modal.Window>
          </Menus>
        </Modal>
      </div>
      <p className="font-bodyFont">{theme.description}</p>
      <p className="text-xs text-grey">{formatDate(theme.createdAt)}</p>
    </li>
  );
}

export default AdminThemeItem;
