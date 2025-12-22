import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MySubmission = () => {
  const editTaskModal = useRef(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [taskText, setTaskText] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ['submission', user.email, 'mySubmission'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${user.email}`);
      return res.data;
    }
  })

  const handleEditTask = (submission) => {
    setSelectedSubmission(submission);
    editTaskModal.current.showModal()
  }


  const handleEditDatabase = async () => {
    console.log(taskText);
    if (!selectedSubmission) return;
    try {
      const res = await axiosSecure.patch(
        `/submissions/${selectedSubmission._id}`,
        { submissionData: taskText }
      );

      if (res.data.modifiedCount) {
        refetch();
        editTaskModal.current.close();
        setTaskText("");
        setSelectedSubmission(null);
        toast.success('Submission updated successfully');
      }
    } catch (error) {
      toast.error(error.message);
    }


  }


  const handleDeleteSubmission = (id) => {
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
        axiosSecure.delete(`/submission/${id}`)
          .then(res => {
            console.log(res.data)
            if (res.data.deletedCount) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your submission has been deleted.",
                icon: "success"
              });

            }
          })
      }
    })
  }


  if (isLoading || loading) {
    return <Spinner></Spinner>
  }
  return (
    <div>
      <div className="hidden md:block bg-white rounded-2xl shadow-md   overflow-hidden">
        <table className="min-w-full text-sm">

          <thead className="bg-[#0f1f3d] text-white text-left">
            <tr>
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Contest id</th>

              <th className="py-3 px-4">Submited task</th>

              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Win</th>

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
                  {submission.contestId}
                </td>
                <td className="py-3 break-all max-w-[440px] h-3 px-4 text-gray-600">
                  {submission.submissionData}
                </td>


                <td>
                  <button onClick={() => handleEditTask(submission)} className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteSubmission(submission._id)} className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    Delete
                  </button>




                </td>
                <td>
                  {
                    submission.isWinner && <p className='text-green-600'>Win</p>}
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

                <p className="text-sm text-gray-600">{submission.contestId}</p>
                <p className="text-xs font-bold text-gray-500">
                  {submission.submissionData}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => handleEditTask(submission)} className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                Edit
              </button>
              <button onClick={() => handleDeleteSubmission(submission._id)} className="px-3 m-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>




      <dialog ref={editTaskModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl p-5">
          <textarea name="submittask" value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="p-3 border border-gray-500 w-full h-[100px]" placeholder="Enter your task"></textarea>

          <button onClick={() => handleEditDatabase()} className="btn btn-primary mt-2">Submit</button>


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

export default MySubmission;