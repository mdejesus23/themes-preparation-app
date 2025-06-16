import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { uploadProfileImage } from '../../services/apiUser';

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  const { isPending: isUploading, mutate: uploadImage } = useMutation({
    mutationFn: uploadProfileImage,

    onSuccess: () => {
      toast.success('Profile image uploaded!');

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Upload failed'),
  });

  return { isUploading, uploadImage };
}
