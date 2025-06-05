'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import SessionInfo from '../../../components/SessionInfo';
import Link from 'next/link';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirigir al login si no hay usuario autenticado
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Se está redirigiendo
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>
                Dashboard - Colegio Sugamuxi
              </h1>
              <p className='text-gray-600'>Plataforma Química</p>
            </div>
            <Link href='/login'>
              <button className='text-blue-600 hover:text-blue-800 font-medium'>
                Volver al Login
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Mensaje de bienvenida */}
          <div className='bg-green-100 border border-green-400 rounded-lg p-4 mb-6'>
            <h2 className='text-green-800 font-semibold text-lg'>
              ¡Bienvenido, {user.email}!
            </h2>
            <p className='text-green-700'>
              Has iniciado sesión exitosamente en la plataforma química del
              Colegio Sugamuxi.
            </p>
          </div>

          {/* Información de sesión */}
          <div className='mb-8'>
            <SessionInfo />
          </div>

          {/* Contenido del dashboard */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow border'>
              <h3 className='text-lg font-semibold mb-3 text-gray-800'>
                Laboratorio Virtual
              </h3>
              <p className='text-gray-600 mb-4'>
                Accede a experimentos virtuales de química
              </p>
              <button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors'>
                Acceder
              </button>
            </div>

            <div className='bg-white p-6 rounded-lg shadow border'>
              <h3 className='text-lg font-semibold mb-3 text-gray-800'>
                Base de Datos Química
              </h3>
              <p className='text-gray-600 mb-4'>
                Consulta información sobre elementos y compuestos
              </p>
              <button className='w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors'>
                Explorar
              </button>
            </div>

            <div className='bg-white p-6 rounded-lg shadow border'>
              <h3 className='text-lg font-semibold mb-3 text-gray-800'>
                Recursos Educativos
              </h3>
              <p className='text-gray-600 mb-4'>
                Material de estudio y ejercicios
              </p>
              <button className='w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors'>
                Ver Recursos
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className='mt-8 bg-white p-6 rounded-lg shadow border'>
            <h3 className='text-lg font-semibold mb-3 text-gray-800'>
              Estado de la Sesión
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <p>
                  <strong>Usuario ID:</strong> {user.uid}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Email verificado:</strong>{' '}
                  {user.emailVerified ? 'Sí' : 'No'}
                </p>
              </div>
              <div>
                <p>
                  <strong>Creado:</strong> {user.metadata.creationTime}
                </p>
                <p>
                  <strong>Último acceso:</strong> {user.metadata.lastSignInTime}
                </p>
                <p>
                  <strong>Proveedor:</strong>{' '}
                  {user.providerData[0]?.providerId || 'email'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
