'use client';

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSessionStorage } from '../hooks/useSessionStorage';

const SessionInfo = () => {
  const { user, logout, loading } = useAuth();
  const { sessionData, clearSessionData, isSessionValid } = useSessionStorage();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <div className='p-4 bg-gray-100 rounded-lg'>
        <p className='text-gray-600'>Cargando información de sesión...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='p-4 bg-yellow-100 border border-yellow-400 rounded-lg'>
        <p className='text-yellow-800'>No hay usuario autenticado</p>
      </div>
    );
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg border'>
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>
        Información de Sesión
      </h3>

      {/* Información del usuario de Firebase */}
      <div className='mb-4'>
        <h4 className='font-medium text-gray-700 mb-2'>Usuario Firebase:</h4>
        <div className='bg-gray-50 p-3 rounded text-sm'>
          <p>
            <strong>UID:</strong> {user.uid}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Nombre:</strong> {user.displayName || 'No definido'}
          </p>
          <p>
            <strong>Email verificado:</strong>{' '}
            {user.emailVerified ? 'Sí' : 'No'}
          </p>
          <p>
            <strong>Último login:</strong> {user.metadata.lastSignInTime}
          </p>
        </div>
      </div>

      {/* Información de la sesión local */}
      {sessionData && (
        <div className='mb-4'>
          <h4 className='font-medium text-gray-700 mb-2'>
            Datos de Sesión Local:
          </h4>
          <div className='bg-blue-50 p-3 rounded text-sm'>
            <p>
              <strong>UID:</strong> {sessionData.uid}
            </p>
            <p>
              <strong>Email:</strong> {sessionData.email}
            </p>
            <p>
              <strong>Último login:</strong>{' '}
              {new Date(sessionData.lastLogin).toLocaleString()}
            </p>
            <p>
              <strong>Recordarme:</strong>{' '}
              {sessionData.rememberMe ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Almacenado en:</strong>{' '}
              {sessionData.rememberMe ? 'localStorage' : 'sessionStorage'}
            </p>
            <p>
              <strong>Sesión válida:</strong> {isSessionValid() ? 'Sí' : 'No'}
            </p>
            {/* Información del perfil del usuario */}
            {(sessionData.firstName ||
              sessionData.lastName ||
              sessionData.role) && (
              <>
                <hr className='my-2 border-blue-200' />
                <p className='font-medium text-blue-700 mb-1'>
                  Perfil del Usuario:
                </p>
                {sessionData.firstName && (
                  <p>
                    <strong>Nombre:</strong> {sessionData.firstName}
                  </p>
                )}
                {sessionData.lastName && (
                  <p>
                    <strong>Apellido:</strong> {sessionData.lastName}
                  </p>
                )}
                {sessionData.role && (
                  <p>
                    <strong>Rol:</strong> {sessionData.role}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className='flex gap-3'>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
        >
          Cerrar Sesión
        </button>

        <button
          onClick={clearSessionData}
          className='px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors'
        >
          Limpiar Datos de Sesión
        </button>
      </div>
    </div>
  );
};

export default SessionInfo;
