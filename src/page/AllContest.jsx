import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../Components/ContestCard/ContestCard';
import Spinner from '../Components/Spinner/Spinner';

const AllContest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ['contests', 'approved', 'all'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?status=approved`);
      console.log(res.data);
      return res.data;
    }
  })
  if (isLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div>

      <p className=' text-4xl mt-15 font-bold text-md text-center text-gray-600'>Explore all contest</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-10 mx-auto w-11/12'>
        {
          contests.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
        }

      </div>
    </div>
  );
};

export default AllContest;