import { useState } from 'react';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Crear documento
  const createDocument = async (collectionName: string, data: DocumentData) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      setLoading(false);
      return { id: docRef.id, error: null };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      return { id: null, error: errorMessage };
    }
  };

  // Leer documento por ID
  const getDocument = async (collectionName: string, docId: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      setLoading(false);

      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
      } else {
        return { data: null, error: 'Documento no encontrado' };
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  };

  // Leer colección completa o con filtros
  const getCollection = async (
    collectionName: string,
    constraints: QueryConstraint[] = []
  ) => {
    setLoading(true);
    setError(null);
    try {
      const q =
        constraints.length > 0
          ? query(collection(db, collectionName), ...constraints)
          : collection(db, collectionName);

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoading(false);
      return { data: documents, error: null };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      return { data: [], error: errorMessage };
    }
  };

  // Actualizar documento
  const updateDocument = async (
    collectionName: string,
    docId: string,
    data: Partial<DocumentData>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      setLoading(false);
      return { error: null };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  };

  // Eliminar documento
  const deleteDocument = async (collectionName: string, docId: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      setLoading(false);
      return { error: null };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      return { error: errorMessage };
    }
  };

  return {
    loading,
    error,
    createDocument,
    getDocument,
    getCollection,
    updateDocument,
    deleteDocument,
    // Helpers para queries
    where,
    orderBy,
    limit,
  };
};
