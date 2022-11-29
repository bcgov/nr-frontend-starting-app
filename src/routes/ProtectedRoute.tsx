import React from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  signed: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ signed, children }: IProps): JSX.Element => {
  console.log('ProtectedRoute 1');
  if (!signed) {
    const { pathname } = window.location;
    const encodedUrl = encodeURI(`/?page=${pathname}`);
    console.log('ProtectedRoute 2 - Not signed. Redirecting to', encodedUrl);
    return <Navigate to={encodedUrl} replace />;
  }

  console.log('ProtectedRoute 3 - Signed. Returning requested page!');
  return children;
};

export default ProtectedRoute;
