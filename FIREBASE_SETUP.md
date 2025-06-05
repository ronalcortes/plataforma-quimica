# Configuración de Firebase

## Pasos para configurar Firebase en tu proyecto

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Sigue los pasos del asistente para crear tu proyecto

### 2. Configurar la aplicación web

1. En la consola de Firebase, haz clic en el ícono web (</>) para agregar una aplicación web
2. Registra tu aplicación con un nombre descriptivo
3. Copia la configuración que te proporciona Firebase

### 3. Configurar variables de entorno

1. Crea un archivo `.env.local` en la raíz de tu proyecto
2. Agrega las siguientes variables con los valores de tu configuración de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### 4. Habilitar servicios de Firebase

#### Authentication

1. Ve a "Authentication" en el menú lateral
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Correo electrónico/contraseña"

#### Firestore Database

1. Ve a "Firestore Database" en el menú lateral
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (puedes cambiar las reglas después)
4. Elige una ubicación para tu base de datos

#### Storage (opcional)

1. Ve a "Storage" en el menú lateral
2. Haz clic en "Comenzar"
3. Acepta las reglas de seguridad predeterminadas

### 5. Configurar reglas de seguridad

#### Firestore Rules (ejemplo básico)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura solo a usuarios autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules (ejemplo básico)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Uso en tu aplicación

### 1. Envolver tu aplicación con el AuthProvider

En tu `layout.tsx` o `_app.tsx`:

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Usar los hooks en tus componentes

```tsx
import { useAuthContext } from '@/contexts/AuthContext';
import { useFirestore } from '@/hooks/useFirestore';

function MiComponente() {
  const { user, signIn, logout } = useAuthContext();
  const { createDocument, getCollection } = useFirestore();

  // Tu lógica aquí...
}
```

## Archivos creados

- `src/lib/firebase.ts` - Configuración principal de Firebase
- `src/hooks/useAuth.ts` - Hook para autenticación
- `src/hooks/useFirestore.ts` - Hook para operaciones con Firestore
- `src/contexts/AuthContext.tsx` - Contexto global de autenticación

## Próximos pasos

1. Configura las variables de entorno
2. Habilita los servicios necesarios en Firebase Console
3. Ajusta las reglas de seguridad según tus necesidades
4. Comienza a usar los hooks en tus componentes
