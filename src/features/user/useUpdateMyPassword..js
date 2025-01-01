import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postUpdatePassword } from '../../services/apiUser';

export function useUpdateMyPassword() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingPassword, mutate: updatePassword } = useMutation(
    {
      mutationFn: postUpdatePassword,

      onSuccess: () => {
        toast.success('Password updated successfully!');
        queryClient.invalidateQueries({
          queryKey: ['user-update-password'],
        });
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    },
  );

  return { isUpdatingPassword, updatePassword };
}
