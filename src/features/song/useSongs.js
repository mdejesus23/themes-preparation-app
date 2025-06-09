import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSongBook } from '../../services/apiSongBook';

export function useSongs() {
  const { isPending, data, error } = useQuery({
    queryKey: ['song-book'],
    queryFn: getSongBook,
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
