import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postLogoutUser } from '../../services/apiAuthentication';
import useUserStore from '../../store/userStore';

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const { isPending: isLoggingOut, mutate: logoutUser } = useMutation({
    mutationFn: postLogoutUser,
    onSuccess: () => {
      toast.success('Logout!');
      queryClient.removeQueries();
      clearUser();
      navigate('/login', { replace: true });
    },
  });

  return { isLoggingOut, logoutUser };
}
