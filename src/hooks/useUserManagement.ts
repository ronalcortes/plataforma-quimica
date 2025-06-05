import { useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ESTUDIANTE' | 'PROFESOR' | 'ADMINISTRADOR';
  createdAt: Date;
  updatedAt: Date;
}

export const useUserManagement = () => {
  const { createDocument, getDocument, updateDocument, getCollection, where } =
    useFirestore();

  const createUserProfile = async (
    user: User,
    additionalData: {
      firstName: string;
      lastName: string;
      role?: 'ESTUDIANTE' | 'PROFESOR' | 'ADMINISTRADOR';
    }
  ) => {
    const userProfile: Omit<UserProfile, 'id'> = {
      uid: user.uid,
      email: user.email || '',
      firstName: additionalData.firstName,
      lastName: additionalData.lastName,
      role: additionalData.role || 'ESTUDIANTE', // Por defecto ESTUDIANTE en mayúscula
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await createDocument('users', userProfile);
  };

  const getUserProfile = async (uid: string) => {
    return await getDocument('users', uid);
  };

  const getUserProfileByEmail = useCallback(
    async (email: string) => {
      try {
        const result = await getCollection('users', [
          where('email', '==', email),
        ]);

        if (result.error) {
          return { data: null, error: result.error };
        }

        if (result.data && result.data.length > 0) {
          // Retornar el primer usuario encontrado (debería ser único por email)
          return { data: result.data[0], error: null };
        } else {
          return { data: null, error: 'Usuario no encontrado' };
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error desconocido';
        return { data: null, error: errorMessage };
      }
    },
    [getCollection, where]
  );

  const updateUserProfile = async (
    uid: string,
    updates: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
  ) => {
    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };
    return await updateDocument('users', uid, updateData);
  };

  return {
    createUserProfile,
    getUserProfile,
    getUserProfileByEmail,
    updateUserProfile,
  };
};
