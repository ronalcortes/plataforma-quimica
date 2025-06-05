import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/profile', '/admin', '/games'];

// Rutas públicas (no requieren autenticación)
const publicRoutes = ['/', '/login', '/register', '/about'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Si es una ruta protegida, verificar autenticación
  if (isProtectedRoute) {
    // Verificar si hay datos de sesión en las cookies o headers
    const sessionCookie = request.cookies.get('userSession');

    // Si no hay sesión, redirigir al login
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si el usuario está autenticado y trata de acceder a login/register, redirigir a games
  if (pathname === '/login' || pathname === '/register') {
    const sessionCookie = request.cookies.get('userSession');
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/games', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
