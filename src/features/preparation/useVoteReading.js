import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { voteReading } from '../../services/apiPreparation';

export function useVoteReading(themeId) {
  const queryClient = useQueryClient();

  const { isPending: isVoting, mutate: voteUnvoteReading } = useMutation({
    mutationFn: voteReading,

    onSuccess: () => {
      toast.success('Successfully voted/unvoted reading');
      queryClient.invalidateQueries({
        queryKey: ['prep-theme', themeId],
      });
      queryClient.invalidateQueries({
        queryKey: ['active-session-user'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isVoting, voteUnvoteReading };
}
