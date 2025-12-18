import React from 'react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-200px)]'>

      <div className='w-9 h-9 rounded-full border-4 border-blue-600 border-t-gray-300 animate-spin duration-800' style={{ animationDuration: '2s' }} ></div>
    </div>
  );
};

export default Spinner;