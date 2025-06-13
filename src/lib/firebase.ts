import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBAjKDpMvoD6MI6x8ijNkTDfjdazP6MFyw',
  authDomain: 'sugamuxyquimica.firebaseapp.com',
  projectId: 'sugamuxyquimica',
  storageBucket: 'sugamuxyquimica.firebasestorage.app',
  messagingSenderId: '1010471824173',
  appId: '1:1010471824173:web:bb3e288b5793a9f13501a4',
  measurementId: 'G-9Z31Q6LMYL',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
