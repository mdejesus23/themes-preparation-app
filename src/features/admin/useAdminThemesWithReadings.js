import { useQuery } from '@tanstack/react-query';
import { getAdminThemesWithReadings } from '../../services/apiAdminThemeWithReadings';

export function useAdminThemesWithReadings(themeId) {
  const { isPending, data, error } = useQuery({
    queryKey: ['admin-themes', themeId],
    queryFn: async () => {
      const data = await getAdminThemesWithReadings(themeId);
      return data;
    },
  });

  return { isPending, data, error };
}
