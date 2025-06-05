'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from '../../components/PasswordInput';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, resetPassword } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    if (!formData.password.trim()) {
      setError('La contraseña es requerida');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { user, error: authError } = await signIn(
        formData.email,
        formData.password,
        formData.rememberMe
      );

      if (authError || !user) {
        setError(authError || 'Error al iniciar sesión');
        return;
      }

      setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');

      // Redirigir inmediatamente sin delay
      const redirectTo = searchParams.get('redirect') || '/games';
      router.push(redirectTo);
    } catch (err) {
      setError('Error inesperado al iniciar sesión');
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.email.trim()) {
      setError('Ingresa tu correo electrónico para restablecer la contraseña');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await resetPassword(formData.email);

      if (resetError) {
        setError(resetError);
        return;
      }

      setSuccess(
        'Se ha enviado un enlace de restablecimiento a tu correo electrónico'
      );
      setShowResetPassword(false);
    } catch (err) {
      setError('Error al enviar el enlace de restablecimiento');
      console.error('Error en reset password:', err);
    } finally {
      setLoading(false);
    }
  };

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

          {/* Mensajes de error y éxito */}
          {error && (
            <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              {error}
            </div>
          )}
          {success && (
            <div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
              {success}
            </div>
          )}

          {/* Formulario de login */}
          <div className='card p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-2 sugamuxi-text-black'
                >
                  Correo Electrónico <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                  placeholder='tu@email.com'
                  required
                />
              </div>

              <PasswordInput
                id='password'
                name='password'
                label='Contraseña'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <div className='flex items-center justify-between'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className='rounded border-gray-300 text-green-600 focus:ring-green-500'
                  />
                  <span className='ml-2 text-sm text-gray-600'>Recordarme</span>
                </label>
                <button
                  type='button'
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className='text-sm hover:underline sugamuxi-text-green'
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Sección de restablecer contraseña */}
              {showResetPassword && (
                <div className='p-4 bg-gray-50 rounded-lg border'>
                  <p className='text-sm text-gray-600 mb-3'>
                    Ingresa tu correo electrónico y te enviaremos un enlace para
                    restablecer tu contraseña.
                  </p>
                  <button
                    type='button'
                    onClick={handleResetPassword}
                    disabled={loading}
                    className='w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {loading
                      ? 'Enviando...'
                      : 'Enviar enlace de restablecimiento'}
                  </button>
                </div>
              )}

              <button
                type='submit'
                disabled={loading}
                className='w-full button-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
