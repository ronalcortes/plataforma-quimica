import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD30b-NJ29i8bSVDaPq_u478PtQ70CE9Kk',
  authDomain: 'plataformaquimica-bf8de.firebaseapp.com',
  projectId: 'plataformaquimica-bf8de',
  storageBucket: 'plataformaquimica-bf8de.firebasestorage.app',
  messagingSenderId: '1026634996791',
  appId: '1:1026634996791:web:52f73780d325b4ccd873b2',
  measurementId: 'G-PCTN7NJY2E',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
