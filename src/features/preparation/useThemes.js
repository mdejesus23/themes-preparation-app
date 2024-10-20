import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getPrepThemes } from '../../services/apiPreparation';

export function useThemes() {
  const { isPending, data, error } = useQuery({
    queryKey: ['prep-themes'],
    queryFn: getPrepThemes,
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
