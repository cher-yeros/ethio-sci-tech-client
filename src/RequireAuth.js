import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { loggedIn, currentUser } = useSelector((state) => state.user);

  return loggedIn ? (
    allowedRoles?.includes(currentUser?.user?.role) ? (
      <Outlet />
    ) : (
      <Navigate to={`/`} state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export const Authenticated = () => {
  const location = useLocation();
  const { loggedIn, currentUser } = useSelector((state) => state.user);

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
