import React from 'react';
import LeftPanel from '../components/LeftPanel';
import LoginForm from '../components/LoginForm';
import QuickLoginSection from '../components/QuickLoginSection';

const LoginView = () => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <LeftPanel />

      {/* Right Section */}
      <div className='p-8 md:p-12 md:w-1/2 flex items-center justify-center'>
        <LoginForm />
      </div>

      <QuickLoginSection />
    </div>
  );
};

export default LoginView;
