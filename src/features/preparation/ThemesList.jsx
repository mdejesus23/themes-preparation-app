import ThemeItem from './ThemeItem';
import Loader from '../../ui/Loader';
import { useThemes } from './useThemes';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function ThemesList() {
  const { isPending, data, error } = useThemes();
  const navigate = useNavigate();

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

  return (
    <ul className="my-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
      {themes && themes.length > 0 ? (
        themes.map((theme, ind) => <ThemeItem theme={theme} key={ind} />)
      ) : (
        <li>No themes available.</li>
      )}
    </ul>
  );
}

export default ThemesList;
