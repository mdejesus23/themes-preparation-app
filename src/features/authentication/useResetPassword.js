import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postResetPassword } from '../../services/apiAuthentication';

export function useResetPassword() {
  const queryClient = useQueryClient();

  const { isPending: isResettingPassword, mutate: resetPassword } = useMutation(
    {
      mutationFn: postResetPassword,

      onSuccess: () => {
        toast.success('Password reset successfully!');
        queryClient.invalidateQueries({
          queryKey: ['user-reset-password'],
        });
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    },
  );

  return { isResettingPassword, resetPassword };
}
