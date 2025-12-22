import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';

const WinnerParticipant = () => {
  const axiosSecure = useAxiosSecure();
  const { data: winners, isLoading } = useQuery({
    queryKey: ['winner', 'contestWinner'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contest-winner');
      return res.data
    }
  })

  if (isLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div>
      <h2>Winners {winners.length}</h2>
    </div>
  );
};

export default WinnerParticipant;