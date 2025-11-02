import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBibleReadings } from '../../services/apiBible';

export function useBibleReading(verse) {
  const { isPending, data, error } = useQuery({
    queryKey: ['bible-readings', verse],
    queryFn: async () => {
      const data = await getBibleReadings(verse);
      return data;
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, data, error };
}
