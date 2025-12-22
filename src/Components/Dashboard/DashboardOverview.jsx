import React from 'react';
import useRole from '../../hooks/useRole';
import Spinner from '../Spinner/Spinner';
import UserOverview from './UserOverview';
import AdminOverview from './AdminOverview';

const DashboardOverview = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div>
      {
        role === "user" && <UserOverview></UserOverview>
      }
      {
        role === "admin" && <AdminOverview></AdminOverview>
      }
    </div>

  );
};

export default DashboardOverview;