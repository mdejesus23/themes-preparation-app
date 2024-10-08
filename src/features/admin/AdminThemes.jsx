import { HiDocumentPlus } from 'react-icons/hi2';

import Modal from '../../ui/Modal';
import myThemes from '../../data/myThemesData';
import AdminThemeItem from './AdminThemeItem';
import AddThemeForm from './AddThemeForm';

function AdminThemes() {
  return (
    <>
      <Modal>
        <Modal.Open opens="create-theme-form">
          <button className="mt-8 flex items-center gap-1 rounded-md bg-yellow px-5 py-2 text-lg font-semibold text-white hover:text-dark hover:underline">
            <HiDocumentPlus size={20} /> Add Theme
          </button>
        </Modal.Open>

        <Modal.Window name="create-theme-form">
          <AddThemeForm />
        </Modal.Window>
      </Modal>
      <ul className="my-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
        {myThemes.map((theme, ind) => (
          <AdminThemeItem theme={theme} key={ind} />
        ))}
      </ul>
    </>
  );
}

export default AdminThemes;
