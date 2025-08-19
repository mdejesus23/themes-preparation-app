import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getLiturgicalCalendar } from '../../services/apiLiturgy';

export function useLiturgyOfTheDay() {
  const { isPending, data, error } = useQuery({
    queryKey: ['liturgy-of-the-day'],
    queryFn: getLiturgicalCalendar,
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
