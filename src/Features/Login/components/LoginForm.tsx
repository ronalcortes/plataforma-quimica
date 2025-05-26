import React from 'react';
import SocialLoginButtons from './SocialLoginButtons';

const LoginForm = () => {
  return (
    <div className='w-full max-w-md bg-white rounded-3xl shadow-lg p-8'>
      <div className='text-right mb-4'>
        <span className='text-gray-500'>No Account?</span>
        <a href='#' className='text-blue-500 font-medium ml-1'>
          Sign up
        </a>
      </div>

      <div className='mb-8'>
        <p className='text-gray-600 mb-1'>
          Welcome to <span className='text-blue-500 font-bold'>LOREM</span>
        </p>
        <h1 className='text-4xl font-bold'>Sign in</h1>
      </div>

      <SocialLoginButtons />

      <form>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Enter your username or email address
            </label>
            <input
              id='email'
              type='text'
              placeholder='Username or email address'
              className='w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Enter your Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              className='w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <div className='text-right'>
              <a href='#' className='text-blue-500 text-sm'>
                Forgot Password
              </a>
            </div>
          </div>

          <button
            type='submit'
            className='w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200'
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
