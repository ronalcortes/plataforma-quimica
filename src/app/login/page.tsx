import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Header con estilo Sugamuxi */}
      <header className='sugamuxi-header'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center py-4'>
            <Link href='/' className='flex items-center space-x-3'>
              <Image
                src='/Logo.png'
                alt='Logo Colegio Sugamuxi'
                width={60}
                height={60}
                className='sugamuxi-logo'
              />
              <div>
                <h1 className='text-2xl font-bold'>Colegio Sugamuxi</h1>
                <p className='text-sm opacity-90'>Plataforma Química</p>
              </div>
            </Link>
            <Link href='/register'>
              <button className='bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 font-semibold'>
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-md mx-auto'>
          {/* Título */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-2 sugamuxi-text-black'>
              Iniciar Sesión
            </h2>
            <p className='text-gray-600'>
              Accede a tu cuenta de la plataforma química
            </p>
          </div>

          {/* Formulario de login */}
          <div className='card p-8'>
            <form className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-2 sugamuxi-text-black'
                >
                  Correo Electrónico
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                  placeholder='tu@email.com'
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mb-2 sugamuxi-text-black'
                >
                  Contraseña
                </label>
                <input
                  type='password'
                  id='password'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                  placeholder='••••••••'
                />
              </div>

              <div className='flex items-center justify-between'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='rounded border-gray-300 text-green-600 focus:ring-green-500'
                  />
                  <span className='ml-2 text-sm text-gray-600'>Recordarme</span>
                </label>
                <a
                  href='#'
                  className='text-sm hover:underline sugamuxi-text-green'
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type='submit'
                className='w-full button-primary py-3 text-lg'
              >
                Iniciar Sesión
              </button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                ¿No tienes cuenta?{' '}
                <Link
                  href='/register'
                  className='font-semibold hover:underline sugamuxi-text-green'
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-gray-500'>
              Al iniciar sesión, aceptas nuestros términos de servicio y
              política de privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
