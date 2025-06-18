"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ConfiguracoesPage() {
  const [notificacoes, setNotificacoes] = useState({
    mensagens: true,
    matches: true,
    likes: true,
    sistema: true
  });

  const [privacidade, setPrivacidade] = useState({
    perfilPublico: true,
    mostrarOnline: true,
    mostrarDistancia: true
  });

  const handleToggle = (category: string, setting: string) => {
    if (category === 'notificacoes') {
      setNotificacoes(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof prev]
      }));
    } else if (category === 'privacidade') {
      setPrivacidade(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof prev]
      }));
    }
  };

  return (
    <main className="relative min-h-screen w-full font-sans">
      {/* Background image escurecida */}
      <div className="absolute inset-0 -z-10">
        <Image src="/main_impact.webp" alt="Fundo" fill className="object-cover w-full h-full" priority />
        {/* Overlay roxo escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#a259cbaa] to-[#6d2c91aa]" />
        {/* Overlay preto para escurecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6">
        <Link href="/home" className="text-white mr-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-extrabold text-white tracking-tight font-sans">Configurações</span>
        </div>
        <div className="w-8" />
      </header>

      {/* Conteúdo Principal */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Seção de Notificações */}
          <div className="bg-black/70 rounded-2xl p-6 mb-6">
            <h2 className="text-white text-xl font-bold mb-4">Notificações</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Mensagens</span>
                <button
                  onClick={() => handleToggle('notificacoes', 'mensagens')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificacoes.mensagens ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    notificacoes.mensagens ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Matches</span>
                <button
                  onClick={() => handleToggle('notificacoes', 'matches')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificacoes.matches ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    notificacoes.matches ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Likes</span>
                <button
                  onClick={() => handleToggle('notificacoes', 'likes')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificacoes.likes ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    notificacoes.likes ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Notificações do Sistema</span>
                <button
                  onClick={() => handleToggle('notificacoes', 'sistema')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificacoes.sistema ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    notificacoes.sistema ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Seção de Privacidade */}
          <div className="bg-black/70 rounded-2xl p-6 mb-6">
            <h2 className="text-white text-xl font-bold mb-4">Privacidade</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Perfil Público</span>
                <button
                  onClick={() => handleToggle('privacidade', 'perfilPublico')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacidade.perfilPublico ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    privacidade.perfilPublico ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Mostrar Status Online</span>
                <button
                  onClick={() => handleToggle('privacidade', 'mostrarOnline')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacidade.mostrarOnline ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    privacidade.mostrarOnline ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Mostrar Distância</span>
                <button
                  onClick={() => handleToggle('privacidade', 'mostrarDistancia')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacidade.mostrarDistancia ? 'bg-[#a259cb]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    privacidade.mostrarDistancia ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Seção de Conta */}
          <div className="bg-black/70 rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">Conta</h2>
            <div className="space-y-4">
              <Link
                href="/editar-perfil"
                className="flex items-center justify-between text-white py-2 hover:text-[#a259cb] transition-colors"
              >
                <span>Editar Perfil</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/alterar-senha"
                className="flex items-center justify-between text-white py-2 hover:text-[#a259cb] transition-colors"
              >
                <span>Alterar Senha</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                className="w-full text-red-500 py-2 hover:text-red-400 transition-colors"
                onClick={() => {
                  // Lógica para deslogar
                }}
              >
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 