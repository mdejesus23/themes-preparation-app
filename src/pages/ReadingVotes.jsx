import { useNavigate } from 'react-router-dom';
import ReadingVotesList from '../features/preparation/ReadingVotesList';
import { useThemeWithReadingsAndVotes } from '../features/preparation/useThemeWithReadingsAndVotes';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../ui/Loader';
import { useParams } from 'react-router-dom';

function ReadingVotes() {
  const { themeId } = useParams();
  const { isPending, data, error } = useThemeWithReadingsAndVotes(themeId);
  const navigate = useNavigate();

  // Handle the error using toast
  useEffect(() => {
    if (error) {
      // Display the error message using toast
      toast.error(error.response?.data?.message || 'Something went wrong!');

      // Optionally, navigate to login after displaying the error
      navigate('/');
    }
  }, [error, navigate]);

  // Handle loading state
  if (isPending) return <Loader />;

  const themeWithReadingsVotes = data?.themeWithReadings;
  console.log('themeWithReadingsVotes', themeWithReadingsVotes);

  return (
    <>
      <h1 className="font-headfont text-3xl font-bold md:text-4xl">
        Reading Votes
      </h1>
      <ReadingVotesList themeWithReadingsVotes={themeWithReadingsVotes} />
    </>
  );
}

export default ReadingVotes;
