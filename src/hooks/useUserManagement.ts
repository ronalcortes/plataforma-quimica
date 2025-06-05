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
  const { createDocument, getDocument, updateDocument } = useFirestore();

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
    updateUserProfile,
  };
};
