import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

interface SessionData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLogin: string;
  rememberMe: boolean;
}

export const useSessionStorage = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  // Cargar datos de sesión al inicializar
  useEffect(() => {
    loadSessionData();
  }, []);

  const loadSessionData = () => {
    try {
      // Primero intentar cargar desde localStorage (recordarme = true)
      const localData = localStorage.getItem('userSession');
      if (localData) {
        const parsedData = JSON.parse(localData);
        setSessionData(parsedData);
        return;
      }

      // Si no hay en localStorage, intentar sessionStorage
      const sessionStorageData = sessionStorage.getItem('userSession');
      if (sessionStorageData) {
        const parsedData = JSON.parse(sessionStorageData);
        setSessionData(parsedData);
        return;
      }
    } catch (error) {
      console.error('Error al cargar datos de sesión:', error);
      clearSessionData();
    }
  };

  const saveSessionData = (user: User, rememberMe: boolean = false) => {
    const data: SessionData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: new Date().toISOString(),
      rememberMe,
    };

    setSessionData(data);

    try {
      if (rememberMe) {
        // Guardar en localStorage (persistente)
        localStorage.setItem('userSession', JSON.stringify(data));
        // Limpiar sessionStorage si existe
        sessionStorage.removeItem('userSession');

        // Guardar cookie persistente (30 días)
        document.cookie = `userSession=${JSON.stringify(data)}; max-age=${
          30 * 24 * 60 * 60
        }; path=/; secure; samesite=strict`;
      } else {
        // Guardar en sessionStorage (temporal)
        sessionStorage.setItem('userSession', JSON.stringify(data));
        // Limpiar localStorage si existe
        localStorage.removeItem('userSession');

        // Guardar cookie de sesión
        document.cookie = `userSession=${JSON.stringify(
          data
        )}; path=/; secure; samesite=strict`;
      }
    } catch (error) {
      console.error('Error al guardar datos de sesión:', error);
    }
  };

  const clearSessionData = () => {
    setSessionData(null);
    try {
      localStorage.removeItem('userSession');
      sessionStorage.removeItem('userSession');

      // Limpiar cookie
      document.cookie =
        'userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (error) {
      console.error('Error al limpiar datos de sesión:', error);
    }
  };

  const updateLastLogin = () => {
    if (sessionData) {
      const updatedData = {
        ...sessionData,
        lastLogin: new Date().toISOString(),
      };
      setSessionData(updatedData);

      try {
        const storage = sessionData.rememberMe ? localStorage : sessionStorage;
        storage.setItem('userSession', JSON.stringify(updatedData));
      } catch (error) {
        console.error('Error al actualizar último login:', error);
      }
    }
  };

  const isSessionValid = (): boolean => {
    if (!sessionData) return false;

    try {
      const lastLogin = new Date(sessionData.lastLogin);
      const now = new Date();
      const diffInHours =
        (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);

      // Sesión válida por 24 horas si "recordarme" está activo, 8 horas si no
      const maxHours = sessionData.rememberMe ? 24 : 8;
      return diffInHours < maxHours;
    } catch (error) {
      console.error('Error al validar sesión:', error);
      return false;
    }
  };

  return {
    sessionData,
    saveSessionData,
    clearSessionData,
    updateLastLogin,
    isSessionValid,
    loadSessionData,
  };
};
