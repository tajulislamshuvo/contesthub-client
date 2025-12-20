import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';

const ContestSubmission = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure()

  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ['contest', id, 'submissions'],
    queryFn: async () => {
      const res = axiosSecure.get(`/submissions/contest/${id}`);
      return (await res).data;
    }
  })


  const declareWinner = (winner) => {
    const winnerInfo = {
      isWinner: true
    }

    axiosSecure.patch(`/submission/${winner}`, winnerInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success('Winner declare successully')
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
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Participate email</th>

              <th className="py-3 px-4">Submited task</th>

              <th className="py-3 px-4">Make winner</th>

            </tr>

          </thead>

          <tbody>
            {submissions.map((submission, index) => (
              <tr
                key={submission._id}
                className="border-t border-[#cae4e7] transition-colors"
              >
                <td className="py-3 px-4">
                  {index + 1}
                </td>

                <td className="py-3 px-4 font-medium text-gray-700">
                  {submission.participantEmail}
                </td>
                <td className="py-3 break-all max-w-[440px] h-3 px-4 text-gray-600">
                  {submission.submissionData}
                </td>


                <td>
                  {
                    submission.isWinner ? <button disabled className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg transition-colors duration-200 opacity-70 cursor-not-allowed ">
                      winner
                    </button> : <button onClick={() => declareWinner(submission._id)} className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                      Declare winner
                    </button>
                  }



                </td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="grid grid-cols-1 gap-4 md:hidden">
        {submissions.map((submission, index) => (
          <div
            key={submission._id}

            className="bg-white rounded-xl shadow-md border border-[#c9cbe2] p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <h2>{index + 1}</h2>
              <div>

                <p className="text-sm text-gray-600">{submission.participantEmail}</p>
                <p className="text-xs font-bold break-all text-gray-500">
                  {submission.submissionData}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">



              {
                submission.isWinner ? <button disabled className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg transition-colors duration-200 opacity-70 cursor-not-allowed ">
                  winner
                </button> : <button onClick={() => declareWinner(submission._id)} className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                  Declare winner
                </button>
              }



            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default ContestSubmission;