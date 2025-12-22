import axios from 'axios';
import React from 'react';


const axiosSecure = axios.create({
  baseURL: 'https://contesthub-server-omega.vercel.app',
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;