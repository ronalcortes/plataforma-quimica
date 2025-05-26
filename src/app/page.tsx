import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Header simplificado con botones de autenticación */}
      <header className='sugamuxi-header'>
        <div className='container mx-auto px-4'>
          {/* Botones de autenticación en la parte superior */}
          <div className='flex justify-end py-4 mb-4'>
            <div className='flex space-x-4'>
              <Link href='/login'>
                <button className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-white/30'>
                  Iniciar Sesión
                </button>
              </Link>
              <Link href='/register'>
                <button className='bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 font-semibold'>
                  Registrarse
                </button>
              </Link>
            </div>
          </div>

          {/* Contenido principal del header */}
          <div className='text-center pb-8'>
            <Image
              src='/Logo.png'
              alt='Logo Colegio Sugamuxi'
              width={100}
              height={100}
              className='sugamuxi-logo mx-auto mb-4'
            />
            <h1 className='text-4xl font-bold mb-2'>Colegio Sugamuxi</h1>
            <p className='text-xl opacity-90'>Plataforma Química Digital</p>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-12'>
        {/* Mensaje de bienvenida simple */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4 sugamuxi-text-black'>
            Bienvenido a la Plataforma Química
          </h2>
        </div>

        {/* Información institucional simple */}
        <div className='text-center py-12 border-t border-gray-200'>
          <div className='flex items-center justify-center space-x-4 mb-4'>
            <Image
              src='/Logo.png'
              alt='Logo Colegio Sugamuxi'
              width={50}
              height={50}
              className='opacity-80'
            />
            <div>
              <p className='font-semibold text-lg sugamuxi-text-black'>
                Colegio Sugamuxi
              </p>
              <p className='text-gray-600'>Excelencia Educativa desde 1905</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
