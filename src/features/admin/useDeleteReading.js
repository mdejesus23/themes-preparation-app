import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteReading as deleteReadingApi } from '../../services/apiAdminThemeWithReadings';

export function useDeleteReading(themeId) {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteReading } = useMutation({
    mutationFn: deleteReadingApi,

    onSuccess: () => {
      toast.success('Reading successfully deleted!');
      // invalidateQueries is use to invalidate cache data and inorder to refresh or refetch again.
      // refetching the data through this function.
      queryClient.invalidateQueries({
        qieryKey: ['admin-themes', themeId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteReading };
}
