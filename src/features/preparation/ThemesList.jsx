import ThemeItem from './ThemeItem';
import Loader from '../../ui/Loader';
import { useThemes } from './useThemes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Pagination from '../../ui/Pagination';

function ThemesList() {
  const { isPending, data, error } = useThemes();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle the error using toast
  useEffect(() => {
    if (error) {
      // Display the error message using toast
      toast.error(error.response?.data?.message || 'Something went wrong!');

      // Optionally, navigate to login after displaying the error
      navigate('/login');
    }
  }, [error, navigate]);

  // Handle loading state
  if (isPending) return <Loader />;

  const themes = data?.data;
  const totalPages = Math.ceil(themes.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedThemes = themes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <ul className="my-12 grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 md:mb-0 xl:grid-cols-3 xl:gap-12">
        {paginatedThemes && paginatedThemes.length > 0 ? (
          paginatedThemes.map((theme, ind) => (
            <ThemeItem theme={theme} key={ind} />
          ))
        ) : (
          <li>No themes available.</li>
        )}
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

export default ThemesList;
