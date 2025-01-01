import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postForgotPassword } from '../../services/apiAuthentication';

export function useForgotPassword() {
  const queryClient = useQueryClient();

  const { isPending: isResettingPassword, mutate: forgotPassword } =
    useMutation({
      mutationFn: postForgotPassword,

      onSuccess: () => {
        toast.success('Password reset email sent successfully!');
        queryClient.invalidateQueries({
          queryKey: ['user-forgot-password'],
        });
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    });

  return { isResettingPassword, forgotPassword };
}
