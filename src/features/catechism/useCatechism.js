import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBookById } from '../../services/apiBook';

export function useCatechism(bookId) {
  const { isPending, data, error } = useQuery({
    queryKey: ['ccc', bookId],
    queryFn: async () => getBookById(bookId),
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
