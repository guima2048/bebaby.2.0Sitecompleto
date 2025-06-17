import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'; // Trocar em produção

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json();
    if (!email || !senha) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Usuário ou senha inválidos.' }, { status: 401 });
    }
    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) {
      return NextResponse.json({ error: 'Usuário ou senha inválidos.' }, { status: 401 });
    }
    if (user.status !== 'active') {
      return NextResponse.json({ error: 'Conta não está ativa.' }, { status: 403 });
    }
    // Gera JWT
    const token = jwt.sign({ id: user.id, email: user.email, roles: user.roles }, JWT_SECRET, { expiresIn: '7d' });
    // Retorna dados do usuário (sem senha) e token
    const { senha: _, ...userSafe } = user;
    return NextResponse.json({ user: userSafe, token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao autenticar.' }, { status: 500 });
  }
} 