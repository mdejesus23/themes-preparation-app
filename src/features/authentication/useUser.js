import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuthentication';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['active-session-user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, user };
}
