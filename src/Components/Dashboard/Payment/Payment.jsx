import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../Spinner/Spinner';
import useAuth from '../../../hooks/useAuth';

const Payment = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: contest, isLoading } = useQuery({
    queryKey: ['contests', contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data;
    }
  })
  console.log(contest)
  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      participant_email: user.email,
      contestName: contest.name,
    }

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
    console.log(res.data);
    window.location.href = res.data.url;
  }

  if (isLoading || loading) {
    return <Spinner></Spinner>
  }
  return (
    <div className='flex flex-col h-[75vh]  items-center justify-center'>
      <h2 className='text-3xl text-center text-gray-500 font-bold '>Pay ${contest.price} for participate {contest.name} contest</h2>
      <button onClick={handlePayment} className='btn btn-primary px-6 mt-5'>Pay</button>
    </div>
  );
};

export default Payment;