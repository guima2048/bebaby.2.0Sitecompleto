"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

const siteMap = [
  {
    path: "/",
    name: "Landing Page",
    blocks: [
      "Banner com imagem e chamada principal",
      "Cards de perfis fictícios (masculinos e femininos)",
      "Seções institucionais (sobre, benefícios, segurança)",
      "Provas sociais",
      "Chamada para ação (CTA)",
      "FAQ",
      "Rodapé institucional com links",
      "Botões de cadastro/login",
      "Menu hamburguer mobile"
    ],
    missing: []
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    blocks: [
      "Banner/background com overlays",
      "Header com logo e ícones (menu hamburguer, usuário)",
      "Título: Cadastro de usuário",
      "Formulário: nome, e-mail, repetir e-mail, idade, busca",
      "Botão: Próximo passo"
    ],
    missing: [
      "Validação de campos avançada",
      "Feedback visual de erro/sucesso",
      "Indicação de progresso (etapas do cadastro)"
    ]
  },
  {
    path: "/login",
    name: "Login",
    blocks: [
      "Banner/background",
      "Formulário de login",
      "Botões sociais (Facebook, Google)",
      "Link para cadastro",
      "Menu hamburguer"
    ],
    missing: [
      "Recuperação de senha visível",
      "Feedback visual de erro/sucesso"
    ]
  },
  {
    path: "/perfil",
    name: "Perfil",
    blocks: [
      "Banner do perfil",
      "Informações do usuário",
      "Botão editar perfil",
      "Botão ver matches",
      "Cards de destaques",
      "Menu hamburguer"
    ],
    missing: [
      "Upload/edição de foto de perfil",
      "Exclusão de conta"
    ]
  },
  {
    path: "/busca",
    name: "Busca",
    blocks: [
      "Banner de busca",
      "Filtros de busca",
      "Cards de perfis sugeridos",
      "Botão buscar agora",
      "Menu hamburguer"
    ],
    missing: [
      "Filtros avançados (localização, interesses)",
      "Paginação ou scroll infinito"
    ]
  },
  {
    path: "/chat",
    name: "Chat",
    blocks: [
      "Banner de chat",
      "Lista de conversas",
      "Botão nova mensagem",
      "Menu hamburguer"
    ],
    missing: [
      "Indicação de mensagens não lidas",
      "Busca de conversas"
    ]
  },
  {
    path: "/notificacoes",
    name: "Notificações",
    blocks: [
      "Banner de notificações",
      "Lista de notificações",
      "Botão ver todas",
      "Menu hamburguer"
    ],
    missing: [
      "Marcar como lida",
      "Filtro de notificações"
    ]
  },
  {
    path: "/configuracoes",
    name: "Configurações",
    blocks: [
      "Banner de configurações",
      "Preferências de conta",
      "Preferências de privacidade",
      "Botão salvar alterações",
      "Menu hamburguer"
    ],
    missing: [
      "Alteração de senha",
      "Excluir conta"
    ]
  },
  {
    path: "/denuncia",
    name: "Denúncia",
    blocks: [
      "Banner de denúncia",
      "Como denunciar",
      "Formulário de denúncia",
      "Botão enviar denúncia",
      "Menu hamburguer"
    ],
    missing: [
      "Upload de evidências (imagens, prints)"
    ]
  },
  {
    path: "/ajuda",
    name: "Ajuda",
    blocks: [
      "Banner de ajuda",
      "Tópicos de ajuda",
      "Blocos institucionais (conta, segurança)",
      "Botão fale conosco",
      "Menu hamburguer"
    ],
    missing: [
      "Busca de tópicos",
      "Chat de suporte"
    ]
  },
  {
    path: "/termos",
    name: "Termos de Uso",
    blocks: [
      "Banner de termos",
      "Texto dos termos",
      "Botão baixar PDF",
      "Menu hamburguer"
    ],
    missing: []
  },
  {
    path: "/privacidade",
    name: "Política de Privacidade",
    blocks: [
      "Banner de privacidade",
      "Texto da política",
      "Botão baixar PDF",
      "Menu hamburguer"
    ],
    missing: []
  },
  {
    path: "/sobre",
    name: "Sobre",
    blocks: [
      "Banner sobre",
      "Missão",
      "Texto institucional",
      "Provas sociais",
      "Menu hamburguer"
    ],
    missing: []
  },
  {
    path: "/contato",
    name: "Fale Conosco",
    blocks: [
      "Banner de contato",
      "Canais de atendimento",
      "Redes sociais",
      "Botão enviar mensagem",
      "Menu hamburguer"
    ],
    missing: [
      "Formulário de contato funcional"
    ]
  },
  {
    path: "/faq",
    name: "FAQ",
    blocks: [
      "Banner FAQ",
      "Lista de perguntas e respostas",
      "Botão fazer uma pergunta",
      "Menu hamburguer"
    ],
    missing: [
      "Busca de perguntas"
    ]
  },
  {
    path: "/busca-resultado",
    name: "Resultado da Busca",
    blocks: [],
    missing: [
      "Página de resultado de busca ainda não construída"
    ]
  },
  // ADM
  {
    path: "/adm/edit/landing",
    name: "Editor Visual - Landing",
    blocks: [
      "Editor drag-and-drop de blocos",
      "Edição inline de textos, imagens, botões",
      "Painel de SEO",
      "Salvar em localStorage",
      "Tabs para outras páginas"
    ],
    missing: [
      "Preview em tempo real",
      "Exportação/importação de layout"
    ]
  },
  {
    path: "/adm/edit/cadastro",
    name: "Editor Visual - Cadastro",
    blocks: [
      "Editor visual dos blocos de cadastro",
      "Painel de SEO",
      "Salvar em localStorage"
    ],
    missing: [
      "Preview em tempo real",
      "Edição de campos do formulário como campos reais"
    ]
  }
];

const pageConnections = [
  { from: "/", to: ["/cadastro", "/login", "/busca", "/faq", "/sobre", "/contato", "/termos", "/privacidade"] },
  { from: "/cadastro", to: ["/login", "/"] },
  { from: "/login", to: ["/cadastro", "/recuperar-senha", "/"] },
  { from: "/perfil", to: ["/busca", "/chat", "/configuracoes", "/notificacoes", "/"] },
  { from: "/busca", to: ["/perfil", "/busca-resultado", "/chat", "/notificacoes", "/"] },
  { from: "/busca-resultado", to: ["/perfil", "/chat", "/notificacoes", "/busca"] },
  { from: "/chat", to: ["/perfil", "/busca", "/notificacoes", "/"] },
  { from: "/notificacoes", to: ["/perfil", "/chat", "/busca", "/"] },
  { from: "/configuracoes", to: ["/perfil", "/"] },
  { from: "/denuncia", to: ["/ajuda", "/"] },
  { from: "/ajuda", to: ["/contato", "/denuncia", "/"] },
  { from: "/termos", to: ["/privacidade", "/"] },
  { from: "/privacidade", to: ["/termos", "/"] },
  { from: "/sobre", to: ["/contato", "/"] },
  { from: "/contato", to: ["/sobre", "/ajuda", "/"] },
  { from: "/faq", to: ["/ajuda", "/"] }
];

export default function MapaSite() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const initialChecked: Record<string, boolean> = {};
    
    siteMap.forEach(section => {
      section.blocks.forEach(block => {
        initialChecked[`${section.path}-${block}`] = true;
      });
      
      section.missing.forEach(item => {
        initialChecked[`${section.path}-${item}`] = false;
      });
    });
    
    return initialChecked;
  });

  const toggleItem = (path: string, block: string) => {
    const key = `${path}-${block}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mapa do Site - Checklist</h1>
        
        <div className="space-y-8">
          {siteMap.map((section) => (
            <div key={section.path} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-blue-600 mr-2">{section.path}</span>
                {section.name}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Blocos Implementados</h3>
                    <ul className="space-y-2">
                      {section.blocks.map((block) => (
                        <li key={block} className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleItem(section.path, block)}
                            className="focus:outline-none"
                          >
                            {checkedItems[`${section.path}-${block}`] ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-300" />
                            )}
                          </button>
                          <span className="text-gray-600">{block}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {section.missing.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-3">Pendências</h3>
                      <ul className="space-y-2">
                        {section.missing.map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleItem(section.path, item)}
                              className="focus:outline-none"
                            >
                              {checkedItems[`${section.path}-${item}`] ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-300" />
                              )}
                            </button>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 