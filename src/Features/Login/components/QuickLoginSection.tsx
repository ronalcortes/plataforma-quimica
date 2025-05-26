import React from 'react';
import Image from 'next/image';

const QuickLoginSection = () => {
  return (
    <div className='hidden lg:block absolute bottom-8 left-8'>
      <div className='mb-4'>
        <h3 className='text-lg font-medium text-gray-800'>Login as</h3>
      </div>
      <div className='flex space-x-4'>
        <div className='bg-gray-100 rounded-lg p-4 w-36 relative'>
          <div className='flex flex-col items-center'>
            <div className='mb-2'>
              <Image
                src='/placeholder.svg'
                alt='john doe'
                width={60}
                height={60}
                className='rounded-full'
              />
            </div>
            <h4 className='text-sm font-medium text-center'>John Doe</h4>
            <p className='text-xs text-gray-500 text-center mt-1'>John Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLoginSection;
