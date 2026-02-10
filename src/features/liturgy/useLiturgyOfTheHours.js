import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllLiturgies } from '../../services/apiBook';

export function useLiturgyOfTheHours(page = 1, season = '', week = '') {
  const { isPending, data, error } = useQuery({
    queryKey: ['liturgy-of-the-hours', page, season, week],
    queryFn: async () => getAllLiturgies(page, season, week),
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
