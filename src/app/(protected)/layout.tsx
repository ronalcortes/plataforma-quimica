'use client';

import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useUserProfile } from '../../hooks/useUserProfile';
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  PuzzlePieceIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const { user, logout, loading } = useAuthContext();
  const { sessionData } = useSessionStorage();
  const { isProfesor: isProfesorFromProfile } = useUserProfile();

  // Usar el role desde sessionData como respaldo si no está disponible desde eFeal perfil
  const isProfesor = isProfesorFromProfile || sessionData?.role === 'PROFESOR';
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirigir si no está autenticado
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      router.push('/login');
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          <span className='text-gray-600'>Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  // No mostrar nada si no está autenticado (se redirigirá)
  if (!user) {
    return null;
  }

  const navigation = [
    { name: 'Mis Juegos', href: '/games', icon: PuzzlePieceIcon },
    ...(isProfesor
      ? [
          {
            name: 'Gestión de Juegos',
            href: '/profesorgames',
            icon: AcademicCapIcon,
          },
        ]
      : []),
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Sidebar para móvil */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className='fixed inset-0 bg-gray-600 bg-opacity-75'
          onClick={() => setSidebarOpen(false)}
        />
        <div className='fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl'>
          <div className='flex h-16 items-center justify-between px-4 border-b'>
            <Link
              href='/protected/dashboard'
              className='flex items-center space-x-2'
            >
              <Image
                src='/Logo.png'
                alt='Logo Colegio Sugamuxi'
                width={32}
                height={32}
                className='rounded'
              />
              <span className='text-lg font-semibold text-gray-900'>
                Sugamuxi
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className='text-gray-400 hover:text-gray-600'
              title='Cerrar menú'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
          </div>
          <nav className='flex-1 px-4 py-4 space-y-2'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900'
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className='mr-3 h-5 w-5' />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className='border-t p-4'>
            <div className='flex items-center space-x-3 mb-3'>
              <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                <UserIcon className='w-5 h-5 text-white' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {user.displayName || sessionData?.displayName || 'Usuario'}
                </p>
                <p className='text-xs text-gray-500 truncate'>{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className='flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50'
            >
              <ArrowRightIcon className='mr-3 h-5 w-5' />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar para desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
        <div className='flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm'>
          <div className='flex h-16 items-center px-4 border-b'>
            <Link
              href='/protected/dashboard'
              className='flex items-center space-x-2'
            >
              <Image
                src='/Logo.png'
                alt='Logo Colegio Sugamuxi'
                width={32}
                height={32}
                className='rounded'
              />
              <span className='text-lg font-semibold text-gray-900'>
                Sugamuxi
              </span>
            </Link>
          </div>
          <nav className='flex-1 px-4 py-4 space-y-2'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors'
              >
                <item.icon className='mr-3 h-5 w-5' />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className='border-t p-4'>
            <div className='flex items-center space-x-3 mb-3'>
              <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                <UserIcon className='w-5 h-5 text-white' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {user.displayName || sessionData?.displayName || 'Usuario'}
                </p>
                <p className='text-xs text-gray-500 truncate'>{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className='flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors'
            >
              <ArrowRightIcon className='mr-3 h-5 w-5' />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className='lg:pl-64'>
        {/* Topbar */}
        <div className='sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm'>
          <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center'>
              <button
                onClick={() => setSidebarOpen(true)}
                className='lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
                title='Abrir menú'
              >
                <Bars3Icon className='h-6 w-6' />
              </button>
              <div className='hidden sm:block'>
                <div className='relative'>
                  <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='text'
                    placeholder='Buscar...'
                    className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                className='text-gray-400 hover:text-gray-600 relative'
                title='Notificaciones'
              >
                <BellIcon className='h-6 w-6' />
                <span className='absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full'></span>
              </button>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                  <UserIcon className='w-5 h-5 text-white' />
                </div>
                <div className='hidden sm:block'>
                  <p className='text-sm font-medium text-gray-900'>
                    {user.displayName || sessionData?.displayName || 'Usuario'}
                  </p>
                  <p className='text-xs text-gray-500'>{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de la página */}
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
