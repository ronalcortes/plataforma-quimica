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

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { clearSessionData, updateLastLogin, saveSessionData } =
    useSessionStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado, actualizar último login
        updateLastLogin();
      } else {
        // Usuario no autenticado, limpiar datos de sesión
        clearSessionData();
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [clearSessionData, updateLastLogin]);

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Guardar datos de sesión después del login exitoso
      saveSessionData(result.user, rememberMe);
      return { user: result.user, error: null };
    } catch (error: unknown) {
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
