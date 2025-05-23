import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postAccessTheme } from '../../services/apiPreparation';

export function useAccessTheme(themeId) {
  const queryClient = useQueryClient();

  const { isPending: isAccessing, mutate: accessTheme } = useMutation({
    mutationFn: postAccessTheme,

    onSuccess: () => {
      toast.success('Successfully Access Theme!');

      queryClient.invalidateQueries({
        queryKey: ['prep-theme', themeId],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isAccessing, accessTheme };
}
