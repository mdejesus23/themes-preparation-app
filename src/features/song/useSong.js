import { useQuery } from '@tanstack/react-query';
import { getSong } from '../../services/apiSongBook';

export function useSong(songId) {
  const { isPending, data, error } = useQuery({
    queryKey: ['song-book', songId],
    queryFn: async () => {
      const data = await getSong(songId);
      return data;
    },
  });

  return { isPending, data, error };
}
