import { useQuery, keepPreviousData } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllLiturgies } from '../../services/apiBook';

export function useLiturgyOfTheHours(
  page = 1,
  season = '',
  week = '',
  search = '',
) {
  const { isPending, isFetching, data, error } = useQuery({
    queryKey: ['liturgy-of-the-hours', page, season, week, search],
    queryFn: async () => getAllLiturgies(page, season, week, search),
    // Keep showing the previous results while a new search/page loads
    placeholderData: keepPreviousData,
    onError: (err) => toast.error(err.message),
  });

  return { isPending, isFetching, data, error };
}
