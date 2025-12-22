import React from 'react';
import useRole from '../../hooks/useRole';
import Spinner from '../Spinner/Spinner';
import UserOverview from './UserOverview';
import AdminOverview from './AdminOverview';
import CreatorOverview from './CreatorOverview';

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

      {
        role === "creator" && <CreatorOverview></CreatorOverview>
      }
    </div>

  );
};

export default DashboardOverview;