import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Spinner from '../Components/Spinner/Spinner';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth()
  if (loading) {
    return <Spinner></Spinner>
  }
  if (!user) {
    return <Navigate state={location.pathname} to='/login'></Navigate>
  }
  return children;
};

export default PrivateRoute;