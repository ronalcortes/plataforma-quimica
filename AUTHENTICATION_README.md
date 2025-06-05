# Sistema de Autenticación - Plataforma Química Colegio Sugamuxi

## Descripción

Este sistema de autenticación está integrado con Firebase Authentication y proporciona funcionalidades completas de login, registro, gestión de sesión y protección de rutas.

## Características Implementadas

### 🔐 Autenticación

- **Login con email y contraseña** usando Firebase Auth
- **Registro de nuevos usuarios** con perfiles en Firestore
- **Recuperación de contraseña** por email
- **Validación de formularios** en tiempo real
- **Manejo de errores** con mensajes en español

### 💾 Gestión de Sesión

- **Persistencia de sesión** configurable:
  - `localStorage` para "Recordarme" (30 días)
  - `sessionStorage` para sesiones temporales (hasta cerrar navegador)
- **Cookies de sesión** para middleware de protección de rutas
- **Validación de sesión** con expiración automática
- **Limpieza automática** de datos al cerrar sesión

### 🛡️ Protección de Rutas

- **Middleware** que protege rutas privadas
- **Redirección automática** a login si no está autenticado
- **Redirección a dashboard** si ya está autenticado

### 📱 Componentes

- **LoginForm**: Formulario completo de inicio de sesión
- **SessionInfo**: Componente para mostrar información de sesión
- **Dashboard**: Página protegida de ejemplo

## Estructura de Archivos

```
src/
├── Features/Login/components/
│   ├── LoginForm.tsx              # Formulario de login principal
│   └── SocialLoginButtons.tsx     # Botones de login social
├── hooks/
│   ├── useAuth.ts                 # Hook de autenticación Firebase
│   ├── useSessionStorage.ts       # Hook de gestión de sesión
│   ├── useFirestore.ts           # Hook para operaciones Firestore
│   └── useUserManagement.ts      # Hook para gestión de perfiles
├── contexts/
│   └── AuthContext.tsx           # Contexto global de autenticación
├── components/
│   └── SessionInfo.tsx           # Componente de información de sesión
├── app/
│   ├── login/page.tsx            # Página de login
│   ├── register/page.tsx         # Página de registro
│   ├── dashboard/page.tsx        # Dashboard protegido
│   └── layout.tsx                # Layout con AuthProvider
├── lib/
│   └── firebase.ts               # Configuración de Firebase
└── middleware.ts                 # Middleware de protección de rutas
```

## Uso

### 1. Configuración Inicial

El sistema ya está configurado con Firebase. Asegúrate de que el `AuthProvider` esté envolviendo tu aplicación en `layout.tsx`:

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
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

### 2. Usar el Hook de Autenticación

```tsx
import { useAuth } from '@/hooks/useAuth';

function MiComponente() {
  const { user, signIn, logout, loading } = useAuth();

  const handleLogin = async () => {
    const { user, error } = await signIn(email, password);
    if (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;

  return <div>Bienvenido, {user.email}</div>;
}
```

### 3. Gestión de Sesión

```tsx
import { useSessionStorage } from '@/hooks/useSessionStorage';

function MiComponente() {
  const {
    sessionData,
    saveSessionData,
    clearSessionData,
    isSessionValid
  } = useSessionStorage();

  // Los datos se guardan automáticamente al hacer login
  // Puedes verificar si la sesión es válida
  const sessionIsValid = isSessionValid();
}
```

### 4. Proteger Rutas

Las rutas están protegidas automáticamente por el middleware. Para agregar nuevas rutas protegidas, edita `middleware.ts`:

```typescript
const protectedRoutes = ['/dashboard', '/profile', '/admin', '/nueva-ruta'];
```

## Flujo de Autenticación

1. **Usuario accede a ruta protegida** → Middleware verifica cookie de sesión
2. **Si no hay sesión** → Redirección a `/login`
3. **Usuario completa login** → Firebase autentica
4. **Login exitoso** → Se guardan datos en localStorage/sessionStorage y cookie
5. **Redirección a dashboard** → Usuario puede acceder a rutas protegidas

## Datos de Sesión

### Estructura de SessionData

```typescript
interface SessionData {
  uid: string;                    // ID único del usuario
  email: string | null;           // Email del usuario
  displayName: string | null;     // Nombre para mostrar
  photoURL: string | null;        // URL de foto de perfil
  lastLogin: string;              // Timestamp del último login
  rememberMe: boolean;            // Si está marcado "Recordarme"
}
```

### Almacenamiento

- **localStorage**: Cuando "Recordarme" está marcado (30 días)
- **sessionStorage**: Para sesiones temporales (hasta cerrar navegador)
- **Cookies**: Para verificación en middleware (misma duración que storage)

## Validación de Sesión

La sesión se considera válida si:

- Existe datos de sesión
- No ha expirado según el tiempo configurado:
  - **24 horas** si "Recordarme" está activo
  - **8 horas** para sesiones temporales

## Componentes Disponibles

### LoginForm

Formulario completo con:

- Campos de email y contraseña
- Checkbox "Recordarme"
- Recuperación de contraseña
- Validación y manejo de errores
- Mensajes de éxito/error

### SessionInfo

Muestra información detallada de:

- Datos del usuario de Firebase
- Información de sesión local
- Estado de validez de sesión
- Botones para cerrar sesión y limpiar datos

## Personalización

### Cambiar Duración de Sesión

Edita `useSessionStorage.ts`:

```typescript
// Cambiar las horas de validez
const maxHours = sessionData.rememberMe ? 48 : 12; // Ejemplo: 48h/12h
```

### Agregar Campos al Perfil

Edita `useUserManagement.ts` para agregar campos adicionales al perfil del usuario.

### Personalizar Mensajes

Todos los mensajes están en español y pueden personalizarse en cada componente.

## Seguridad

- **Cookies seguras**: `secure` y `samesite=strict`
- **Validación de sesión**: Verificación de expiración
- **Limpieza automática**: Datos se limpian al cerrar sesión
- **Protección de rutas**: Middleware verifica autenticación
- **Manejo de errores**: No se exponen detalles sensibles

## Próximos Pasos

1. **Implementar roles de usuario** (estudiante, profesor, admin)
2. **Agregar autenticación social** (Google, Facebook)
3. **Implementar verificación de email**
4. **Agregar autenticación de dos factores**
5. **Crear sistema de permisos granular**

## Troubleshooting

### Error: "useAuthContext debe ser usado dentro de un AuthProvider"

- Asegúrate de que `AuthProvider` esté envolviendo tu aplicación

### Sesión no persiste

- Verifica que localStorage/sessionStorage estén habilitados
- Revisa la configuración de cookies en el navegador

### Redirección infinita

- Verifica que las rutas en `middleware.ts` estén correctamente configuradas
- Asegúrate de que `/login` no esté en `protectedRoutes`
