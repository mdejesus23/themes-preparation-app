import { useQuery } from '@tanstack/react-query';
import { getAdminThemes } from '../../services/apiAdmin';

export function useAdminThemes() {
  const { isPending, data, error } = useQuery({
    queryKey: ['admin-themes'],
    queryFn: getAdminThemes,
  });

  return { isPending, data, error };
}
