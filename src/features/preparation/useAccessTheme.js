import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postAccessTheme } from '../../services/apiPreparation';

export function useAccessTheme(slug) {
  const queryClient = useQueryClient();

  const { isPending: isAccessing, mutate: accessTheme } = useMutation({
    mutationFn: postAccessTheme,

    onSuccess: () => {
      toast.success('Successfully Access Theme!');

      queryClient.invalidateQueries({
        queryKey: ['accessed-theme', slug],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isAccessing, accessTheme };
}
