import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyContest = () => {

  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();


  const { data: contests, isLoading, refetch } = useQuery({
    queryKey: ['contests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?creatorEmail=${user?.email}`);
      return res.data;
    }
  })


  const deleteContest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contest/${id}`)
          .then(res => {
            console.log(res.data)
            if (res.data.deletedCount) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your contest has been deleted.",
                icon: "success"
              });

            }
          })
      }
    });
  }

  if (loading || isLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div>
      <div className="hidden md:block bg-white rounded-2xl shadow-md   overflow-hidden">
        <table className="min-w-full text-sm">

          <thead className="bg-[#0f1f3d] text-white text-left">
            <tr>
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Contest Image</th>

              <th className="py-3 px-4">Contest name</th>
              <th className="py-3 px-4">Contest status</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">See submission</th>
            </tr>

          </thead>

          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={contest._id}
                className="border-t border-[#cae4e7] transition-colors"
              >
                <td className="py-3 px-4">
                  {index + 1}
                </td>
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
                  {contest.status}
                </td>


                <td>
                  {
                    contest.status !== 'apprjved' ?
                      <div>
                        <Link to={`/dashboard/edit-contest/${contest._id}`} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                          Edit
                        </Link>
                        <button onClick={() => deleteContest(contest._id)} className="px-3 ml-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                          Delete
                        </button>
                      </div> : ''
                  }


                </td>
                <td className="py-3 px-4 text-gray-600">
                  <Link to={`/dashboard/contest-submission/${contest._id}`} className="px-3 ml-1.5 py-1 btn btn-primary rounded-lg hover:bg-primary hover:text-white ">
                    Submissions
                  </Link>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="grid grid-cols-1 gap-4 md:hidden">
        {contests.map((contest, index) => (
          <div
            key={contest._id}

            className="bg-white rounded-xl shadow-md border border-[#c9cbe2] p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <h2>{index + 1}</h2>
              <div>
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="h-12 w-12 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600">{contest.name}</p>
                <p className="text-xs font-bold text-gray-500">
                  {contest.status}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {
                contest.status !== 'apprjved' ?
                  <div>
                    <Link to={`/dashboard/edit-contest/${contest._id}`} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                      Edit
                    </Link>
                    <button onClick={() => deleteContest(contest._id)} className="px-3 ml-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                      Delete
                    </button>
                  </div> : ''
              }
              <button className="px-3 ml-1.5 py-1 btn btn-primary rounded-lg hover:bg-primary hover:text-white ">
                Submissions
              </button>

            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default MyContest;