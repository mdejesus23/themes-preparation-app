import { useQuery } from '@tanstack/react-query';
import { getAdminResults } from '../../services/apiAdmin';

export function useAdminResults() {
  const { isPending, data, error } = useQuery({
    queryKey: ['admin-results'],
    queryFn: getAdminResults,
  });

  return { isPending, data, error };
}
