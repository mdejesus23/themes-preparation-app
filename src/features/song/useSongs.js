import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSongBook } from '../../services/apiSongBook';

export function useSongs({ page = 1, limit = 10, search }) {
  const { isPending, data, error } = useQuery({
    queryKey: ['song-book', page, limit, search],
    queryFn: () => getSongBook({ page, limit, search }),
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
