import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { nome, email, idade, busca, senha } = await req.json();

    // Validação básica
    if (!nome || !email || !idade || !busca || !senha) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    if (typeof idade !== 'number' || idade < 18 || idade > 99) {
      return NextResponse.json({ error: 'Idade inválida.' }, { status: 400 });
    }
    if (!['homem', 'mulher'].includes(busca)) {
      return NextResponse.json({ error: 'Campo "busca" inválido.' }, { status: 400 });
    }
    if (senha.length < 6) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 6 caracteres.' }, { status: 400 });
    }

    // Verifica se o e-mail já existe
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 409 });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        idade,
        busca,
        senha: senhaHash,
        status: 'pending',
        roles: 'user',
      },
    });

    // Retorna o usuário sem a senha
    const { senha: _, ...userSafe } = user;
    return NextResponse.json(userSafe, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao registrar usuário.' }, { status: 500 });
  }
} 