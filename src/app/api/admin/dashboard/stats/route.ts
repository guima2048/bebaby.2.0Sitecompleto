import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    // Verificar autenticação
    const token = cookies().get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto');
      if (typeof decoded !== 'object' || decoded.role !== 'admin') {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // TODO: Implementar busca real no banco de dados
    // Por enquanto, retornamos dados mockados
    return NextResponse.json({
      totalUsers: 150,
      activeUsers: 120,
      blockedUsers: 5,
      totalPosts: 45,
      pendingApprovals: 3
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 