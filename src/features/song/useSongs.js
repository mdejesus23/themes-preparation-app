import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSongBook } from '../../services/apiSongBook';

export function useSongs({ page = 1, limit = 10, search, category = '' } = {}) {
  // Use React Query to fetch songs with pagination and search
  const { isPending, data, error } = useQuery({
    queryKey: ['song-book', page, limit, search, category],
    queryFn: () => getSongBook({ page, limit, search, category }),
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
