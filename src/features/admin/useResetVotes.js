import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resetVotes as resetVotesApi } from '../../services/apiAdmin';

export function useResetVotes() {
  const queryClient = useQueryClient();

  const { isPending: isReseting, mutate: resetVotes } = useMutation({
    mutationFn: resetVotesApi,

    onSuccess: () => {
      toast.success('Vote reset!');

      queryClient.invalidateQueries({
        queryKey: ['admin-themes'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isReseting, resetVotes };
}
