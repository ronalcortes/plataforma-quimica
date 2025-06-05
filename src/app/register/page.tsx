'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useUserManagement } from '../../hooks/useUserManagement';
import PasswordInput from '../../components/PasswordInput';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: 'ESTUDIANTE' | 'PROFESOR' | 'ADMINISTRADOR';
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const RegisterPage = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const { createUserProfile } = useUserManagement();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'ESTUDIANTE', // Por defecto ESTUDIANTE en mayúscula
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('El apellido es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    if (!formData.role) {
      setError('Debes seleccionar un rol');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos de servicio');
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
      // Registrar usuario en Firebase Auth
      const { user, error: authError } = await signUp(
        formData.email,
        formData.password
      );

      if (authError || !user) {
        setError(authError || 'Error al crear la cuenta');
        return;
      }

      // Crear perfil de usuario en Firestore
      const { error: profileError } = await createUserProfile(user, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      });

      if (profileError) {
        setError(
          'Cuenta creada pero error al guardar el perfil: ' + profileError
        );
        return;
      }

      setSuccess('¡Cuenta creada exitosamente! Redirigiendo...');

      // Redirigir después de un breve delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('Error inesperado al crear la cuenta');
      console.error('Error en registro:', err);
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

          {/* Formulario de registro */}
          <div className='card p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium mb-2 sugamuxi-text-black'
                  >
                    Nombre <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                    placeholder='Juan'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium mb-2 sugamuxi-text-black'
                  >
                    Apellido <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                    placeholder='Pérez'
                    required
                  />
                </div>
              </div>

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

              <div>
                <label
                  htmlFor='role'
                  className='block text-sm font-medium mb-2 sugamuxi-text-black'
                >
                  Rol <span className='text-red-500'>*</span>
                </label>
                <select
                  id='role'
                  name='role'
                  value={formData.role}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                  required
                >
                  <option value='ESTUDIANTE'>Estudiante</option>
                  <option value='PROFESOR'>Profesor</option>
                  <option value='ADMINISTRADOR'>Administrador</option>
                </select>
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

              <PasswordInput
                id='confirmPassword'
                name='confirmPassword'
                label='Confirmar Contraseña'
                placeholder='••••••••'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />

              <div className='flex items-start'>
                <label className='flex items-start'>
                  <input
                    type='checkbox'
                    name='acceptTerms'
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className='mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500'
                    required
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
                    <span className='text-red-500 ml-1'>*</span>
                  </span>
                </label>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full button-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
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
