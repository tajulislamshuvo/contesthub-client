import React from 'react';
import Banner from '../Components/Banner/Banner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Components/Spinner/Spinner';
import ContestCard from '../Components/ContestCard/ContestCard';

const Home = () => {

  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ['contests', 'approved', 'limit'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/popular-contests?status=approved`);
      console.log(res.data);
      return res.data;
    }
  })

  if (isLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div>
      <Banner></Banner>
      {/* <h2 className=' text-2xl'>This is home : {contests.length}</h2> */}
      <div className="text-center text-4xl font-bold  mt-15 text-gray-600">Popular contest</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 mx-auto w-11/12">
        {
          contests.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
        }
      </div>
    </div>
  );
};

export default Home;