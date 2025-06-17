"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import dynamic from "next/dynamic";

const HamburgerMenu = dynamic(() => import("../components/HamburgerMenu"), { ssr: false });

const planos = [
  {
    nome: "30 dias",
    preco: "R$ 149,99",
    descricao: "Acesso completo por 30 dias. Ideal para quem quer experimentar todos os recursos premium.",
    beneficios: [
      "Mensagens ilimitadas",
      "Destaque nas buscas",
      "Suporte prioritário"
    ],
    destaque: false,
    cta: "Assinar 30 dias"
  },
  {
    nome: "365 dias",
    preco: "R$ 189,99",
    descricao: "Economize e aproveite todos os benefícios premium durante 1 ano inteiro.",
    beneficios: [
      "Mensagens ilimitadas",
      "Destaque nas buscas",
      "Suporte prioritário",
      "Economia anual"
    ],
    destaque: false,
    cta: "Assinar 365 dias"
  },
  {
    nome: "VIP",
    preco: "R$ 299,99",
    descricao: "Tenha acesso VIP: benefícios exclusivos, prioridade máxima e experiências diferenciadas.",
    beneficios: [
      "Todos os benefícios do plano anual",
      "Selo VIP no perfil",
      "Convites para eventos exclusivos",
      "Atendimento personalizado"
    ],
    destaque: true,
    cta: "Quero ser VIP"
  }
];

export default function UpgradePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="min-h-screen w-full font-sans bg-gradient-to-b from-[#a259cb0d] to-[#fff]">
      {/* Header Mobile */}
      <header className="md:hidden flex items-center justify-between px-4 pt-6">
        <button 
          className="text-[#a259cb] p-2" 
          onClick={() => setMenuOpen(true)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="currentColor"/>
            <rect y="11" width="24" height="2" rx="1" fill="currentColor"/>
            <rect y="17" width="24" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>
        <span className="text-2xl font-extrabold text-[#a259cb]">BeBaby</span>
        <div className="w-10" /> {/* Espaçador para centralizar o título */}
      </header>

      {/* Header Desktop */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Menu Hamburguer */}
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} isLoggedIn={false} />

      {/* Conteúdo central */}
      <section className="px-4 py-8 md:py-12">
        {/* Título e descrição */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 text-[#a259cb]">
            Faça upgrade e aproveite tudo!
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Desbloqueie todos os recursos premium, aumente suas chances de match e tenha uma experiência exclusiva.
          </p>
        </div>

        {/* Cards dos planos */}
        <div className="max-w-md mx-auto md:max-w-4xl">
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
            {planos.map((plano) => (
              <div 
                key={plano.nome}
                className={`relative ${
                  plano.destaque ? 'md:scale-105 md:z-10' : ''
                }`}
              >
                <Card
                  title={plano.nome}
                  description={plano.descricao}
                  price={plano.preco}
                  features={plano.beneficios}
                  className={`
                    h-full flex flex-col
                    ${plano.destaque 
                      ? 'border-2 border-[#a259cb] shadow-lg bg-white/90' 
                      : 'bg-white/80'
                    }
                  `}
                >
                  <div className="flex-1" /> {/* Espaçador para empurrar o botão para baixo */}
                  <button
                    className={`
                      w-full py-3 mt-4 rounded-lg font-semibold text-sm md:text-base transition
                      ${plano.destaque
                        ? 'bg-[#a259cb] text-white hover:bg-[#8d3bbd] shadow-lg'
                        : 'bg-gray-100 text-[#a259cb] hover:bg-gray-200'
                      }
                    `}
                    onClick={() => alert(`Pagamento do plano: ${plano.nome}`)}
                  >
                    {plano.cta}
                  </button>
                  {plano.destaque && (
                    <span className="absolute -top-2 -right-2 bg-[#a259cb] text-white text-xs px-3 py-1 rounded-full shadow">
                      VIP
                    </span>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Texto de segurança */}
        <p className="text-xs text-gray-400 mt-8 text-center">
          Pagamento 100% seguro. Cancelamento fácil a qualquer momento.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
} 