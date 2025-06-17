// 🔒 PROTEGIDO: Está proibido alterar qualquer coisa neste arquivo sem autorização expressa do admin responsável pelo projeto.
// Se precisar modificar, solicite aprovação formal do responsável.
// Senha de aprovação: 77330011

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    // Verificar token temporário
    const tempToken = cookies().get('admin_temp_token');
    if (!tempToken) {
      return NextResponse.json(
        { error: 'Sessão expirada' },
        { status: 401 }
      );
    }

    // TODO: Implementar validação real do código 2FA
    // Por enquanto, vamos aceitar um código fixo
    if (code === '123456') {
      // Gerar token JWT real
      const jwtToken = jwt.sign(
        { email: 'admin@exemplo.com', role: 'admin' },
        process.env.JWT_SECRET || 'segredo_super_secreto',
        { expiresIn: '1h' }
      );
      
      // Remover token temporário
      cookies().delete('admin_temp_token');
      
      // Salvar token JWT em cookie seguro
      cookies().set('admin_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hora
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Código inválido' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erro na verificação 2FA:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 