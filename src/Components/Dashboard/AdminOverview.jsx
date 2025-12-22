import React from 'react';

const AdminOverview = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#0f1f3d] mb-6">
        Admin Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            Manage Contests
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Review contests submitted by creators and
            approve, reject, or remove them.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            Manage Users
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Control user roles and permissions across
            the ContestHub platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;