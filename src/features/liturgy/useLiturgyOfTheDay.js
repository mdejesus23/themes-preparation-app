import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getLiturgicalCalendar } from '../../services/apiLiturgy';

export function useLiturgyOfTheDay(year, month, day) {
  const { isPending, data, error } = useQuery({
    queryKey: ['liturgy-of-the-day', year, month, day],
    queryFn: () => getLiturgicalCalendar(year, month, day),
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
