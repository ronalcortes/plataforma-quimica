import { useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useSessionStorage } from './useSessionStorage';
import { useUserManagement, UserProfile } from './useUserManagement';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const {
    clearSessionData,
    updateLastLogin,
    saveSessionData,
    updateSessionWithProfile,
  } = useSessionStorage();
  const { getUserProfileByEmail } = useUserManagement();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuario autenticado, actualizar último login
        updateLastLogin();

        // Obtener perfil del usuario por email y actualizar sesión
        try {
          const profileResult = await getUserProfileByEmail(user.email || '');
          if (!profileResult.error && profileResult.data) {
            const profile = profileResult.data as unknown as UserProfile;
            // Verificar que el perfil tiene las propiedades necesarias
            if (profile.firstName && profile.lastName && profile.role) {
              updateSessionWithProfile({
                firstName: profile.firstName,
                lastName: profile.lastName,
                role: profile.role,
              });
            }
          }
        } catch (error) {
          console.error('Error al cargar perfil del usuario:', error);
        }
      } else {
        // Usuario no autenticado, limpiar datos de sesión
        clearSessionData();
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Remover las dependencias problemáticas

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      console.log('🔐 Iniciando proceso de login...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login exitoso en Firebase Auth');

      // Obtener perfil del usuario por email
      console.log('📋 Obteniendo perfil del usuario por email...');
      const profileResult = await getUserProfileByEmail(email);
      console.log('📋 Resultado del perfil:', profileResult);

      let userProfile = undefined;

      if (!profileResult.error && profileResult.data) {
        const profile = profileResult.data as unknown as UserProfile;
        console.log('👤 Perfil obtenido:', profile);

        // Verificar que el perfil tiene las propiedades necesarias
        if (profile.firstName && profile.lastName && profile.role) {
          userProfile = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            role: profile.role,
          };
          console.log('✅ Perfil de usuario válido:', userProfile);
        } else {
          console.warn('⚠️ Perfil incompleto:', {
            firstName: profile.firstName,
            lastName: profile.lastName,
            role: profile.role,
          });
        }
      } else {
        console.error('❌ Error al obtener perfil:', profileResult.error);
      }

      // Guardar datos de sesión después del login exitoso
      console.log('💾 Guardando datos de sesión con perfil:', userProfile);
      saveSessionData(result.user, rememberMe, userProfile);
      console.log('✅ Datos de sesión guardados');

      return { user: result.user, error: null };
    } catch (error: unknown) {
      console.error('❌ Error en signIn:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al iniciar sesión';
      return { user: null, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: result.user, error: null };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al registrarse';
      return { user: null, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearSessionData(); // Limpiar datos de sesión al cerrar sesión
      return { error: null };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al cerrar sesión';
      return { error: errorMessage };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al restablecer contraseña';
      return { error: errorMessage };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
  };
};
