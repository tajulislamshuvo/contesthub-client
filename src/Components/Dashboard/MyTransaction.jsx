import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';


const MyTransaction = () => {

  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: transections, isLoading } = useQuery({
    queryKey: ['transaction', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/transaction/${user?.email}`);
      return res.data;
    }
  })
  console.log(transections)

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
              <th className="py-3 px-4">Contest name</th>

              <th className="py-3 px-4">Amount</th>

              <th className="py-3 px-4">Transection id</th>
              <th className="py-3 px-4">Status</th>

            </tr>

          </thead>

          <tbody>
            {transections.map((transection, index) => (
              <tr
                key={transection._id}
                className="border-t border-[#cae4e7] transition-colors"
              >
                <td className="py-3 px-4">
                  {index + 1}
                </td>

                <td className="py-3 px-4 font-medium text-gray-700">
                  {transection.contestName}
                </td>
                <td className="py-3 break-all max-w-[440px] h-3 px-4 text-gray-600">
                  {transection.amount}
                </td>
                <td className="py-3 break-all max-w-[440px] h-3 px-4 text-gray-600">
                  {transection.transectionId}
                </td>
                <td className="py-3 break-all text-green-600 font-bold max-w-[440px] h-3 px-4 text-gray-600">
                  {transection.paymentStatus}
                </td>





              </tr>
            ))}
          </tbody>
        </table>
      </div>




      <div className="grid grid-cols-1 gap-4 md:hidden">
        {transections.map((transaction, index) => (
          <div
            key={transaction._id}

            className="bg-white rounded-xl shadow-md border border-[#c9cbe2] p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <h2>{index + 1}</h2>
              <div>

                <p className="text-sm text-gray-600">{transaction.contestName}</p>
                <p className="text-xs font-bold text-gray-500">
                  {transaction.amount}
                </p>
                <p className="text-xs font-bold text-gray-500">
                  {transaction.transectionId}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <h2 className='font-bold text-green-600'>{transaction.paymentStatus}</h2>

            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default MyTransaction;