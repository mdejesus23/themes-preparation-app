import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { voteReading } from '../../services/apiPreparation';

export function useVoteReading(slug) {
  const queryClient = useQueryClient();

  const { isPending: isVoting, mutate: voteUnvoteReading } = useMutation({
    mutationFn: voteReading,

    onSuccess: () => {
      toast.success('Successfully voted/unvoted reading');
      queryClient.invalidateQueries({
        queryKey: ['accessed-theme', slug],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isVoting, voteUnvoteReading };
}
