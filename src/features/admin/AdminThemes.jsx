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
      {paginatedThemes.length === 0 ? (
        <h2 className="mt-10 text-xl font-bold">No Themes Yet!</h2>
      ) : (
        <>
          <ul className="my-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
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
