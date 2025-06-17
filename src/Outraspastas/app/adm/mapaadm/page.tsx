"use client";

const admPages = [
  {
    path: "/adm",
    name: "Dashboard do ADM",
    detalhes: [
      "Resumo geral do site (usuários, cadastros, acessos, denúncias)",
      "Gráficos e estatísticas",
      "Acesso rápido para páginas de gestão"
    ],
    conexoes: ["/adm/usuarios", "/adm/denuncias", "/adm/relatorios", "/adm/edit/landing", "/adm/edit/cadastro"]
  },
  {
    path: "/adm/usuarios",
    name: "Gestão de Usuários",
    detalhes: [
      "Lista de usuários com filtros (nome, email, status, tipo)",
      "Visualizar, editar, bloquear/desbloquear, excluir usuário",
      "Acesso ao perfil completo do usuário",
      "Botão para criar novo usuário (admin)"
    ],
    conexoes: ["/adm", "/adm/usuarios/[id]"]
  },
  {
    path: "/adm/usuarios/[id]",
    name: "Perfil do Usuário (ADM)",
    detalhes: [
      "Visualização completa dos dados do usuário",
      "Histórico de ações",
      "Botões de editar, bloquear, excluir, resetar senha"
    ],
    conexoes: ["/adm/usuarios"]
  },
  {
    path: "/adm/denuncias",
    name: "Gestão de Denúncias",
    detalhes: [
      "Lista de denúncias recebidas",
      "Filtro por status (pendente, resolvida, arquivada)",
      "Visualizar detalhes da denúncia",
      "Botões para marcar como resolvida, arquivar, excluir"
    ],
    conexoes: ["/adm", "/adm/denuncias/[id]"]
  },
  {
    path: "/adm/denuncias/[id]",
    name: "Detalhe da Denúncia",
    detalhes: [
      "Visualização completa da denúncia",
      "Acesso ao perfil do denunciado e denunciante",
      "Botões de ação (resolver, arquivar, excluir)"
    ],
    conexoes: ["/adm/denuncias", "/adm/usuarios/[id]"]
  },
  {
    path: "/adm/relatorios",
    name: "Relatórios e Estatísticas",
    detalhes: [
      "Geração de relatórios customizados",
      "Exportação (PDF, Excel)",
      "Gráficos de uso, crescimento, denúncias, etc."
    ],
    conexoes: ["/adm"]
  },
  {
    path: "/adm/edit/landing",
    name: "Editor Visual da Landing Page",
    detalhes: [
      "Editor drag-and-drop de blocos",
      "Edição inline de textos, imagens, botões",
      "Painel de SEO",
      "Salvar em localStorage",
      "Tabs para outras páginas"
    ],
    conexoes: ["/adm", "/adm/edit/cadastro"]
  },
  {
    path: "/adm/edit/cadastro",
    name: "Editor Visual da Página de Cadastro",
    detalhes: [
      "Editor visual dos blocos de cadastro",
      "Painel de SEO",
      "Salvar em localStorage"
    ],
    conexoes: ["/adm", "/adm/edit/landing"]
  }
];

export default function MapaADM() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mapa do ADM - Resumo e Checklist</h1>
      <ul className="space-y-8">
        {admPages.map((page) => (
          <li key={page.path} className="border rounded-lg p-4 bg-white/80 shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{page.name}</span>
              <span className="text-xs text-gray-500">{page.path}</span>
            </div>
            <div>
              <span className="font-medium">Funcionalidades/detalhes:</span>
              <ul className="list-disc ml-6 text-sm">
                {page.detalhes.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
            <div className="mt-2">
              <span className="font-medium">Conexões:</span>
              <ul className="list-disc ml-6 text-sm">
                {page.conexoes.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-gray-500">Checklist do ADM: garanta que todas as páginas, funcionalidades e conexões estejam implementadas para uma administração completa do site.</p>
    </div>
  );
} 