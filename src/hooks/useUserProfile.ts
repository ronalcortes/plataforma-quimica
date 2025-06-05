import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useUserManagement, UserProfile } from './useUserManagement';

export const useUserProfile = () => {
  const { user } = useAuthContext();
  const { getUserProfile } = useUserManagement();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user?.uid) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await getUserProfile(user.uid);

        if (result.error) {
          setError(result.error);
          setUserProfile(null);
        } else if (result.data) {
          const profile = result.data as unknown as UserProfile;
          // Verificar que el perfil tiene las propiedades necesarias
          if (profile.firstName && profile.lastName && profile.role) {
            setUserProfile(profile);
          } else {
            setError('Perfil de usuario incompleto');
            setUserProfile(null);
          }
        } else {
          setError('No se encontró el perfil del usuario');
          setUserProfile(null);
        }
      } catch (err) {
        console.error('Error al cargar el perfil del usuario:', err);
        setError('Error al cargar el perfil del usuario');
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user?.uid, getUserProfile]);

  const isProfesor = userProfile?.role === 'PROFESOR';
  const isAdministrador = userProfile?.role === 'ADMINISTRADOR';
  const isEstudiante = userProfile?.role === 'ESTUDIANTE';

  return {
    userProfile,
    loading,
    error,
    isProfesor,
    isAdministrador,
    isEstudiante,
  };
};
