import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createPrepResult as createResultApi } from '../../services/apiAdmin';

export function useCreateResult() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createPrepResult } = useMutation({
    mutationFn: createResultApi,

    onSuccess: () => {
      toast.success('Result created!');

      queryClient.invalidateQueries({
        queryKey: ['admin-results'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isCreating, createPrepResult };
}
