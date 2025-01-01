import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postLogoutUser } from '../../services/apiAuthentication';

export function useLogoutUser() {
  const queryClient = useQueryClient();

  const { isPending: isLoggingOut, mutate: logoutUser } = useMutation({
    mutationFn: postLogoutUser,

    onSuccess: () => {
      toast.success('Logout!');
      queryClient.invalidateQueries({ queryKey: ['active-session-user'] }); // Invalidate user queries
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || 'Error logging out. Please try again.',
      );
    },
  });

  return { isLoggingOut, logoutUser };
}
