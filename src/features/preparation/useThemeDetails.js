import { useQuery } from '@tanstack/react-query';
import { getReadings } from '../../services/apiPreparation';

export function useThemeDetails(slug) {
  const { data, error, isPending } = useQuery({
    queryKey: ['theme', slug],
    queryFn: async () => {
      const data = await getReadings(slug);
      return data;
    },
  });

  return { data, error, isPending };
}
