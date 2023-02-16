import { Navigate, useLocation } from 'react-router-dom';
import getAccToken from '../utils/getAccToken';

interface IProtectedRouteProps {
  redirectPath?: string;
  children: any;
}

const ProtectedRoute = ({ redirectPath = '/', children }: IProtectedRouteProps) => {
  const token = getAccToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
