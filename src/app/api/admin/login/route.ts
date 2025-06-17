// 🔒 PROTEGIDO: Está proibido alterar qualquer coisa neste arquivo sem autorização expressa do admin responsável pelo projeto.
// Se precisar modificar, solicite aprovação formal do responsável.
// Senha de aprovação: 77330011

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validação de senha forte: mínimo 8 caracteres e pelo menos 1 letra maiúscula
    const senhaForte = password.length >= 8 && /[A-Z]/.test(password);
    if (!senhaForte) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 8 caracteres e conter ao menos uma letra maiúscula.' },
        { status: 400 }
      );
    }

    // TODO: Implementar validação real com banco de dados
    // Por enquanto, vamos simular uma autenticação
    if (email === 'admin@exemplo.com' && password === 'Senha123') {
      // Gerar JWT real
      const jwtToken = jwt.sign(
        { email: 'admin@exemplo.com', role: 'admin' },
        process.env.JWT_SECRET || 'segredo_super_secreto',
        { expiresIn: '1h' }
      );
      // Salvar JWT em cookie seguro
      cookies().set('admin_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hora
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}