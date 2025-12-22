import React from 'react';

const CreatorOverview = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#0f1f3d] mb-6">
        Creator Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            Add Contest
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Create new contests with rules, deadlines,
            and reward information.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            My Contests
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Manage all contests you created, including
            status and performance.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-700">
            Contest Submissions
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Review participant submissions and select
            winners for your contests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorOverview;