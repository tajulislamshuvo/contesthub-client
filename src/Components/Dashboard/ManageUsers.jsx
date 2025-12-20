import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  })

  const handleMakeAdmin = (user) => {
    const roleInfo = {
      role: 'admin'
    }
    axiosSecure.patch(`/user/${user._id}/role`, roleInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success('Make user admin')
        }
      })
  }
  const handleMakeCreator = (user) => {
    const roleInfo = {
      role: 'creator'
    }
    axiosSecure.patch(`/user/${user._id}/role`, roleInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success('Make user creator')
        }
      })
  }

  console.log(users)

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
              <th className="py-3 px-4">User name</th>
              <th className="py-3 px-4">User email</th>
              <th className="py-3 px-4">User role</th>
              <th className="py-3 px-4">Update role</th>
            </tr>

          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-[#cae4e7] transition-colors"
              >
                <td className="py-3 px-4">
                  {index + 1}
                </td>
                <td className="py-3 px-4 font-medium text-gray-700">
                  {user.displayName}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {user.email}
                </td>
                <td className="py-3 px-4 font-bold text-gray-500">
                  {user.role}
                </td>
                <td className="py-3 px-4">

                  <button onClick={() => handleMakeAdmin(user)} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    Admin
                  </button>
                  <button onClick={() => handleMakeCreator(user)} className="px-3 ml-1.5 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                    Contest creator
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user, index) => (
          <div
            key={user._id}

            className="bg-white rounded-xl shadow-md border border-[#c9cbe2] p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <h2>{index + 1}</h2>
              <div>
                <h3 className="font-semibold text-gray-600 text-base">
                  {user.displayName}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs font-bold text-gray-500">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => handleMakeAdmin(user)} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                Admin
              </button>
              <button onClick={() => handleMakeCreator(user)} className="px-3 py-1 border border-[#0e2f8b] text-[#5571ec] rounded-lg hover:bg-primary hover:text-white ">
                Contest creator
              </button>

            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default ManageUsers;