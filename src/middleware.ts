import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rotas /admin (exceto /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;
    console.log('MIDDLEWARE: token', token);

    if (!token) {
      console.log('MIDDLEWARE: sem token, redirecionando para login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      // jose espera uma chave Uint8Array
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo_super_secreto');
      const { payload } = await jwtVerify(token, secret);
      console.log('MIDDLEWARE: decoded', payload);
      if (typeof payload === 'object' && payload.role === 'admin') {
        console.log('MIDDLEWARE: acesso liberado');
        return NextResponse.next();
      } else {
        console.log('MIDDLEWARE: token inválido, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (e) {
      console.log('MIDDLEWARE: erro ao verificar token', e);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 