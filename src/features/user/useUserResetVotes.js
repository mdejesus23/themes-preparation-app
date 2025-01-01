import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { userResetVotes as resetVotesApi } from '../../services/apiUser';

export function useResetVotes() {
  const queryClient = useQueryClient();

  const { isPending: isReseting, mutate: userResetVotes } = useMutation({
    mutationFn: resetVotesApi,

    onSuccess: () => {
      toast.success('Successfully reset user votes!');

      queryClient.invalidateQueries({
        queryKey: ['active-session-user'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isReseting, userResetVotes };
}
