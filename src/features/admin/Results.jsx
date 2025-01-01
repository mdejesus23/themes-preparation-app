import { useState } from 'react';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import { formatDate } from '../../utils/formatDate';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import ResultForm from './ResultForm';
import { useAdminResults } from './useAdminResults';
import Loader from '../../ui/Loader';
import { useDeleteResult } from './useDeleteResult';
import Pagination from '../../ui/Pagination';

function Results() {
  const { isPending, data, error } = useAdminResults();
  const { isDeleting, deleteResult } = useDeleteResult();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isPending) return <Loader />;

  if (error) return <p>{error.message}</p>;

  const resultArray = data?.data || [];
  const totalPages = Math.ceil(resultArray.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedThemes = resultArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <ul className="my-12 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedThemes.map((item) => {
          const {
            _id: id,
            title,
            createdAt,
            entranceSong,
            firstReading,
            firstPsalm,
            secondReading,
            secondPsalm,
            thirdReading,
            thirdPsalm,
            gospel,
            finalSong,
          } = item;

          return (
            <li
              key={id}
              className="flex flex-col rounded-lg border border-lightGrey bg-white shadow-md transition-transform hover:scale-[1.03] hover:shadow-xl"
            >
              {/* Header Section */}
              <div className="flex w-full items-center justify-between border-b border-lightGrey p-4">
                <div>
                  <h2 className="text-gray-800 text-lg font-semibold">
                    {title}
                  </h2>
                  <p className="text-gray-500 text-xs">
                    {formatDate(createdAt)}
                  </p>
                </div>
                <Modal>
                  <Menus>
                    <Menus.Toggle id={id} />

                    <Menus.List id={id}>
                      <Modal.Open opens="edit">
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                      </Modal.Open>

                      <Modal.Open opens="delete">
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                      </Modal.Open>
                    </Menus.List>

                    <Modal.Window name="delete">
                      <ConfirmDelete
                        disabled={isDeleting}
                        onConfirm={() => deleteResult(id)}
                        resourceName="Prep result"
                      />
                    </Modal.Window>

                    <Modal.Window name="edit">
                      <ResultForm resultToEdit={item} />
                    </Modal.Window>
                  </Menus>
                </Modal>
              </div>

              {/* Table-Like Content Section */}
              <div className="p-4">
                <table className="text-gray-700 w-full text-left text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Entrance Song:</td>
                      <td className="py-2">{entranceSong || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">First Reading:</td>
                      <td className="py-2">{firstReading || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">First Psalm:</td>
                      <td className="py-2">{firstPsalm || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Second Reading:</td>
                      <td className="py-2">{secondReading || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Second Psalm:</td>
                      <td className="py-2">{secondPsalm || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Third Reading:</td>
                      <td className="py-2">{thirdReading || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Third Psalm:</td>
                      <td className="py-2">{thirdPsalm || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Gospel:</td>
                      <td className="py-2">{gospel || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Final Song:</td>
                      <td className="py-2">{finalSong || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default Results;
