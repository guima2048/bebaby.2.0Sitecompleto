"use client";

const backendMap = [
  {
    modulo: "Usuários",
    entidades: ["User", "Profile", "Preferences"],
    endpoints: [
      "POST /api/usuarios (criar usuário)",
      "GET /api/usuarios (listar usuários)",
      "GET /api/usuarios/:id (detalhe do usuário)",
      "PUT /api/usuarios/:id (editar usuário)",
      "DELETE /api/usuarios/:id (excluir/bloquear)"
    ],
    regras: [
      "Validação de dados (email único, senha forte)",
      "Hash de senha (bcrypt)",
      "Verificação de email",
      "Permissões: admin pode tudo, usuário só edita o próprio"
    ],
    integracoes: ["Envio de email (verificação, recuperação)"]
  },
  {
    modulo: "Autenticação",
    entidades: ["Session", "Token"],
    endpoints: [
      "POST /api/auth/login",
      "POST /api/auth/logout",
      "POST /api/auth/refresh",
      "POST /api/auth/recuperar-senha"
    ],
    regras: [
      "JWT para autenticação",
      "Refresh token",
      "Proteção de rotas privadas",
      "Recuperação de senha por email"
    ],
    integracoes: ["Envio de email"]
  },
  {
    modulo: "Perfis e Busca",
    entidades: ["Profile", "SearchFilters"],
    endpoints: [
      "GET /api/perfis (listar perfis)",
      "GET /api/perfis/:id (detalhe do perfil)",
      "POST /api/busca (buscar perfis com filtros)"] ,
    regras: [
      "Filtros avançados (idade, cidade, interesses)",
      "Paginação de resultados",
      "Privacidade: só usuários logados podem buscar"
    ],
    integracoes: []
  },
  {
    modulo: "Chat e Mensagens",
    entidades: ["Chat", "Message"],
    endpoints: [
      "GET /api/chats (listar conversas)",
      "POST /api/chats (iniciar conversa)",
      "GET /api/chats/:id/mensagens (listar mensagens)",
      "POST /api/chats/:id/mensagens (enviar mensagem)"
    ],
    regras: [
      "Mensagens em tempo real (WebSocket ou polling)",
      "Bloqueio de usuários impede chat",
      "Notificações de novas mensagens"
    ],
    integracoes: ["WebSocket", "Notificações push"]
  },
  {
    modulo: "Notificações",
    entidades: ["Notification"],
    endpoints: [
      "GET /api/notificacoes",
      "POST /api/notificacoes"
    ],
    regras: [
      "Notificar eventos importantes (match, mensagem, denúncia)",
      "Marcar como lida"
    ],
    integracoes: ["Push", "Email"]
  },
  {
    modulo: "Denúncias e Moderação",
    entidades: ["Report", "ModerationLog"],
    endpoints: [
      "POST /api/denuncias",
      "GET /api/denuncias",
      "GET /api/denuncias/:id",
      "PUT /api/denuncias/:id (resolver/arquivar)"
    ],
    regras: [
      "Apenas admins podem resolver/arquivar",
      "Usuário pode denunciar qualquer perfil ou mensagem",
      "Logs de moderação"
    ],
    integracoes: ["Email para equipe de moderação"]
  },
  {
    modulo: "Administração/Relatórios",
    entidades: ["Admin", "ReportLog"],
    endpoints: [
      "GET /api/relatorios/usuarios",
      "GET /api/relatorios/denuncias",
      "GET /api/relatorios/uso"
    ],
    regras: [
      "Acesso restrito a admins",
      "Exportação de dados (PDF, Excel)"
    ],
    integracoes: []
  }
];

export default function MapaBackend() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mapa e Planejamento do Backend</h1>
      <ul className="space-y-8">
        {backendMap.map((mod) => (
          <li key={mod.modulo} className="border rounded-lg p-4 bg-white/80 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{mod.modulo}</span>
            </div>
            <div>
              <span className="font-medium">Entidades:</span>
              <ul className="list-disc ml-6 text-sm">
                {mod.entidades.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
            <div className="mt-2">
              <span className="font-medium">Endpoints principais:</span>
              <ul className="list-disc ml-6 text-sm">
                {mod.endpoints.map((ep, i) => <li key={i}>{ep}</li>)}
              </ul>
            </div>
            <div className="mt-2">
              <span className="font-medium">Regras de negócio:</span>
              <ul className="list-disc ml-6 text-sm">
                {mod.regras.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            {mod.integracoes.length > 0 && (
              <div className="mt-2">
                <span className="font-medium">Integrações:</span>
                <ul className="list-disc ml-6 text-sm">
                  {mod.integracoes.map((int, i) => <li key={i}>{int}</li>)}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Conexões com o Front/ADM</h2>
        <ul className="list-disc ml-6 text-sm">
          <li>APIs RESTful consumidas pelo front (Next.js) e pelo painel ADM</li>
          <li>Autenticação JWT protegendo rotas sensíveis</li>
          <li>WebSocket para chat/mensagens em tempo real</li>
          <li>Envio de emails (verificação, notificações, denúncias)</li>
          <li>Permissões: usuários comuns vs. admins</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500">Este mapa serve como guia para a arquitetura, implementação e integração do backend com o restante do projeto.</p>
      </div>
    </div>
  );
} 