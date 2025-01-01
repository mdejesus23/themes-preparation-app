import { Navigate } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { useUser } from './useUser';

function ProtectedRoute({ children }) {
  const { isLoading, user } = useUser();

  // 1. While Loading, show a spinner
  if (isLoading) {
    return <Loader />;
  }

  // 2. If user is undefined (not authenticated), redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, render children
  return children;
}

export default ProtectedRoute;
