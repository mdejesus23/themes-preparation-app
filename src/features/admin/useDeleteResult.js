import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteResult as deleteResultApi } from '../../services/apiAdmin';

export function useDeleteResult() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteResult } = useMutation({
    mutationFn: deleteResultApi,

    onSuccess: () => {
      toast.success('Result successfully deleted!');
      // invalidateQueries is use to invalidate cache data and inorder to refresh or refetch again.
      // refetching the data through this function.
      queryClient.invalidateQueries({
        qieryKey: ['admin-themes'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteResult };
}
