"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Tipos dos blocos

type BannerBlock = {
  id: number;
  type: "banner";
  background: string;
  title: string;
  subtitle: string;
  buttons: { text: string; link: string }[];
};
type SectionTitleBlock = { id: number; type: "section-title"; content: string };
type SectionTextBlock = { id: number; type: "section-text"; content: string };
type ProfilesBlock = {
  id: number;
  type: "profiles";
  gender: "feminino" | "masculino";
  profiles: { name: string; age: number; city: string; image: string }[];
};
type InstitutionalBlock = {
  id: number;
  type: "institutional";
  blocks: { title: string; items: string[] }[];
};
type HowItWorksBlock = {
  id: number;
  type: "how-it-works";
  steps: string[];
};
type SocialProofBlock = {
  id: number;
  type: "social-proof";
  proofs: { label: string; description: string }[];
};
type CtaBlock = {
  id: number;
  type: "cta";
  text: string;
  button: { text: string; link: string };
};
type FaqBlock = {
  id: number;
  type: "faq";
  faqs: { question: string; answer: string }[];
};
type TextBlock = { id: number; type: "text"; content: string };
type ImageBlock = { id: number; type: "image"; content: string };
type ButtonBlock = { id: number; type: "button"; content: string };

type LandingBlock =
  | BannerBlock
  | SectionTitleBlock
  | SectionTextBlock
  | ProfilesBlock
  | InstitutionalBlock
  | HowItWorksBlock
  | SocialProofBlock
  | CtaBlock
  | FaqBlock
  | TextBlock
  | ImageBlock
  | ButtonBlock;

const initialBlocks: LandingBlock[] = [
  // Banner
  { id: 1, type: "banner", background: "/main_impact.png", title: "Encontre conexões autênticas e experiências únicas", subtitle: "O site de relacionamento para quem busca privacidade, respeito e liberdade.", buttons: [
    { text: "Cadastre-se grátis", link: "/cadastro" },
    { text: "Entrar", link: "/login" },
  ] },
  // Seção perfis femininos
  { id: 2, type: "section-title", content: "Para quem busca novas experiências" },
  { id: 3, type: "section-text", content: "Descubra mulheres jovens, autênticas e decididas, prontas para viver novas histórias e compartilhar momentos especiais." },
  { id: 4, type: "profiles", gender: "feminino", profiles: [
    { name: "Secretária", age: 23, city: "São Paulo", image: "/perfil-exemplo.png" },
    { name: "Universitária", age: 20, city: "Belo Horizonte", image: "/exemplo12.jpg" },
    { name: "Estudante", age: 25, city: "Florianópolis", image: "/exemplo13.jpg" },
  ] },
  // Seção perfis masculinos
  { id: 5, type: "section-title", content: "Para quem valoriza companhia e bons momentos" },
  { id: 6, type: "section-text", content: "Conheça homens maduros, bem-sucedidos e generosos, prontos para compartilhar experiências e valorizar sua companhia." },
  { id: 7, type: "profiles", gender: "masculino", profiles: [
    { name: "Executivo", age: 42, city: "Curitiba", image: "/exemplo14.jpg" },
    { name: "Médico", age: 50, city: "Rio de Janeiro", image: "/exemplo11.jpg" },
    { name: "Empresário", age: 47, city: "Goiânia", image: "/exemplo41.png" },
  ] },
  // Blocos institucionais
  { id: 8, type: "institutional", blocks: [
    {
      title: "Para quem busca novas experiências",
      items: [
        "Descubra pessoas interessantes e compatíveis",
        "Ambiente seguro e privativo",
        "Perfis verificados e moderados",
        "Conexões sem julgamentos"
      ]
    },
    {
      title: "Para quem valoriza companhia e bons momentos",
      items: [
        "Encontre pessoas que valorizam sua presença",
        "Relacionamentos transparentes e respeitosos",
        "Liberdade para ser você mesmo",
        "Comunidade ativa e diversa"
      ]
    }
  ] },
  { id: 9, type: "how-it-works", steps: [
    "Crie sua conta grátis",
    "Monte seu perfil e conte sua história",
    "Descubra e conecte-se com pessoas compatíveis",
    "Viva novas experiências com segurança e privacidade"
  ] },
  { id: 10, type: "social-proof", proofs: [
    { label: "+10 mil", description: "usuários satisfeitos" },
    { label: "100%", description: "Privacidade e segurança" },
    { label: "Perfis", description: "verificados e moderados" },
  ] },
  { id: 11, type: "cta", text: "Pronto para viver algo novo?", button: { text: "Cadastre-se grátis", link: "/cadastro" } },
  // FAQ
  { id: 12, type: "faq", faqs: [
    { question: "O que é o BeBaby?", answer: "O BeBaby é um site de relacionamento moderno, seguro e privativo, feito para quem busca conexões autênticas e experiências únicas." },
    { question: "Como faço para me cadastrar?", answer: "Basta clicar em 'Cadastre-se grátis', preencher seu perfil e começar a explorar novas conexões." },
    { question: "O BeBaby é seguro?", answer: "Sim! Todos os perfis são verificados e moderados. Sua privacidade e segurança são prioridades." },
    { question: "Preciso pagar para usar?", answer: "O cadastro é gratuito e você pode começar a usar a plataforma sem custos. Recursos premium podem ser oferecidos futuramente." },
    { question: "Como proteger meus dados?", answer: "O BeBaby segue as melhores práticas de privacidade e proteção de dados. Saiba mais em nossa Política de Privacidade." },
  ] },
];

// Lista de páginas disponíveis para edição
const availablePages = [
  { id: "landing", name: "Landing Page", path: "/" },
  { id: "cadastro", name: "Cadastro", path: "/cadastro" },
  { id: "login", name: "Login", path: "/login" },
  { id: "perfil", name: "Perfil", path: "/perfil" },
  { id: "busca", name: "Busca", path: "/busca" },
  { id: "chat", name: "Chat", path: "/chat" },
  { id: "notificacoes", name: "Notificações", path: "/notificacoes" },
  { id: "configuracoes", name: "Configurações", path: "/configuracoes" },
  { id: "denuncia", name: "Denúncia", path: "/denuncia" },
  { id: "ajuda", name: "Ajuda", path: "/ajuda" },
  { id: "termos", name: "Termos de Uso", path: "/termos" },
  { id: "privacidade", name: "Política de Privacidade", path: "/privacidade" },
  { id: "sobre", name: "Sobre Nós", path: "/sobre" },
  { id: "contato", name: "Fale Conosco", path: "/contato" },
  { id: "faq", name: "FAQ", path: "/faq" },
];

// Conteúdo inicial para cada página
const initialPagesContent: Record<string, LandingBlock[]> = {
  landing: initialBlocks, // Já temos o conteúdo da landing page

  cadastro: [
    {
      id: 1,
      type: "banner",
      background: "/main_impact.png",
      title: "BeBaby",
      subtitle: "Cadastro de usuário",
      buttons: []
    },
    {
      id: 2,
      type: "section-title",
      content: "Cadastro de usuário"
    },
    {
      id: 3,
      type: "section-text",
      content: "Preencha os campos abaixo para criar sua conta."
    },
    {
      id: 4,
      type: "institutional",
      blocks: [
        {
          title: "Formulário de Cadastro",
          items: [
            "Nome de usuário: [campo de texto]",
            "E-mail: [campo de email]",
            "Repita o E-mail: [campo de email]",
            "Qual a sua idade? [select de 18 a 99]",
            "Estou em busca de: [select: Homem maduro buscando mulher / Mulher buscando homem maduro]"
          ]
        }
      ]
    },
    {
      id: 5,
      type: "section-text",
      content: "Botão: Próximo passo"
    }
  ],

  login: [
    {
      id: 1,
      type: "banner",
      background: "/login-banner.png",
      title: "Bem-vindo de volta!",
      subtitle: "Entre para continuar sua jornada",
      buttons: [
        { text: "Entrar com Facebook", link: "#" },
        { text: "Entrar com Google", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-text",
      content: "Não tem uma conta? Cadastre-se grátis e comece a encontrar conexões especiais."
    }
  ],

  perfil: [
    {
      id: 1,
      type: "banner",
      background: "/perfil-banner.png",
      title: "Seu Perfil",
      subtitle: "Mostre quem você é e encontre conexões especiais",
      buttons: [
        { text: "Editar Perfil", link: "#" },
        { text: "Ver Matches", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Destaques do seu perfil"
    },
    {
      id: 3,
      type: "profiles",
      gender: "feminino",
      profiles: [
        { name: "Seu Nome", age: 25, city: "Sua Cidade", image: "/perfil-exemplo.png" },
      ]
    }
  ],

  busca: [
    {
      id: 1,
      type: "banner",
      background: "/busca-banner.png",
      title: "Encontre conexões especiais",
      subtitle: "Descubra pessoas compatíveis com você",
      buttons: [
        { text: "Buscar Agora", link: "#" },
        { text: "Filtros Avançados", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Sugestões para você"
    },
    {
      id: 3,
      type: "profiles",
      gender: "feminino",
      profiles: [
        { name: "Maria", age: 23, city: "São Paulo", image: "/perfil-exemplo.png" },
        { name: "Ana", age: 25, city: "Rio de Janeiro", image: "/exemplo12.jpg" },
        { name: "Julia", age: 24, city: "Belo Horizonte", image: "/exemplo13.jpg" },
      ]
    }
  ],

  chat: [
    {
      id: 1,
      type: "banner",
      background: "/chat-banner.png",
      title: "Suas Conversas",
      subtitle: "Conecte-se e converse com pessoas especiais",
      buttons: [
        { text: "Nova Mensagem", link: "#" },
        { text: "Ver Todas", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Conversas Recentes"
    }
  ],

  notificacoes: [
    {
      id: 1,
      type: "banner",
      background: "/notificacoes-banner.png",
      title: "Suas Notificações",
      subtitle: "Acompanhe suas interações e novidades",
      buttons: [
        { text: "Ver Todas", link: "#" },
        { text: "Configurações", link: "#" },
      ]
    }
  ],

  configuracoes: [
    {
      id: 1,
      type: "banner",
      background: "/configuracoes-banner.png",
      title: "Configurações",
      subtitle: "Personalize sua experiência no BeBaby",
      buttons: [
        { text: "Salvar Alterações", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Preferências"
    },
    {
      id: 3,
      type: "institutional",
      blocks: [
        {
          title: "Privacidade",
          items: [
            "Visibilidade do perfil",
            "Notificações",
            "Mensagens",
            "Bloqueios"
          ]
        },
        {
          title: "Conta",
          items: [
            "Dados pessoais",
            "Senha",
            "Email",
            "Excluir conta"
          ]
        }
      ]
    }
  ],

  denuncia: [
    {
      id: 1,
      type: "banner",
      background: "/denuncia-banner.png",
      title: "Denúncia",
      subtitle: "Ajude a manter nossa comunidade segura",
      buttons: [
        { text: "Enviar Denúncia", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Como denunciar"
    },
    {
      id: 3,
      type: "how-it-works",
      steps: [
        "Identifique o comportamento inadequado",
        "Colete evidências (prints, mensagens)",
        "Preencha o formulário de denúncia",
        "Nossa equipe analisará em até 24h"
      ]
    }
  ],

  ajuda: [
    {
      id: 1,
      type: "banner",
      background: "/ajuda-banner.png",
      title: "Central de Ajuda",
      subtitle: "Estamos aqui para ajudar você",
      buttons: [
        { text: "Fale Conosco", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Tópicos de Ajuda"
    },
    {
      id: 3,
      type: "institutional",
      blocks: [
        {
          title: "Conta",
          items: [
            "Como criar uma conta",
            "Recuperar senha",
            "Alterar dados",
            "Excluir conta"
          ]
        },
        {
          title: "Segurança",
          items: [
            "Denunciar perfis",
            "Bloquear usuários",
            "Privacidade",
            "Dicas de segurança"
          ]
        }
      ]
    }
  ],

  termos: [
    {
      id: 1,
      type: "banner",
      background: "/termos-banner.png",
      title: "Termos de Uso",
      subtitle: "Conheça nossas regras e diretrizes",
      buttons: [
        { text: "Baixar PDF", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Termos e Condições"
    },
    {
      id: 3,
      type: "section-text",
      content: "Ao utilizar o BeBaby, você concorda com estes termos. Por favor, leia-os com atenção."
    }
  ],

  privacidade: [
    {
      id: 1,
      type: "banner",
      background: "/privacidade-banner.png",
      title: "Política de Privacidade",
      subtitle: "Saiba como protegemos seus dados",
      buttons: [
        { text: "Baixar PDF", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Sua Privacidade é Importante"
    },
    {
      id: 3,
      type: "section-text",
      content: "Conheça como coletamos, usamos e protegemos suas informações pessoais."
    }
  ],

  sobre: [
    {
      id: 1,
      type: "banner",
      background: "/sobre-banner.png",
      title: "Sobre o BeBaby",
      subtitle: "Conectando pessoas, criando histórias",
      buttons: [
        { text: "Conheça Nossa História", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Nossa Missão"
    },
    {
      id: 3,
      type: "section-text",
      content: "Criar um ambiente seguro e respeitoso para conexões autênticas e experiências únicas."
    },
    {
      id: 4,
      type: "social-proof",
      proofs: [
        { label: "+10 mil", description: "usuários ativos" },
        { label: "100%", description: "focados em segurança" },
        { label: "24/7", description: "suporte ao usuário" },
      ]
    }
  ],

  contato: [
    {
      id: 1,
      type: "banner",
      background: "/contato-banner.png",
      title: "Fale Conosco",
      subtitle: "Estamos aqui para ajudar",
      buttons: [
        { text: "Enviar Mensagem", link: "#" },
      ]
    },
    {
      id: 2,
      type: "section-title",
      content: "Canais de Atendimento"
    },
    {
      id: 3,
      type: "institutional",
      blocks: [
        {
          title: "Contato",
          items: [
            "Email: contato@bebaby.com",
            "WhatsApp: (11) 99999-9999",
            "Horário: 24/7",
            "Tempo de resposta: até 24h"
          ]
        },
        {
          title: "Redes Sociais",
          items: [
            "Instagram: @bebaby",
            "Facebook: /bebaby",
            "Twitter: @bebaby",
            "LinkedIn: /company/bebaby"
          ]
        }
      ]
    }
  ],

  faq: [
    {
      id: 1,
      type: "banner",
      background: "/faq-banner.png",
      title: "Perguntas Frequentes",
      subtitle: "Encontre respostas para suas dúvidas",
      buttons: [
        { text: "Fazer uma Pergunta", link: "#" },
      ]
    },
    {
      id: 2,
      type: "faq",
      faqs: [
        {
          question: "Como funciona o BeBaby?",
          answer: "O BeBaby é um site de relacionamento moderno e seguro, onde você pode criar seu perfil, encontrar pessoas compatíveis e iniciar conexões autênticas."
        },
        {
          question: "O BeBaby é gratuito?",
          answer: "Sim! O cadastro e uso básico são totalmente gratuitos. Oferecemos recursos premium opcionais para uma experiência ainda melhor."
        },
        {
          question: "Como garantir minha segurança?",
          answer: "Todos os perfis são verificados e moderados. Além disso, oferecemos ferramentas de denúncia, bloqueio e privacidade para sua segurança."
        },
        {
          question: "Como posso denunciar um perfil?",
          answer: "Você pode denunciar um perfil através do botão de denúncia em seu perfil ou conversa. Nossa equipe analisa todas as denúncias em até 24h."
        }
      ]
    }
  ]
};

// Estado inicial do SEO para cada página
const initialPagesSeo: Record<string, { title: string; description: string }> = {
  landing: {
    title: "BeBaby - Site de Relacionamento Moderno e Seguro",
    description: "Encontre conexões autênticas em um ambiente seguro e respeitoso. Cadastre-se grátis e comece sua jornada de relacionamentos."
  },
  cadastro: {
    title: "Cadastro - BeBaby",
    description: "Crie sua conta no BeBaby e comece a encontrar conexões especiais. Cadastro rápido, seguro e gratuito."
  },
  login: {
    title: "Login - BeBaby",
    description: "Entre no BeBaby e continue sua jornada de conexões. Login rápido e seguro com Facebook ou Google."
  },
  perfil: {
    title: "Seu Perfil - BeBaby",
    description: "Gerencie seu perfil no BeBaby. Edite suas informações, fotos e preferências para encontrar matches perfeitos."
  },
  busca: {
    title: "Busca - BeBaby",
    description: "Encontre pessoas compatíveis com você. Use filtros avançados e descubra conexões especiais no BeBaby."
  },
  chat: {
    title: "Chat - BeBaby",
    description: "Converse com seus matches no BeBaby. Chat seguro e privativo para conhecer melhor as pessoas."
  },
  notificacoes: {
    title: "Notificações - BeBaby",
    description: "Acompanhe suas interações e novidades no BeBaby. Receba alertas de matches, mensagens e muito mais."
  },
  configuracoes: {
    title: "Configurações - BeBaby",
    description: "Personalize sua experiência no BeBaby. Configure privacidade, notificações e preferências da sua conta."
  },
  denuncia: {
    title: "Denúncia - BeBaby",
    description: "Ajude a manter nossa comunidade segura. Denuncie comportamentos inadequados no BeBaby."
  },
  ajuda: {
    title: "Central de Ajuda - BeBaby",
    description: "Encontre respostas para suas dúvidas sobre o BeBaby. Suporte completo para sua experiência."
  },
  termos: {
    title: "Termos de Uso - BeBaby",
    description: "Conheça as regras e diretrizes do BeBaby. Termos de uso claros e transparentes para todos os usuários."
  },
  privacidade: {
    title: "Política de Privacidade - BeBaby",
    description: "Saiba como o BeBaby protege seus dados. Política de privacidade transparente e segura."
  },
  sobre: {
    title: "Sobre o BeBaby",
    description: "Conheça a história e missão do BeBaby. Um site de relacionamento focado em conexões autênticas e segurança."
  },
  contato: {
    title: "Fale Conosco - BeBaby",
    description: "Entre em contato com a equipe do BeBaby. Estamos aqui para ajudar você."
  },
  faq: {
    title: "Perguntas Frequentes - BeBaby",
    description: "Encontre respostas para as dúvidas mais comuns sobre o BeBaby. FAQ completo e atualizado."
  }
};

export default function AdmEditLanding() {
  // Estado para armazenar os blocos de todas as páginas
  const [pagesBlocks, setPagesBlocks] = useState<Record<string, LandingBlock[]>>(initialPagesContent);
  
  // Estado para SEO de cada página
  const [pagesSeo, setPagesSeo] = useState<Record<string, { title: string; description: string }>>(initialPagesSeo);

  const [selected, setSelected] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState("landing");

  // Funções atualizadas para trabalhar com a página atual
  function addBlock(type: "text" | "image" | "button") {
    setPagesBlocks(prev => ({
      ...prev,
      [currentPage]: [...prev[currentPage], { 
        id: Date.now(), 
        type, 
        content: type === "text" ? "Novo texto" : type === "button" ? "Novo botão" : "https://placehold.co/400x200" 
      }]
    }));
  }

  function updateBlock(id: number, content: string) {
    setPagesBlocks(prev => ({
      ...prev,
      [currentPage]: prev[currentPage].map(b => b.id === id ? { ...b, content } : b)
    }));
  }

  function removeBlock(id: number) {
    setPagesBlocks(prev => ({
      ...prev,
      [currentPage]: prev[currentPage].filter(b => b.id !== id)
    }));
    setSelected(null);
  }

  // Função para salvar alterações
  const save = () => {
    try {
      // Salvar blocos
      localStorage.setItem('bebaby_blocks', JSON.stringify(pagesBlocks));
      
      // Salvar SEO
      localStorage.setItem('bebaby_seo', JSON.stringify(pagesSeo));
      
      // Salvar última página editada
      localStorage.setItem('bebaby_last_page', currentPage);
      
      toast.success('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar alterações');
    }
  };

  // Carregar dados salvos
  useEffect(() => {
    try {
      // Carregar blocos
      const savedBlocks = localStorage.getItem('bebaby_blocks');
      if (savedBlocks) {
        setPagesBlocks(JSON.parse(savedBlocks));
      }
      
      // Carregar SEO
      const savedSeo = localStorage.getItem('bebaby_seo');
      if (savedSeo) {
        setPagesSeo(JSON.parse(savedSeo));
      }
      
      // Carregar última página editada
      const lastPage = localStorage.getItem('bebaby_last_page');
      if (lastPage) {
        setCurrentPage(lastPage);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados salvos');
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-10 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-center">Editor Visual do Site</h1>
        
        {/* Navegação por abas */}
        <div className="bg-white rounded-xl shadow mb-8 overflow-x-auto">
          <div className="flex gap-2 p-4 min-w-max">
            {availablePages.map(page => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page.id
                    ? "bg-[#a259cb] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>

        {/* Painel de SEO */}
        <div className="bg-white rounded-xl shadow p-4 mb-8 flex flex-col md:flex-row gap-4 items-center md:items-end">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Título SEO</label>
            <input 
              value={pagesSeo[currentPage].title} 
              onChange={e => setPagesSeo(prev => ({
                ...prev,
                [currentPage]: { ...prev[currentPage], title: e.target.value }
              }))} 
              className="w-full px-3 py-2 rounded border border-gray-300" 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Descrição SEO</label>
            <input 
              value={pagesSeo[currentPage].description} 
              onChange={e => setPagesSeo(prev => ({
                ...prev,
                [currentPage]: { ...prev[currentPage], description: e.target.value }
              }))} 
              className="w-full px-3 py-2 rounded border border-gray-300" 
            />
          </div>
          <button onClick={save} className="px-6 py-2 rounded bg-[#a259cb] text-white font-bold shadow hover:brightness-110 transition">Salvar</button>
        </div>

        {/* Barra de componentes */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => addBlock("text")}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold">Adicionar Texto</button>
          <button onClick={() => addBlock("image")}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold">Adicionar Imagem</button>
          <button onClick={() => addBlock("button")}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold">Adicionar Botão</button>
        </div>

        {/* Canvas de edição */}
        <div className="bg-white rounded-xl shadow p-6 min-h-[300px] flex flex-col gap-4">
          {pagesBlocks[currentPage].map(block => (
            <div key={block.id} className={`relative group border ${selected === block.id ? "border-[#a259cb]" : "border-transparent"} rounded p-2 transition-all`}
              onClick={() => setSelected(block.id)}>
              {/* Banner */}
              {block.type === "banner" && (
                <div className="flex flex-col gap-2 items-center">
                  <label className="block text-xs font-bold">Imagem de fundo</label>
                  <input value={block.background} onChange={e => setPagesBlocks(prev => ({
                    ...prev,
                    [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, background: e.target.value } : b)
                  }))} className="w-full px-2 py-1 rounded border border-gray-300 text-sm mb-2" />
                  <img src={block.background} alt="Banner" className="w-full max-w-lg rounded shadow mb-2" />
                  <input value={block.title} onChange={e => setPagesBlocks(prev => ({
                    ...prev,
                    [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, title: e.target.value } : b)
                  }))} className="w-full px-2 py-1 rounded border border-gray-300 text-lg font-bold mb-1" />
                  <input value={block.subtitle} onChange={e => setPagesBlocks(prev => ({
                    ...prev,
                    [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, subtitle: e.target.value } : b)
                  }))} className="w-full px-2 py-1 rounded border border-gray-300 text-base mb-2" />
                  <div className="flex gap-2">
                    {block.buttons.map((btn, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <input value={btn.text} onChange={e => {
                          const newBtns = [...block.buttons];
                          newBtns[i].text = e.target.value;
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, buttons: newBtns } : b)
                          }));
                        }} className="px-2 py-1 rounded border border-gray-300 text-sm mb-1" placeholder="Texto do botão" />
                        <input value={btn.link} onChange={e => {
                          const newBtns = [...block.buttons];
                          newBtns[i].link = e.target.value;
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, buttons: newBtns } : b)
                          }));
                        }} className="px-2 py-1 rounded border border-gray-300 text-sm" placeholder="Link do botão" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Section Title */}
              {block.type === "section-title" && (
                <input value={block.content} onChange={e => updateBlock(block.id, e.target.value)} className="w-full px-2 py-1 rounded border border-gray-300 text-lg font-bold" />
              )}
              {/* Section Text */}
              {block.type === "section-text" && (
                <textarea value={block.content} onChange={e => updateBlock(block.id, e.target.value)} className="w-full px-2 py-1 rounded border border-gray-300 text-base" rows={2} />
              )}
              {/* Profiles */}
              {block.type === "profiles" && (
                <div>
                  <div className="mb-2 font-bold text-xs">Perfis {block.gender}</div>
                  <div className="flex gap-4 flex-wrap">
                    {block.profiles.map((profile, idx) => (
                      <div key={idx} className="flex flex-col items-center border rounded p-2">
                        <img src={profile.image} alt={profile.name} className="w-16 h-16 rounded-full object-cover mb-1" />
                        <input value={profile.image} onChange={e => {
                          const newProfiles = [...block.profiles];
                          newProfiles[idx].image = e.target.value;
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, profiles: newProfiles } : b)
                          }));
                        }} className="w-32 px-1 py-1 rounded border border-gray-300 text-xs mb-1" placeholder="URL da imagem" />
                        <input value={profile.name} onChange={e => {
                          const newProfiles = [...block.profiles];
                          newProfiles[idx].name = e.target.value;
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, profiles: newProfiles } : b)
                          }));
                        }} className="w-32 px-1 py-1 rounded border border-gray-300 text-xs mb-1" placeholder="Nome" />
                        <input value={profile.age} type="number" onChange={e => {
                          const newProfiles = [...block.profiles];
                          newProfiles[idx].age = Number(e.target.value);
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, profiles: newProfiles } : b)
                          }));
                        }} className="w-16 px-1 py-1 rounded border border-gray-300 text-xs mb-1" placeholder="Idade" />
                        <input value={profile.city} onChange={e => {
                          const newProfiles = [...block.profiles];
                          newProfiles[idx].city = e.target.value;
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, profiles: newProfiles } : b)
                          }));
                        }} className="w-32 px-1 py-1 rounded border border-gray-300 text-xs" placeholder="Cidade" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Institutional */}
              {block.type === "institutional" && (
                <div className="flex flex-col md:flex-row gap-4">
                  {block.blocks.map((inst, idx) => (
                    <div key={idx} className="flex-1 bg-gray-50 rounded-xl p-2">
                      <input value={inst.title} onChange={e => {
                        const newBlocks = [...block.blocks];
                        newBlocks[idx].title = e.target.value;
                        setPagesBlocks(prev => ({
                          ...prev,
                          [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, blocks: newBlocks } : b)
                        }));
                      }} className="w-full px-2 py-1 rounded border border-gray-300 text-sm font-bold mb-1" />
                      <ul>
                        {inst.items.map((item, i) => (
                          <li key={i}>
                            <input value={item} onChange={e => {
                              const newBlocks = [...block.blocks];
                              newBlocks[idx].items[i] = e.target.value;
                              setPagesBlocks(prev => ({
                                ...prev,
                                [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, blocks: newBlocks } : b)
                              }));
                            }} className="w-full px-2 py-1 rounded border border-gray-300 text-xs mb-1" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {/* How it works */}
              {block.type === "how-it-works" && (
                <div>
                  <div className="font-bold text-xs mb-1">Como funciona?</div>
                  <ol className="list-decimal list-inside">
                    {block.steps.map((step, idx) => (
                      <li key={idx}>
                        <input value={step} onChange={e => {
                          const newSteps = [...block.steps];
                          newSteps[idx] = e.target.value;
                          setPagesBlocks(prev => ({
                            ...prev,
                            [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, steps: newSteps } : b)
                          }));
                        }} className="w-full px-2 py-1 rounded border border-gray-300 text-xs mb-1" />
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {/* Social Proof */}
              {block.type === "social-proof" && (
                <div className="flex gap-4">
                  {block.proofs.map((proof, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <input value={proof.label} onChange={e => {
                        const newProofs = [...block.proofs];
                        newProofs[idx].label = e.target.value;
                        setPagesBlocks(prev => ({
                          ...prev,
                          [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, proofs: newProofs } : b)
                        }));
                      }} className="w-20 px-2 py-1 rounded border border-gray-300 text-xs font-bold mb-1 text-center" />
                      <input value={proof.description} onChange={e => {
                        const newProofs = [...block.proofs];
                        newProofs[idx].description = e.target.value;
                        setPagesBlocks(prev => ({
                          ...prev,
                          [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, proofs: newProofs } : b)
                        }));
                      }} className="w-32 px-2 py-1 rounded border border-gray-300 text-xs text-center" />
                    </div>
                  ))}
                </div>
              )}
              {/* CTA */}
              {block.type === "cta" && (
                <div className="flex flex-col items-center gap-2">
                  <input value={block.text} onChange={e => setPagesBlocks(prev => ({
                    ...prev,
                    [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, text: e.target.value } : b)
                  }))} className="w-full px-2 py-1 rounded border border-gray-300 text-base font-semibold mb-1 text-center" />
                  <input value={(block as CtaBlock).button.text} onChange={e => setPagesBlocks(prev => ({
                    ...prev,
                    [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, button: { ...(block as CtaBlock).button, text: e.target.value } } : b)
                  }))} className="w-48 px-2 py-1 rounded border border-gray-300 text-sm mb-1 text-center" placeholder="Texto do botão" />
                  <input value={(block as CtaBlock).button.link} onChange={e => setPagesBlocks(prev => ({
                    ...prev,
                    [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, button: { ...(block as CtaBlock).button, link: e.target.value } } : b)
                  }))} className="w-48 px-2 py-1 rounded border border-gray-300 text-sm text-center" placeholder="Link do botão" />
                </div>
              )}
              {/* FAQ */}
              {block.type === "faq" && (
                <div>
                  <div className="font-bold text-xs mb-1">Perguntas Frequentes</div>
                  {block.faqs.map((faq, idx) => (
                    <div key={idx} className="mb-2">
                      <input value={faq.question} onChange={e => {
                        const newFaqs = [...block.faqs];
                        newFaqs[idx].question = e.target.value;
                        setPagesBlocks(prev => ({
                          ...prev,
                          [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, faqs: newFaqs } : b)
                        }));
                      }} className="w-full px-2 py-1 rounded border border-gray-300 text-xs font-bold mb-1" placeholder="Pergunta" />
                      <textarea value={faq.answer} onChange={e => {
                        const newFaqs = [...block.faqs];
                        newFaqs[idx].answer = e.target.value;
                        setPagesBlocks(prev => ({
                          ...prev,
                          [currentPage]: prev[currentPage].map(b => b.id === block.id ? { ...b, faqs: newFaqs } : b)
                        }));
                      }} className="w-full px-2 py-1 rounded border border-gray-300 text-xs" rows={2} placeholder="Resposta" />
                    </div>
                  ))}
                </div>
              )}
              {/* Blocos antigos para compatibilidade */}
              {block.type === "text" && (
                <textarea
                  value={block.content}
                  onChange={e => updateBlock(block.id, e.target.value)}
                  className="w-full bg-transparent text-lg font-medium resize-none outline-none"
                  rows={2}
                />
              )}
              {block.type === "image" && (
                <div className="flex flex-col items-center gap-2">
                  <img src={block.content} alt="Imagem" className="max-w-xs rounded shadow" />
                  <input value={block.content} onChange={e => updateBlock(block.id, e.target.value)} className="w-full px-2 py-1 rounded border border-gray-300 text-sm" />
                </div>
              )}
              {block.type === "button" && (
                <input
                  value={block.content}
                  onChange={e => updateBlock(block.id, e.target.value)}
                  className="px-6 py-2 rounded bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-bold shadow hover:brightness-110 transition w-auto cursor-pointer"
                />
              )}
              {selected === block.id && (
                <button onClick={() => removeBlock(block.id)} className="absolute top-2 right-2 text-xs bg-red-100 text-red-700 rounded px-2 py-1 font-bold shadow hover:bg-red-200">Remover</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 