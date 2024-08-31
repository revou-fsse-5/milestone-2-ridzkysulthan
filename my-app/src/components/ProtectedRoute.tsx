// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface ProtectedRouteProps {
//   element: JSX.Element;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return element;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Adjust this based on your AuthContext implementation

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;