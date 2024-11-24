import { useQuery } from '@tanstack/react-query';
import { getThemeWithReadingsAndVotes } from '../../services/apiPreparation';

export function useThemeWithReadingsAndVotes(themeId) {
  const { data, error, isPending } = useQuery({
    queryKey: ['theme-reading-votes', themeId],
    queryFn: async () => {
      const data = await getThemeWithReadingsAndVotes(themeId);
      return data;
    },
  });

  return { data, error, isPending };
}
