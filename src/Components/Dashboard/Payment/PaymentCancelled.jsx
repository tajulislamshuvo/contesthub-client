import React from 'react';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-[#f7d8d8] rounded-full flex items-center justify-center">
            <ImCross size={25} className='text-red-700' />
            {/* <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            > */}

            {/* <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            /> */}
            {/* </svg> */}
          </div>
        </div>

        {/* Title and Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment is failed!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Please try again.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to={'/'}
            className="block w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Return to Home
          </Link>
          {/* <a
            href="/orders" // Change this to your actual orders/dashboard route
            className="block w-full border border-blue-600 text-blue-600 font-medium py-3 px-6 rounded-md hover:bg-blue-50 transition duration-200"
          >
            View Order Details
          </a> */}
        </div>
      </div>
    </div>

  );
};

export default PaymentCancelled;