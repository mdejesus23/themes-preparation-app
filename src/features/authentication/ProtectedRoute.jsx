import { Navigate } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { useUser } from './useUser';

function ProtectedRoute({ children }) {
  const { isLoading, user } = useUser();

  console.log('ProtectedRoute state:', { isLoading, user });

  // 1. While Loading, show a spinner
  if (isLoading) {
    return <Loader />;
  }

  // 2. If user is undefined (not authenticated), redirect to login
  if (!user) {
    console.log('ProtectedRoute: user not found');
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, render children
  console.log('ProtectedRoute: user authenticated');
  return children;
}

export default ProtectedRoute;
