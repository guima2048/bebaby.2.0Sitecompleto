import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const token = cookies().get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto');
      if (typeof decoded === 'object' && decoded.role === 'admin') {
        return NextResponse.json({ authenticated: true });
      }
    } catch (e) {
      // Token inválido ou expirado
      cookies().delete('admin_token');
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
} 