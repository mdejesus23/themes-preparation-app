import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postLoginUser } from '../../services/apiAuthentication';

export function useLoginUser() {
  const queryClient = useQueryClient();

  const { isPending: isLogging, mutate: loginUser } = useMutation({
    mutationFn: postLoginUser,

    onSuccess: (data) => {
      const userId = data.data.user.id;
      toast.success('Login Successfully!');
      queryClient.invalidateQueries({
        queryKey: ['active-session-user', userId],
      });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isLogging, loginUser };
}
