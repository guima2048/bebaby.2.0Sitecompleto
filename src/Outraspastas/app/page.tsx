"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import SeoHead from "./components/SeoHead";
import FooterSite from "./components/FooterSite";

const HamburgerMenu = dynamic(() => import("./components/HamburgerMenu"), { ssr: false });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Simulação de login (ajuste conforme autenticação real)
  const isLoggedIn = false;

  return (
    <main className="w-full font-sans">
      <SeoHead
        title="BeBaby | Site de Relacionamento Seguro e Moderno para Conexões Autênticas"
        description="O BeBaby é o site de relacionamento para quem busca experiências únicas, privacidade e respeito. Encontre pessoas maduras e compatíveis. Cadastre-se grátis!"
      />
      {/* Banner no topo */}
      <section className="relative w-full h-[90vh] md:h-[400px] flex items-end justify-center bg-cover bg-center" style={{ backgroundImage: "url('/main_impact.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Botão do menu hamburguer no topo, só mobile */}
        <button
          className="absolute top-4 left-4 z-20 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 transition"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="white"/>
            <rect y="11" width="24" height="2" rx="1" fill="white"/>
            <rect y="17" width="24" height="2" rx="1" fill="white"/>
          </svg>
        </button>
        {/* Conteúdo do banner */}
        <div className="relative z-10 w-full max-w-xl text-left md:text-center px-4 animate-fade-in pb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-5 md:mb-4 leading-tight max-w-xs md:max-w-2xl mx-0 md:mx-auto">Encontre uma Sugar Baby ou um Sugar Daddy</h1>
          <div className="flex flex-col gap-3 items-start md:items-center w-full">
            <a href="/cadastro" className="w-3/5 md:w-1/4 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-bold shadow hover:scale-105 transition block mb-2 mx-0 md:mx-auto text-left md:text-center text-base md:text-lg">Cadastre-se grátis</a>
            <a href="/login" className="w-3/5 md:w-1/4 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/90 text-[#a259cb] font-bold shadow hover:bg-white transition block mx-0 md:mx-auto text-left md:text-center text-base md:text-lg">Entrar</a>
          </div>
        </div>
        {/* Menu hamburguer */}
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} isLoggedIn={isLoggedIn} />
      </section>
      {/* Texto institucional logo abaixo do banner */}
      <section className="w-full py-6 px-4 bg-white animate-fade-in-slow">
        <div className="w-full max-w-2xl mx-auto mb-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#a259cb] text-center">Encontre conexões autênticas e experiências únicas</h2>
          <p className="text-base md:text-lg text-gray-700 text-center">O site de relacionamento para quem busca privacidade, respeito e liberdade.</p>
        </div>
      </section>
      {/* Conteúdo institucional em fundo branco */}
      <section className="bg-white w-full py-10 px-4 animate-fade-in-slow">
        {/* Texto sobre sugar baby */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-bold mb-2 text-[#a259cb] text-center">Para quem busca novas experiências</h2>
          <p className="text-base text-gray-700 text-center">
            Descubra mulheres jovens, autênticas e decididas, prontas para viver novas histórias e compartilhar momentos especiais.
          </p>
        </div>
        {/* Cards de perfis femininos fictícios */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white animate-fade-in-card hover:scale-105 hover:shadow-2xl transition">
            <img src="/perfil-exemplo.png" alt="Perfil verificado" className="w-24 h-24 rounded-full object-cover mb-2" />
            <span className="font-bold text-lg">Secretária, 23</span>
            <span className="text-sm text-gray-500">São Paulo</span>
            <span className="text-xs text-green-600 font-semibold mt-1">Perfil verificado</span>
          </div>
          <div className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white animate-fade-in-card hover:scale-105 hover:shadow-2xl transition">
            <img src="/exemplo12.jpg" alt="Perfil verificado" className="w-24 h-24 rounded-full object-cover mb-2" />
            <span className="font-bold text-lg">Universitária, 20</span>
            <span className="text-sm text-gray-500">Belo Horizonte</span>
            <span className="text-xs text-green-600 font-semibold mt-1">Perfil verificado</span>
          </div>
          <div className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white animate-fade-in-card hover:scale-105 hover:shadow-2xl transition">
            <img src="/exemplo13.jpg" alt="Perfil verificado" className="w-24 h-24 rounded-full object-cover mb-2" />
            <span className="font-bold text-lg">Estudante, 25</span>
            <span className="text-sm text-gray-500">Florianópolis</span>
            <span className="text-xs text-green-600 font-semibold mt-1">Perfil verificado</span>
          </div>
        </div>
        {/* Texto sobre sugar daddys */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-bold mb-2 text-[#a259cb] text-center">Para quem valoriza companhia e bons momentos</h2>
          <p className="text-base text-gray-700 text-center">
            Conheça homens maduros, bem-sucedidos e generosos, prontos para compartilhar experiências e valorizar sua companhia.
          </p>
        </div>
        {/* Cards de perfis masculinos fictícios */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white animate-fade-in-card hover:scale-105 hover:shadow-2xl transition">
            <img src="/exemplo14.jpg" alt="Perfil verificado" className="w-24 h-24 rounded-full object-cover mb-2" />
            <span className="font-bold text-lg">Executivo, 42</span>
            <span className="text-sm text-gray-500">Curitiba</span>
            <span className="text-xs text-green-600 font-semibold mt-1">Perfil verificado</span>
          </div>
          <div className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white animate-fade-in-card hover:scale-105 hover:shadow-2xl transition">
            <img src="/exemplo11.jpg" alt="Perfil verificado" className="w-24 h-24 rounded-full object-cover mb-2" />
            <span className="font-bold text-lg">Médico, 50</span>
            <span className="text-sm text-gray-500">Rio de Janeiro</span>
            <span className="text-xs text-green-600 font-semibold mt-1">Perfil verificado</span>
          </div>
          <div className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white animate-fade-in-card hover:scale-105 hover:shadow-2xl transition">
            <img src="/exemplo41.png" alt="Perfil verificado" className="w-24 h-24 rounded-full object-cover mb-2" />
            <span className="font-bold text-lg">Empresário, 47</span>
            <span className="text-sm text-gray-500">Goiânia</span>
            <span className="text-xs text-green-600 font-semibold mt-1">Perfil verificado</span>
          </div>
        </div>
        {/* Seções institucionais, como funciona, provas sociais, FAQ, etc. */}
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-10">
          {/* Conheça os Perfis */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white/5 rounded-xl p-4">
              <h2 className="text-lg font-bold mb-2 text-[#a259cb]">Para quem busca novas experiências</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Descubra pessoas interessantes e compatíveis</li>
                <li>Ambiente seguro e privativo</li>
                <li>Perfis verificados e moderados</li>
                <li>Conexões sem julgamentos</li>
              </ul>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-4">
              <h2 className="text-lg font-bold mb-2 text-[#a259cb]">Para quem valoriza companhia e bons momentos</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Encontre pessoas que valorizam sua presença</li>
                <li>Relacionamentos transparentes e respeitosos</li>
                <li>Liberdade para ser você mesmo</li>
                <li>Comunidade ativa e diversa</li>
              </ul>
            </div>
          </div>
          {/* Como funciona */}
          <div>
            <h2 className="text-xl font-bold mb-2">Como funciona?</h2>
            <div className="flex flex-col gap-2 text-gray-700">
              <div><span className="font-bold text-[#a259cb]">1.</span> Crie sua conta grátis</div>
              <div><span className="font-bold text-[#a259cb]">2.</span> Monte seu perfil e conte sua história</div>
              <div><span className="font-bold text-[#a259cb]">3.</span> Descubra e conecte-se com pessoas compatíveis</div>
              <div><span className="font-bold text-[#a259cb]">4.</span> Viva novas experiências com segurança e privacidade</div>
            </div>
          </div>
          {/* Provas Sociais e Segurança */}
          <div className="flex flex-col md:flex-row gap-6 text-center">
            <div className="flex-1">
              <span className="text-2xl font-extrabold text-[#a259cb]">+10 mil</span>
              <div className="text-gray-700">usuários satisfeitos</div>
            </div>
            <div className="flex-1">
              <span className="text-2xl font-extrabold text-[#a259cb]">100%</span>
              <div className="text-gray-700">Privacidade e segurança</div>
            </div>
            <div className="flex-1">
              <span className="text-2xl font-extrabold text-[#a259cb]">Perfis</span>
              <div className="text-gray-700">verificados e moderados</div>
            </div>
          </div>
          {/* Chamada para ação */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-semibold text-[#18122B]">Pronto para viver algo novo?</span>
            <a href="/cadastro" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-bold shadow hover:brightness-110 transition">Cadastre-se grátis</a>
          </div>
          {/* FAQ SEO otimizado */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#a259cb]">O que é o BeBaby?</h3>
                <p className="text-gray-700">O BeBaby é um site de relacionamento moderno, seguro e privativo, feito para quem busca conexões autênticas e experiências únicas.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#a259cb]">Como faço para me cadastrar?</h3>
                <p className="text-gray-700">Basta clicar em "Cadastre-se grátis", preencher seu perfil e começar a explorar novas conexões.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#a259cb]">O BeBaby é seguro?</h3>
                <p className="text-gray-700">Sim! Todos os perfis são verificados e moderados. Sua privacidade e segurança são prioridades.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#a259cb]">Preciso pagar para usar?</h3>
                <p className="text-gray-700">O cadastro é gratuito e você pode começar a usar a plataforma sem custos. Recursos premium podem ser oferecidos futuramente.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#a259cb]">Como proteger meus dados?</h3>
                <p className="text-gray-700">O BeBaby segue as melhores práticas de privacidade e proteção de dados. Saiba mais em nossa <a href="/privacidade" className="underline">Política de Privacidade</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSite />
    </main>
  );
} 