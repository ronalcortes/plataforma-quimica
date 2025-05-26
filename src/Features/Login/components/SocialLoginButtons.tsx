import React from 'react';

const SocialLoginButtons = () => {
  return (
    <div className='flex flex-col space-y-4 mb-8'>
      <button className='flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50'>
        {/* Google icon can go here */}
        Sign in with Google
      </button>
      <div className='flex gap-4'>
        <button
          className='flex-1 flex items-center justify-center h-12 border border-gray-200 rounded-md hover:bg-gray-50'
          aria-label='Sign in with Facebook'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-blue-600'
          >
            <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
          </svg>
        </button>
        <button
          className='flex-1 flex items-center justify-center h-12 border border-gray-200 rounded-md hover:bg-gray-50'
          aria-label='Sign in with Apple'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-gray-800'
          >
            <path d='M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.5 0 2.5-.5 3.5-1.5'></path>
            <path d='M9 12h13'></path>
            <path d='M15 7c3 0 4 3 4 5.5 0 3-2 7.5-5 7.5-1.5 0-2.5-.5-3.5-1.5'></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
