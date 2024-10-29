import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postCreateUser } from '../../services/apiAuthentication';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createUser } = useMutation({
    mutationFn: postCreateUser,

    onSuccess: () => {
      toast.success('Signup Successfully!');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || 'Failed to create user.';

      // Check if it's a MongoDB duplicate key error and parse the message
      if (errorMessage.includes('E11000') && errorMessage.includes('dup key')) {
        const fieldMatch = errorMessage.match(/dup key: { (\w+): "([^"]+)" }/);
        if (fieldMatch && fieldMatch[1] && fieldMatch[2]) {
          const field = fieldMatch[1];
          const value = fieldMatch[2];

          toast.error(
            `The ${field} "${value}" is already registered. Please use a different one.`,
          );
        } else {
          toast.error(
            'A duplicate entry was found. Please try again with different information.',
          );
        }
      } else {
        toast.error(errorMessage);
      }
    },
  });

  return { isCreating, createUser };
}
