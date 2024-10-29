import Loader from "../../ui/Loader";
import { useUser } from "./useUser";

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const {user, isLoadding} = useUser()

  // 2. While Loading, show a spinner
  if (isLoadding) return <Loader/>

  // 3. If there is NO authenticated user, redirect to the /login

  // 4. If there IS a user, render the app
  return children;
}

export default ProtectedRoute;
