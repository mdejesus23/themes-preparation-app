import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { voteReading } from '../../services/apiPreparation';

export function useVoteReading(themeId) {
  const queryClient = useQueryClient();

  const { isPending: isVoting, mutate: voteUnvoteReading } = useMutation({
    mutationFn: voteReading,

    onSuccess: (data) => {
      let message;
      if (data.message === 'Vote counted!') {
        message = 'Reading voted successfully';
      } else {
        message = 'Reading unvoted successfully';
      }
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ['prep-theme', themeId],
      });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isVoting, voteUnvoteReading };
}
