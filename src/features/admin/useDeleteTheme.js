import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteTheme as deleteThemeApi } from '../../services/apiAdmin';

export function useDeleteTheme() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteTheme } = useMutation({
    mutationFn: deleteThemeApi,

    onSuccess: () => {
      toast.success('Theme successfully deleted!');
      // invalidateQueries is use to invalidate cache data and inorder to refresh or refetch again.
      // refetching the data through this function.
      queryClient.invalidateQueries({
        queryKey: ['admin-themes'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTheme };
}
