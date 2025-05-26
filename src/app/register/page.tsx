import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterPage = () => {
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
            <Link href='/login'>
              <button className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-white/30'>
                Iniciar Sesión
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
              Crear Cuenta
            </h2>
            <p className='text-gray-600'>
              Únete a la plataforma química del Colegio Sugamuxi
            </p>
          </div>

          {/* Formulario de registro */}
          <div className='card p-8'>
            <form className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium mb-2 sugamuxi-text-black'
                  >
                    Nombre
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                    placeholder='Juan'
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium mb-2 sugamuxi-text-black'
                  >
                    Apellido
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                    placeholder='Pérez'
                  />
                </div>
              </div>

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
                  htmlFor='role'
                  className='block text-sm font-medium mb-2 sugamuxi-text-black'
                >
                  Rol
                </label>
                <select
                  id='role'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                >
                  <option value=''>Selecciona tu rol</option>
                  <option value='student'>Estudiante</option>
                  <option value='teacher'>Profesor</option>
                  <option value='admin'>Administrador</option>
                </select>
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

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium mb-2 sugamuxi-text-black'
                >
                  Confirmar Contraseña
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                  placeholder='••••••••'
                />
              </div>

              <div className='flex items-start'>
                <label className='flex items-start'>
                  <input
                    type='checkbox'
                    className='mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500'
                  />
                  <span className='ml-2 text-sm text-gray-600'>
                    Acepto los{' '}
                    <a href='#' className='hover:underline sugamuxi-text-green'>
                      términos de servicio
                    </a>{' '}
                    y la{' '}
                    <a href='#' className='hover:underline sugamuxi-text-green'>
                      política de privacidad
                    </a>
                  </span>
                </label>
              </div>

              <button
                type='submit'
                className='w-full button-primary py-3 text-lg'
              >
                Crear Cuenta
              </button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                ¿Ya tienes cuenta?{' '}
                <Link
                  href='/login'
                  className='font-semibold hover:underline sugamuxi-text-green'
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-gray-500'>
              Al registrarte, tendrás acceso a todas las herramientas de la
              plataforma química.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
