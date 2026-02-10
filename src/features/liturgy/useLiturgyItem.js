import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getLiturgyById } from '../../services/apiBook';

export function useLiturgyItem(id) {
  const { isPending, data, error } = useQuery({
    queryKey: ['liturgy-item', id],
    queryFn: async () => getLiturgyById(id),
    enabled: !!id,
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
