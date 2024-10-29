import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateTheme } from '../../services/apiAdmin';

export function useEditTheme() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editTheme } = useMutation({
    mutationFn: ({ newThemeData, id }) => updateTheme(newThemeData, id),
    onSuccess: () => {
      toast.success('Theme successfully edited!');
      // invalidateQueries is use to invalidate cache data and inorder to refresh or refetch again.
      // refetching the data through this function.
      queryClient.invalidateQueries({
        qieryKey: ['admin-themes'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTheme };
}
