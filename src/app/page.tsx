"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SeoHead from "./components/SeoHead";
import FooterSite from "./components/FooterSite";
import { FaUser, FaSignInAlt, FaRegCheckCircle } from "react-icons/fa";

const HamburgerMenu = dynamic(() => import("./components/HamburgerMenu"), { ssr: false });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado do formulário
  const [form, setForm] = useState({ name: '', age: '', profile: '', testimonial: '' });
  const [errors, setErrors] = useState({ name: '', age: '', profile: '', testimonial: '' });
  const [success, setSuccess] = useState(false);
  // Simulação de autenticação real
  useEffect(() => {
    // Aqui você pode integrar com seu sistema real de autenticação
    // Exemplo: setIsLoggedIn(!!user)
  }, []);

  // Efeito para mostrar/esconder botão "Voltar ao topo"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function validateForm() {
    let valid = true;
    let newErrors = { name: '', age: '', profile: '', testimonial: '' };
    if (!form.name.trim()) {
      newErrors.name = 'Nome obrigatório';
      valid = false;
    }
    if (!form.age.trim() || isNaN(Number(form.age)) || Number(form.age) < 18 || Number(form.age) > 99) {
      newErrors.age = 'Idade entre 18 e 99';
      valid = false;
    }
    if (!form.profile) {
      newErrors.profile = 'Selecione seu perfil';
      valid = false;
    }
    if (!form.testimonial.trim() || form.testimonial.length < 20) {
      newErrors.testimonial = 'Depoimento muito curto';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    if (validateForm()) {
      // Aqui você pode enviar para a API
      setSuccess(true);
      setForm({ name: '', age: '', profile: '', testimonial: '' });
    }
  }

  return (
    <main className="w-full font-sans" lang="pt-BR">
      <SeoHead
        title="BeBaby | Site de Relacionamento Seguro e Moderno para Conexões Autênticas"
        description="O BeBaby é o site de relacionamento para quem busca experiências únicas, privacidade e respeito. Encontre pessoas maduras e compatíveis. Cadastre-se grátis!"
        ogImage="/og-image.jpg"
        ogTitle="BeBaby - Conexões Autênticas e Experiências Únicas"
        ogDescription="Encontre pessoas maduras e compatíveis em um ambiente seguro e privativo."
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
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <rect y="5" width="24" height="2" rx="1" fill="white"/>
            <rect y="11" width="24" height="2" rx="1" fill="white"/>
            <rect y="17" width="24" height="2" rx="1" fill="white"/>
          </svg>
        </button>
        {/* Conteúdo do banner */}
        <div className="relative z-10 w-full max-w-xl text-left md:text-center px-4 animate-fade-in pb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 leading-tight max-w-xl mx-0 md:mx-auto text-white">
            O melhor site de Sugar Daddy, Sugar Baby e Sugar Mommy
          </h1>
          <p className="text-base md:text-lg text-white font-medium mb-6 max-w-xl mx-0 md:mx-auto">
            Relacionamento sugar, patrocínio e experiências únicas. Cadastre-se grátis e faça parte do universo sugar!
          </p>
          <div className="flex gap-3 items-center md:justify-center w-full">
            <a href="/cadastro" className="w-1/2 md:w-auto md:min-w-[180px] px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-bold shadow hover:scale-105 transition block text-center text-base md:text-lg" aria-label="Cadastre-se gratuitamente">Cadastre-se grátis</a>
            <a href="/login" className="w-1/2 md:w-auto md:min-w-[180px] px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/90 text-[#a259cb] font-bold shadow hover:bg-white transition block text-center text-base md:text-lg" aria-label="Acessar sua conta">Entrar</a>
          </div>
        </div>
        {/* Menu hamburguer */}
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} isLoggedIn={isLoggedIn} />
      </section>
      {/* Texto institucional logo abaixo do banner */}
      <section className="w-full py-6 px-4 bg-white animate-fade-in-slow">
        <div className="w-full max-w-2xl mx-auto mb-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#a259cb] text-center">Cadastre-se grátis no site de sugar daddy, sugar baby e sugar mommy mais confiável do Brasil</h2>
          <p className="text-base md:text-lg text-gray-700 text-center">Encontre sugar daddies, sugar babies, sugar mommies, velhos ricos e patrocinadores para viver experiências únicas e seguras. Relacionamento sugar, app de sugar e universo sugar em um só lugar!</p>
        </div>
      </section>
      {/* SEÇÃO DE PERFIS DE USUÁRIOS - LAYOUT LATERAL ELEGANTE */}
      <section className="w-full py-8 px-2 sm:px-4 bg-white animate-fade-in-slow">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#a259cb] text-center">Conheça quem faz parte do universo sugar</h2>
        {/* Sugar Babies */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-4xl mx-auto mb-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src="/exemplo12.jpg" alt="Sugar Baby" className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#a259cb] shadow-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#a259cb] mb-2">Sugar Babies</h3>
            <p className="text-base md:text-lg text-gray-700 mb-2">Sugar babies são jovens autênticas que buscam experiências, patrocínio e liberdade em relacionamentos sugar com sugar daddies e sugar mommies.</p>
            <p className="text-sm text-gray-500">Encontre sugar babies confiáveis, com perfis verificados e prontos para novas histórias.</p>
            <a href="/cadastro" className="mt-4 inline-block px-6 py-2 rounded-full bg-[#a259cb] text-white font-semibold hover:bg-[#6d2c91] transition-colors text-sm">Cadastre-se como Sugar Baby</a>
          </div>
        </div>
        {/* Sugar Daddys */}
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6 md:gap-12 max-w-4xl mx-auto mb-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img src="/exemplo14.jpg" alt="Sugar Daddy" className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#6d2c91] shadow-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#6d2c91] mb-2">Sugar Daddys</h3>
            <p className="text-base md:text-lg text-gray-700 mb-2">Sugar daddys são homens maduros, generosos e bem-sucedidos que desejam patrocinar sonhos e viver novas histórias no universo sugar.</p>
            <p className="text-sm text-gray-500">Perfis de sugar daddies verificados, buscando conexões autênticas e seguras.</p>
            <a href="/cadastro" className="mt-4 inline-block px-6 py-2 rounded-full bg-[#6d2c91] text-white font-semibold hover:bg-[#4a1d65] transition-colors text-sm">Cadastre-se como Sugar Daddy</a>
          </div>
        </div>
        {/* Sugar Mommy */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-4xl mx-auto mb-4">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src="/exemplo8.png" alt="Sugar Mommy" className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#a259cb] shadow-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#a259cb] mb-2">Sugar Mommy</h3>
            <p className="text-base md:text-lg text-gray-700 mb-2">Sugar mommies são mulheres independentes e generosas que apoiam sugar babies e buscam compartilhar experiências únicas em relacionamentos sugar.</p>
            <p className="text-sm text-gray-500">Descubra sugar mommies confiáveis, prontas para novas conexões e experiências.</p>
            <a href="/cadastro" className="mt-4 inline-block px-6 py-2 rounded-full bg-[#a259cb] text-white font-semibold hover:bg-[#6d2c91] transition-colors text-sm">Cadastre-se como Sugar Mommy</a>
          </div>
        </div>
      </section>
      {/* NOVA SEÇÃO: DEPOIMENTOS REAIS */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-gray-50 animate-fade-in-slow">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#a259cb] text-center">Histórias de Sucesso no Meu Universo Sugar de Patrocínio</h2>
        <div className="max-w-6xl mx-auto">
          {/* Grid de Depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Depoimento 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img src="/exemplo12.jpg" alt="Maria" className="w-16 h-16 rounded-full object-cover border-2 border-[#a259cb]" />
                <div>
                  <h4 className="font-bold text-gray-800">Maria, 25</h4>
                  <p className="text-sm text-[#a259cb]">Sugar Baby</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"O Bebaby.app mudou minha vida. Encontrei um sugar daddy incrível que me ajudou a realizar meus sonhos e viver experiências únicas."</p>
            </div>
            {/* Depoimento 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img src="/exemplo14.jpg" alt="João" className="w-16 h-16 rounded-full object-cover border-2 border-[#6d2c91]" />
                <div>
                  <h4 className="font-bold text-gray-800">João, 45</h4>
                  <p className="text-sm text-[#6d2c91]">Sugar Daddy</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Como sugar daddy, encontrei no Bebaby.app uma plataforma segura e discreta para conhecer pessoas interessantes e compartilhar experiências."</p>
            </div>
            {/* Depoimento 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img src="/exemplo8.png" alt="Ana" className="w-16 h-16 rounded-full object-cover border-2 border-[#a259cb]" />
                <div>
                  <h4 className="font-bold text-gray-800">Ana, 38</h4>
                  <p className="text-sm text-[#a259cb]">Sugar Mommy</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Ser sugar mommy no Bebaby.app me permitiu conhecer pessoas incríveis e viver momentos especiais em um ambiente seguro e respeitoso."</p>
            </div>
          </div>

          {/* Formulário de Depoimento */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#a259cb] mb-6 text-center">Compartilhe Sua História</h3>
            {success && (
              <div className="flex items-center justify-center gap-2 mb-4 text-green-600 bg-green-50 border border-green-200 rounded p-2 animate-fade-in">
                <FaRegCheckCircle />
                <span>Depoimento enviado com sucesso! Obrigado por compartilhar sua experiência.</span>
              </div>
            )}
            {isLoggedIn ? (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-[#a259cb] focus:border-transparent`}
                      placeholder="Seu nome"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.age ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-[#a259cb] focus:border-transparent`}
                      placeholder="Sua idade"
                    />
                    {errors.age && <span className="text-xs text-red-500 mt-1 block">{errors.age}</span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">Seu Perfil</label>
                  <select
                    id="profile"
                    name="profile"
                    value={form.profile}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.profile ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-[#a259cb] focus:border-transparent`}
                  >
                    <option value="">Selecione seu perfil</option>
                    <option value="sugar_baby">Sugar Baby</option>
                    <option value="sugar_daddy">Sugar Daddy</option>
                    <option value="sugar_mommy">Sugar Mommy</option>
                  </select>
                  {errors.profile && <span className="text-xs text-red-500 mt-1 block">{errors.profile}</span>}
                </div>
                <div>
                  <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1">Seu Depoimento</label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    rows={4}
                    value={form.testimonial}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.testimonial ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-[#a259cb] focus:border-transparent`}
                    placeholder="Compartilhe sua experiência no Bebaby.app..."
                  ></textarea>
                  {errors.testimonial && <span className="text-xs text-red-500 mt-1 block">{errors.testimonial}</span>}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Enviar Depoimento
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-600">Para compartilhar sua história, faça login ou cadastre-se gratuitamente.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/login" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#a259cb] text-white font-semibold hover:bg-[#6d2c91] transition-colors text-base shadow">
                    <FaSignInAlt /> Fazer Login
                  </a>
                  <a href="/cadastro" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#a259cb] text-[#a259cb] font-semibold hover:bg-[#a259cb] hover:text-white transition-colors text-base shadow">
                    <FaUser /> Cadastre-se Grátis
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* NOVA SEÇÃO: CONTEÚDO EXPANDIDO */}
      <section className="w-full py-12 px-4 bg-white animate-fade-in-slow">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#a259cb] text-center">O Universo Sugar no Bebaby.app</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#a259cb] mb-4">Relacionamentos Sugar</h3>
              <p className="text-gray-700 mb-4">No Bebaby.app, relacionamentos sugar são baseados em respeito, transparência e benefícios mútuos. Nossa plataforma conecta sugar babies, sugar daddies e sugar mommies em um ambiente seguro e discreto.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Perfis verificados e moderados</li>
                <li>Chat seguro e privado</li>
                <li>Filtros avançados de busca</li>
                <li>Suporte 24/7</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#a259cb] mb-4">Benefícios Exclusivos</h3>
              <p className="text-gray-700 mb-4">Nossa plataforma oferece benefícios exclusivos para todos os perfis do universo sugar, garantindo uma experiência única e segura para todos os membros.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Verificação de identidade</li>
                <li>Proteção de privacidade</li>
                <li>Eventos exclusivos</li>
                <li>Comunidade ativa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* CTA FLUTUANTE */}
      <div className="fixed bottom-4 right-4 z-50 animate-bounce">
        <a href="/cadastro" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-bold shadow-lg hover:shadow-xl transition-all">
          <span>Cadastre-se Grátis</span>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
      {/* BENEFÍCIOS EM LISTA */}
      <section className="w-full py-8 px-4 bg-white animate-fade-in-slow">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#a259cb] text-center">Benefícios do Bebaby.app</h2>
        <ul className="list-disc list-inside text-gray-700 max-w-2xl mx-auto space-y-2">
          <li>Site de sugar grátis e confiável</li>
          <li>App de sugar para celular</li>
          <li>Relacionamento sugar seguro e discreto</li>
          <li>Perfis verificados e moderados</li>
          <li>Oportunidade de patrocínio e novas experiências</li>
          <li>Comunidade ativa e diversa</li>
          <li>Site de sugar baby confiável e grátis</li>
        </ul>
      </section>
      {/* COMO FUNCIONA - Passos */}
      <section className="w-full py-8 px-4 bg-white animate-fade-in-slow">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#a259cb] text-center">Como funciona?</h2>
        <ol className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto list-decimal md:list-none">
          <li className="flex-1 bg-white/5 rounded-xl p-6 text-center shadow">
            <span className="block text-3xl mb-2">1️⃣</span>
            <span className="font-bold">Cadastre-se grátis</span>
          </li>
          <li className="flex-1 bg-white/5 rounded-xl p-6 text-center shadow">
            <span className="block text-3xl mb-2">2️⃣</span>
            <span className="font-bold">Monte seu perfil</span>
          </li>
          <li className="flex-1 bg-white/5 rounded-xl p-6 text-center shadow">
            <span className="block text-3xl mb-2">3️⃣</span>
            <span className="font-bold">Encontre sugar daddies, sugar babies e sugar mommies</span>
          </li>
          <li className="flex-1 bg-white/5 rounded-xl p-6 text-center shadow">
            <span className="block text-3xl mb-2">4️⃣</span>
            <span className="font-bold">Viva o universo sugar com segurança</span>
          </li>
        </ol>
      </section>
      {/* PROVAS SOCIAIS */}
      <section className="w-full py-8 px-4 bg-white animate-fade-in-slow">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="flex-1 text-center">
            <span className="text-2xl font-extrabold text-[#a259cb]">+10 mil</span>
            <div className="text-gray-700">usuários satisfeitos</div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-2xl font-extrabold text-[#a259cb]">100%</span>
            <div className="text-gray-700">Privacidade e segurança</div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-2xl font-extrabold text-[#a259cb]">Perfis</span>
            <div className="text-gray-700">verificados e moderados</div>
          </div>
        </div>
      </section>
      {/* FAQ EM ACCORDION */}
      <section className="w-full py-8 px-4 bg-white animate-fade-in-slow">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#a259cb] text-center">Perguntas Frequentes</h2>
        <div className="max-w-2xl mx-auto">
          {/* Accordion simples com detalhes/summary para acessibilidade */}
          <details className="mb-4 bg-white rounded shadow p-4">
            <summary className="font-semibold text-[#a259cb] cursor-pointer">O que é um relacionamento sugar?</summary>
            <p className="text-gray-700 mt-2">Relacionamento sugar é uma relação transparente e consensual entre sugar daddies, sugar babies e sugar mommies, baseada em benefícios, experiências e patrocínio.</p>
          </details>
          <details className="mb-4 bg-white rounded shadow p-4">
            <summary className="font-semibold text-[#a259cb] cursor-pointer">Como funciona o site de sugar daddy para ganhar dinheiro?</summary>
            <p className="text-gray-700 mt-2">No Bebaby.app, sugar babies podem encontrar sugar daddies e sugar mommies dispostos a oferecer patrocínio, presentes e experiências únicas. O cadastro é grátis e seguro.</p>
          </details>
          <details className="mb-4 bg-white rounded shadow p-4">
            <summary className="font-semibold text-[#a259cb] cursor-pointer">O site é confiável e grátis para sugar babies?</summary>
            <p className="text-gray-700 mt-2">Sim! O Bebaby.app é o site de sugar baby confiável e grátis, com perfis verificados, moderação ativa e privacidade garantida.</p>
          </details>
          <details className="mb-4 bg-white rounded shadow p-4">
            <summary className="font-semibold text-[#a259cb] cursor-pointer">Existe app de sugar para celular?</summary>
            <p className="text-gray-700 mt-2">Sim! Você pode acessar o Bebaby.app pelo navegador do seu celular ou instalar como app de sugar para ter acesso rápido e seguro ao universo sugar.</p>
          </details>
          <details className="mb-4 bg-white rounded shadow p-4">
            <summary className="font-semibold text-[#a259cb] cursor-pointer">O que é uma sugar mommy?</summary>
            <p className="text-gray-700 mt-2">Sugar mommy é uma mulher madura, bem-sucedida e generosa que busca sugar babies para compartilhar experiências, patrocínio e relacionamento sugar.</p>
          </details>
        </div>
      </section>
      {/* Botão Voltar ao Topo */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-50 p-3 rounded-full bg-[#a259cb] text-white shadow-lg hover:bg-[#6d2c91] transition-all duration-300"
          aria-label="Voltar ao topo da página"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke="currentColor" strokeWidth="2" d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
      {/* Banner de Cookies */}
      {cookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 md:bottom-4 md:left-4 md:right-4 md:rounded-lg md:shadow-lg">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
              <a href="/privacidade" className="text-[#a259cb] underline">Política de Privacidade</a>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCookieConsent(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Recusar
              </button>
              <button
                onClick={() => setCookieConsent(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#a259cb] rounded-full hover:bg-[#6d2c91]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
      <FooterSite />
    </main>
  );
} 