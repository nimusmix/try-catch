// import React from 'react';
// import { Navigate, Outlet, useLocation } from "react-router-dom";
//
// const ProtectedRoute = ({
//   redirectPath = '/',
//   children,
// }: {
//   redirectPath: string;
//   children: React.ReactNode;
// }) => {
//   // const token = 토큰얻어오기();
//   const location = useLocation();
//
//   if (!token) {
//     return <Navigate to={redirectPath} replace state={{ from: location }} />;
//   }
//
//   return children || <Outlet />;
// };
//
// export default ProtectedRoute;

import React from 'react';

const ProtectedRoute = () => {
  return <div />;
};

export default ProtectedRoute;
