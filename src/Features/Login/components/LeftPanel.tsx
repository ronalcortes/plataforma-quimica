import React from 'react';

const LeftPanel = () => {
  return (
    <div className='bg-blue-500 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden'>
      <div className='z-10 relative'>
        <h2 className='text-2xl font-bold mb-6'>Your Logo</h2>
        <div className='mt-20 md:mt-32'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Sign in to</h1>
          <h2 className='text-2xl md:text-3xl font-semibold mb-6'>
            Lorem Ipsum is simply
          </h2>
          <p className='max-w-md opacity-90'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute right-0 top-1/3 transform translate-x-1/4'>
        <div className='relative w-64 h-64'>
          <svg
            className='text-white/20 absolute top-10 left-10 w-16 h-16'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
          >
            <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
          </svg>

          <svg
            className='text-white/20 absolute bottom-10 right-10 w-20 h-20'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
          >
            <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
          </svg>

          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='relative w-40 h-40'>
              <svg
                className='text-orange-400 w-40 h-40 transform rotate-45'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                viewBox='0 0 24 24'
              >
                <path d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z' />
                <path d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' />
                <path d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0' />
                <path d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <svg
        className='text-white/20 absolute bottom-10 left-10 w-24 h-24'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        viewBox='0 0 24 24'
      >
        <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
      </svg>
    </div>
  );
};

export default LeftPanel;
