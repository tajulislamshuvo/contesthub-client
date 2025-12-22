import React from 'react';

const UserOverview = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#0f1f3d] mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            Transaction History
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            View all your payments, contest fees, and transaction records
            in one place.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            Contest Submissions
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Track contests you have participated in and review
            your submitted work.
          </p>
        </div>
      </div>
    </div>

  );
};

export default UserOverview;