import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postAccessTheme } from '../../services/apiPreparation';

export function useAccessTheme() {
  const queryClient = useQueryClient();

  const { isPending: isAccessing, mutate: accessTheme } = useMutation({
    mutationFn: postAccessTheme,

    onSuccess: () => {
      toast.success('Successfully Access Theme!');
      // invalidateQueries is use to invalidate cache data and inorder to refresh or refetch again.
      // refetching the data through this function.
      queryClient.invalidateQueries({
        queryKey: ['test'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isAccessing, accessTheme };
}
