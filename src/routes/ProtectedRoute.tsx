import { Navigate, Outlet, useLocation } from 'react-router-dom';
import getAccToken from '../utils/getAccToken';

interface IProtectedRouteProps {
  redirectPath?: string;
  children: React.ReactNode;
}

const ProtectedRoute = ({ redirectPath = '/' }: IProtectedRouteProps) => {
  const token = getAccToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
