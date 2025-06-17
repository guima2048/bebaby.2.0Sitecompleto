# Exemplos de Rotas de Backend/API para Admin

> Estes exemplos foram movidos de src/app/aprovar/page.tsx para referência e documentação.

---

## src/app/api/admin/login/route.ts
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();
    // Simulação de autenticação
    if (email === 'admin@exemplo.com' && senha === 'senha123') {
      // Gerar token temporário para 2FA
      const tokenTemp = 'temp_' + Math.random().toString(36).substring(7);
      // Salvar token em cookie seguro
      cookies().set('admin_temp_token', tokenTemp, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 300 // 5 minutos
      });
      // TODO: Enviar código 2FA por email
      console.log('Código 2FA: 123456');
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

---

## src/app/api/admin/2fa/verify/route.ts
```ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { codigo } = await req.json();
    const cookieStore = cookies();
    const tokenTemp = cookieStore.get('admin_temp_token');

    if (!tokenTemp) {
      return NextResponse.json(
        { message: 'Sessão expirada' },
        { status: 401 }
      );
    }

    // TODO: Implementar validação real do código 2FA
    if (codigo === '123456') {
      // Gerar JWT
      const token = 'jwt_' + Math.random().toString(36).substring(7);
      // Deletar token temporário
      cookieStore.delete('admin_temp_token');
      // Salvar JWT em cookie seguro
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 24 horas
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { message: 'Código inválido' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erro na verificação 2FA:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
``` 