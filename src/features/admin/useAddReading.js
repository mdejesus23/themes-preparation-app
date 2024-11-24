import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postAddReading } from '../../services/apiAdminThemeWithReadings';

export function useAddReading(themeId) {
  const queryClient = useQueryClient();

  const { isPending: isAddingReading, mutate: addThemeReading } = useMutation({
    mutationFn: postAddReading,

    onSuccess: () => {
      toast.success('Successfully Adding Reading!');

      queryClient.invalidateQueries({
        queryKey: ['admin-themes', themeId],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isAddingReading, addThemeReading };
}
