import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
import { LoadingOverlay } from "@/components/ui";

export function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingOverlay label="Loading session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

export function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return children;
  if (isAuthenticated) return <Navigate to="/admin" replace />;
  return children;
}

export default PrivateRoute;
