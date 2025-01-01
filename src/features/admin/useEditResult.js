import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updatePrepResult } from '../../services/apiAdmin';

export function useEditResult() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editResult } = useMutation({
    mutationFn: ({ newResultData, id }) => updatePrepResult(newResultData, id),
    onSuccess: () => {
      toast.success('Result successfully edited!');
      // invalidateQueries is use to invalidate cache data and inorder to refresh or refetch again.
      // refetching the data through this function.
      queryClient.invalidateQueries({
        qieryKey: ['admin-results'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editResult };
}
