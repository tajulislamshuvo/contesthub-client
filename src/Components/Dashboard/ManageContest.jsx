import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const ManageContest = () => {
  const contestModalRef = useRef();
  const [selectedContest, setSelectedContest] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ['contests', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?status=pending`);
      console.log(res.data);
      return res.data;
    }
  })

  const openContestDetailesModal = (contest) => {
    setSelectedContest(contest);
    contestModalRef.current.showModal();
  }


  const handleContestStatus = (contest) => {
    const statusInfo = {
      status: 'approved'
    }
    axiosSecure.patch(`/contest/${contest._id}/status`, statusInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success('Contest approved')
        }
      })
  }
  const handleRejectContestStatus = (contest) => {
    const statusInfo = {
      status: 'reject'
    }
    axiosSecure.patch(`/contest/${contest._id}/status`, statusInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          toast.error('Contest rejected')
        }
      })
  }

  if (isLoading) {
    return <Spinner></Spinner>
  }

  return (
    <div>



      <div className="hidden md:block bg-white rounded-2xl shadow-md   overflow-hidden">
        <table className="min-w-full text-sm">

          <thead className="bg-[#0f1f3d] text-white text-left">
            <tr>
              <th className="py-3 px-4">Contest Image</th>
              <th className="py-3 px-4">Contest name</th>
              <th className="py-3 px-4">Creator email</th>
              <th className="py-3 px-4">Post Date</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Detailes</th>
            </tr>

          </thead>

          <tbody>
            {contests.map((contest) => (
              <tr
                key={contest._id}
                className="border-t border-[#cae4e7] transition-colors"
              >
                <td className="py-3 px-4">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="h-12 w-12 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-4 font-medium text-gray-700">
                  {contest.name}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {contest.creatorEmail}
                </td>
                <td className="py-3 px-4 text-gray-500">
                  {new Date(contest.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">

                  <button onClick={() => handleContestStatus(contest)} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    Approved
                  </button>
                  <button onClick={() => handleRejectContestStatus(contest)} className="px-3 ml-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    Reject
                  </button>

                </td>
                <td className="py-3 px-4">
                  <button onClick={() => openContestDetailesModal(contest)} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    See detailes
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="bg-white rounded-xl shadow-md border border-[#c9cbe2] p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={contest.image}
                alt={contest.name}
                className="h-16 w-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-600 text-base">
                  {contest.name}
                </h3>
                <p className="text-sm text-gray-600">{contest.creatorEmail}</p>
                <p className="text-xs text-gray-500">
                  {new Date(contest.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => handleContestStatus(contest)} className="px-3 py-1 text-sm border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary ">
                Approved
              </button>
              <button onClick={() => handleRejectContestStatus(contest)} className="px-3 py-1 text-sm border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary ">
                Reject
              </button>
              <button onClick={() => openContestDetailesModal(contest)} className="px-3 py-1 text-sm border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary">
                See detailes
              </button>
            </div>
          </div>
        ))}
      </div>




      <dialog ref={contestModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl p-0">

          {/* Header */}
          <div className="bg-[#0f1f3d] text-white px-6 py-4 rounded-t-xl">
            <h3 className="font-bold text-lg">
              Contest Details
            </h3>
          </div>

          {selectedContest && (
            <div className="p-6 space-y-6">

              {/* Image + Main Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={selectedContest.image}
                  alt={selectedContest.name}
                  className="w-full h-56 object-cover rounded-xl border"
                />

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#0e2f8b]">
                    {selectedContest.name}
                  </h2>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Creator:</span>{" "}
                    {selectedContest.creatorEmail}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Type:</span>{" "}
                    {selectedContest.type}
                  </p>

                  <div className="flex gap-3 mt-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      Entry Fee: ${selectedContest.price}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Prize: ${selectedContest.prize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-[#0e2f8b] mb-1">
                  Description
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedContest.description}
                </p>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-semibold text-[#0e2f8b] mb-1">
                  Instructions
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedContest.instruction}
                </p>
              </div>

              {/* Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500">Start Time</p>
                  <p className="font-medium">
                    {new Date(selectedContest.startTime).toLocaleString()}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-500">End Time</p>
                  <p className="font-medium">
                    {new Date(selectedContest.endTime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="modal-action px-6 pb-6">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>

        </div>
      </dialog>

    </div>
  );
};

export default ManageContest;