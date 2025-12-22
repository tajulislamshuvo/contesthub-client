import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../Components/ContestCard/ContestCard';
import Spinner from '../Components/Spinner/Spinner';

const AllContest = () => {
  const axiosSecure = useAxiosSecure();

  const [searching, setSearching] = useState(false);

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ['contests', 'approved', 'all'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?status=approved`);
      return res.data;
    }
  })

  const [models, setModels] = useState([]);

  useEffect(() => {
    setModels(contests);
  }, [contests]);


  const handleSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.search.value.trim();

    if (!searchText) {
      setModels(contests); // reset if empty search
      return;
    }

    setSearching(true);
    try {
      const res = await axiosSecure.get(
        `/search?search=${searchText}`
      );
      setModels(res.data);
    } finally {
      setSearching(false);
    }
  };


  if (isLoading || searching) {
    return <Spinner></Spinner>
  }
  return (
    <div>

      <p className=' text-4xl mt-15 font-bold text-md text-center text-gray-600'>Explore all contest</p>

      <form onSubmit={handleSearch} className=" mt-5 mb-10 flex gap-2 justify-center">
        <label className="input rounded-full ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search by contest type" />
        </label>
        <button className="btn btn-primary text-white font-medium hover:bg-[#3d88e9]  rounded-full"> {searching ? "Searching..." : "Search"}</button>
      </form>

      {models.length === 0 && !searching && (
        <p className='text-3xl text-center font-bold text-[#0770e7] my-10'>
          Not found any contest in this type
        </p>
      )}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-10 mx-auto w-11/12'>
        {
          models.map((contest, index) => <ContestCard key={contest._id} contest={contest} index={index}></ContestCard>)
        }

      </div>
    </div>
  );
};

export default AllContest;