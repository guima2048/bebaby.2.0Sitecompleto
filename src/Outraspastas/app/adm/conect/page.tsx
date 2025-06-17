"use client";

const connections = [
  {
    frontend: "/cadastro",
    backend: ["POST /api/usuarios (criação de usuário)", "Envio de email de verificação"],
    detalhes: [
      "Envia dados do formulário para criar usuário",
      "Recebe resposta de sucesso/erro",
      "Dispara email de verificação"
    ]
  },
  {
    frontend: "/login",
    backend: ["POST /api/auth/login", "POST /api/auth/recuperar-senha"],
    detalhes: [
      "Envia email e senha para autenticação",
      "Recebe token JWT para sessões",
      "Recuperação de senha via email"
    ]
  },
  {
    frontend: "/perfil",
    backend: ["GET /api/usuarios/:id", "PUT /api/usuarios/:id"],
    detalhes: [
      "Busca dados do usuário logado",
      "Permite edição de perfil"
    ]
  },
  {
    frontend: "/busca",
    backend: ["POST /api/busca", "GET /api/perfis"],
    detalhes: [
      "Envia filtros de busca para o backend",
      "Recebe lista de perfis compatíveis"
    ]
  },
  {
    frontend: "/chat",
    backend: ["GET /api/chats", "GET /api/chats/:id/mensagens", "POST /api/chats/:id/mensagens", "WebSocket"],
    detalhes: [
      "Carrega conversas e mensagens",
      "Envia e recebe mensagens em tempo real"
    ]
  },
  {
    frontend: "/notificacoes",
    backend: ["GET /api/notificacoes"],
    detalhes: [
      "Busca notificações do usuário",
      "Marca notificações como lidas"
    ]
  },
  {
    frontend: "/denuncia",
    backend: ["POST /api/denuncias"],
    detalhes: [
      "Envia denúncia para o backend",
      "Notifica equipe de moderação"
    ]
  },
  {
    frontend: "/adm",
    backend: ["GET /api/relatorios/usuarios", "GET /api/relatorios/denuncias", "GET /api/usuarios", "GET /api/denuncias"],
    detalhes: [
      "Carrega dados para dashboards e relatórios",
      "Permite ações administrativas"
    ]
  },
  {
    frontend: "/adm/edit/landing",
    backend: ["(Futuro: endpoints para CMS visual)", "GET/PUT /api/landing"],
    detalhes: [
      "No momento usa localStorage, mas será integrado ao backend para salvar layout e conteúdo da landing page"
    ]
  }
];

export default function Conect() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Conexões Frontend ↔ Backend</h1>
      <ul className="space-y-8">
        {connections.map((conn) => (
          <li key={conn.frontend} className="border rounded-lg p-4 bg-white/80 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{conn.frontend}</span>
              <span className="text-xs text-gray-500">{conn.backend.join(", ")}</span>
            </div>
            <div>
              <span className="font-medium">Fluxo de dados:</span>
              <ul className="list-disc ml-6 text-sm">
                {conn.detalhes.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Pontos de Atenção</h2>
        <ul className="list-disc ml-6 text-sm">
          <li>Autenticação JWT obrigatória para rotas protegidas</li>
          <li>Validação de dados no backend e feedback no frontend</li>
          <li>Tratamento de erros e mensagens amigáveis</li>
          <li>Integração futura do editor visual com API de CMS</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500">Este mapa facilita o alinhamento entre equipes de front e back, garantindo integração eficiente e segura.</p>
      </div>
    </div>
  );
} 