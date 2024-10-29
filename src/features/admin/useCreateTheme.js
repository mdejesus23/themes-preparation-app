import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postTheme } from '../../services/apiAdmin';

export function useCreateTheme() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createTheme } = useMutation({
    mutationFn: postTheme,

    onSuccess: () => {
      toast.success('Successfully Access Theme!');

      queryClient.invalidateQueries({
        queryKey: ['admin-themes'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isCreating, createTheme };
}
