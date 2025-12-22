import React from 'react';

import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner from '../Components/Spinner/Spinner';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole()

  if (loading || roleLoading) {
    return <Spinner></Spinner>
  }

  if (role === 'admin') return children

  return <Navigate to='/' replace />
};

export default AdminRoute;