import React from 'react';
import { Navigate } from 'react-router'

import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner from '../Components/Spinner/Spinner';

const CreatorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole()


  if (loading || roleLoading) {
    return <Spinner></Spinner>
  }

  if (role === 'creator') return children
  return <Navigate to='/' replace />
}

export default CreatorRoute