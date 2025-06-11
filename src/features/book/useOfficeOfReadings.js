import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBook } from '../../services/apiBook';

export function useOfficeOfReadings() {
  const { isPending, data, error } = useQuery({
    queryKey: ['office-of-readings'],
    queryFn: getBook,
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
