import { HiDocumentPlus } from 'react-icons/hi2';
import { useAdminThemes } from './useAdminThemes';

import Modal from '../../ui/Modal';
import AdminThemeItem from './AdminThemeItem';
import AddThemeForm from './AddThemeForm';
import Loader from '../../ui/Loader';
import { useState } from 'react';
import Pagination from '../../ui/Pagination';

function AdminThemes() {
  const { isPending, data, error } = useAdminThemes();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Define how many items to show per page

  if (isPending) return <Loader />;

  if (error) return <p>{error.message}</p>;

  const myThemes = data?.data;
  const totalPages = Math.ceil(myThemes.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedThemes = myThemes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="mb-6 mt-4 flex justify-end">
        <Modal>
          <Modal.Open opens="create-theme-form">
            <button className="flex items-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lightGreen">
              <HiDocumentPlus size={18} /> Add Theme
            </button>
          </Modal.Open>

          <Modal.Window name="create-theme-form">
            <AddThemeForm />
          </Modal.Window>
        </Modal>
      </div>
      {paginatedThemes.length === 0 ? (
        <div className="rounded-2xl border border-borderColor bg-bgPrimary p-10 text-center">
          <h2 className="text-lg font-bold text-textPrimary">No Themes Yet!</h2>
          <p className="mt-1 text-sm text-textSecondary">
            Click &ldquo;Add Theme&rdquo; to create your first one.
          </p>
        </div>
      ) : (
        <>
          <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedThemes.map((theme, ind) => (
              <AdminThemeItem theme={theme} key={ind} />
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}

export default AdminThemes;
