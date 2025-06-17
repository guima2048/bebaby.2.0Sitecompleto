'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialUserModel = {
  // Campos básicos de autenticação
  id: { type: 'string', description: 'Identificador único do usuário (UUID)' },
  nomeUsuario: { type: 'string', description: 'Nome de usuário (único)' },
  email: { type: 'string', description: 'E-mail do usuário (único)' },
  senhaHash: { type: 'string', description: 'Hash da senha (bcrypt)' },
  
  // Campos de perfil básicos
  nomeCompleto: { type: 'string', description: 'Nome completo do usuário' },
  dataNascimento: { type: 'date', description: 'Data de nascimento' },
  genero: { type: 'enum', values: ['masculino', 'feminino'], description: 'Gênero' },
  oQueBusca: { type: 'array', description: 'O que busca (pode selecionar um ou mais)', values: ['homem', 'mulher', 'casal'] },
  
  // Campos específicos para sugar dating
  papelSugar: { type: 'enum', values: ['sugar_daddy', 'sugar_mommy', 'sugar_baby'], description: 'Papel no relacionamento sugar' },
  estadoCivil: { type: 'enum', values: ['solteiro', 'divorciado', 'viúvo', 'complicado'], description: 'Estado civil' },
  temFilhos: { type: 'boolean', description: 'Possui filhos?' },
  querFilhos: { type: 'boolean', description: 'Deseja ter filhos?' },
  altura: { type: 'number', description: 'Altura em centímetros' },
  tipoFisico: { type: 'enum', values: ['magro', 'atlético', 'médio', 'acima_do_peso', 'obeso'], description: 'Tipo físico' },
  escolaridade: { type: 'enum', values: ['ensino_medio', 'tecnico', 'superior', 'mestrado', 'doutorado'], description: 'Nível de educação' },
  profissao: { type: 'string', description: 'Profissão' },
  faixaRenda: { type: 'enum', values: ['ate_50mil', '50mil_100mil', '100mil_200mil', '200mil_500mil', 'acima_500mil'], description: 'Faixa de renda anual' },
  
  // Campos de localização e idiomas
  cidade: { type: 'string', description: 'Cidade' },
  estado: { type: 'string', description: 'Estado' },
  pais: { type: 'string', description: 'País' },
  idiomas: { type: 'array', description: 'Idiomas falados' },
  dispostoMudar: { type: 'boolean', description: 'Disposto a mudar de cidade?' },
  
  // Campos de preferências
  procuraPor: { type: 'array', description: 'Tipos de relacionamento desejados' },
  preferenciaIdade: { type: 'json', description: 'Faixa de idade desejada (min/max)' },
  distanciaMaxima: { type: 'number', description: 'Distância máxima em km' },
  
  // Campos de perfil social
  biografia: { type: 'text', description: 'Biografia do usuário' },
  interesses: { type: 'array', description: 'Interesses e hobbies' },
  fotos: { type: 'array', description: 'Fotos do perfil (públicas/privadas)' },
  statusVerificacao: { type: 'enum', values: ['nao_verificado', 'pendente', 'verificado'], description: 'Status de verificação do perfil' },
  
  // Campos de assinatura e status
  tipoConta: { type: 'enum', values: ['gratuita', 'premium', 'vip'], description: 'Tipo de conta' },
  statusAssinatura: { type: 'enum', values: ['ativa', 'expirada', 'cancelada'], description: 'Status da assinatura' },
  dataExpiracaoAssinatura: { type: 'datetime', description: 'Data de expiração da assinatura' },
  nivelAcesso: { type: 'enum', values: ['usuario', 'moderador'], description: 'Nível de permissão' },
  statusConta: { type: 'enum', values: ['pendente', 'ativa', 'inativa', 'banida'], description: 'Status da conta' },
  
  // Campos de segurança e auditoria
  emailVerificado: { type: 'boolean', description: 'E-mail verificado?' },
  ultimoLogin: { type: 'datetime', description: 'Último login (data e hora)' },
  ultimaAtividade: { type: 'datetime', description: 'Última atividade no sistema' },
  tentativasLogin: { type: 'number', description: 'Tentativas de login (reset após 24h)' },
  bloqueadoAte: { type: 'datetime', description: 'Bloqueado até (se exceder tentativas)' },
  dataCriacao: { type: 'date', description: 'Data de criação' },
  dataAtualizacao: { type: 'date', description: 'Última atualização' }
};

const initialAdminModel = {
  id: { type: 'string', description: 'Identificador único do admin (UUID)' },
  email: { type: 'string', description: 'E-mail do admin (único)' },
  senhaHash: { type: 'string', description: 'Hash da senha (bcrypt)' },
  nivelAcesso: { type: 'enum', values: ['admin', 'super_admin'], description: 'Nível de permissão' },
  statusConta: { type: 'enum', values: ['ativa', 'inativa', 'banida'], description: 'Status da conta' }
};

export default function AprovarModelPage() {
  const [userModel, setUserModel] = useState(initialUserModel);
  const [adminModel, setAdminModel] = useState(initialAdminModel);
  const [approvedUser, setApprovedUser] = useState(true);
  const [approvedAdmin, setApprovedAdmin] = useState(true);
  const [comment, setComment] = useState('Modelagens aprovadas com sucesso.');

  const renderTable = (model, title) => (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Campo</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Descrição</th>
              <th className="p-2 border">Valores (se enum)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(model).map(([key, value]) => (
              <tr key={key}>
                <td className="p-2 border font-mono">{key}</td>
                <td className="p-2 border">{value.type}</td>
                <td className="p-2 border">{value.description}</td>
                <td className="p-2 border text-xs">
                  {(value.type === 'enum' || value.type === 'array') && value.values ? value.values.join(', ') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Aprovação de Modelagens</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderTable(userModel, 'Modelagem: Tabela Usuário')}
          {renderTable(adminModel, 'Modelagem: Tabela Administrador')}

          <div className="mt-8 p-4 bg-green-50 rounded border border-green-200">
            <h3 className="font-semibold mb-4 text-green-800">Status de Aprovação:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-green-700">Tabela Usuário: Aprovada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-green-700">Tabela Administrador: Aprovada</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-2">Comentário:</label>
            <textarea
              className="w-full border rounded px-3 py-2 bg-gray-50"
              rows={3}
              value={comment}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔒 PROTEGIDO: Está proibido alterar qualquer coisa neste arquivo sem autorização expressa do admin responsável pelo projeto.
// Se precisar modificar, solicite aprovação formal do responsável.
// Senha de aprovação: 77330011

// Componentes de Autenticação de Administrador
const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      router.push('/admin/2fa');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login Administrativo
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          {erro && (
            <div className="text-red-500 text-sm text-center">{erro}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={carregando}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Admin2FAPage = () => {
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('/api/admin/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Código inválido');
      }

      router.push('/admin/dashboard');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao verificar código');
    } finally {
      setCarregando(false);
    }
  };

  const handleReenviar = () => {
    alert('Funcionalidade de reenvio será implementada em breve');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verificação em Duas Etapas
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite o código de 6 dígitos enviado para seu email
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="codigo" className="sr-only">
              Código de Verificação
            </label>
            <input
              id="codigo"
              name="codigo"
              type="text"
              required
              maxLength={6}
              pattern="[0-9]{6}"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Digite o código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
          </div>

          {erro && (
            <div className="text-red-500 text-sm text-center">{erro}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={carregando}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {carregando ? 'Verificando...' : 'Verificar'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleReenviar}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Reenviar código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// API Routes
const AdminLoginRoute = async (req: Request) => {
  try {
    const { email, senha } = await req.json();

    // Simulação de autenticação
    if (email === 'admin@exemplo.com' && senha === 'senha123') {
      // Gerar token temporário para 2FA
      const tokenTemp = 'temp_' + Math.random().toString(36).substring(7);
      
      // Salvar token em cookie seguro
      const cookieStore = cookies();
      cookieStore.set('admin_temp_token', tokenTemp, {
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
};

const Admin2FAVerifyRoute = async (req: Request) => {
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
};

/*
============================================================
CÓDIGOS DE BACKEND/API UTILIZADOS NO PROJETO (NÃO EXECUTÁVEIS AQUI)
============================================================

// 🔒 PROTEGIDO: Está proibido alterar qualquer coisa neste bloco sem autorização expressa do admin responsável pelo projeto.
// Se precisar modificar, solicite aprovação formal do responsável.
// Senha de aprovação: 77330011

// --- src/app/api/admin/login/route.ts ---
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

// --- src/app/api/admin/2fa/verify/route.ts ---
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

============================================================
FIM DOS CÓDIGOS DE BACKEND/API
============================================================
*/ 