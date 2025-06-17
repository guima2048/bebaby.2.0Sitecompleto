"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Código, 3: Nova Senha

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Aqui seria a lógica para enviar o código de recuperação
      setStep(2);
    } else if (step === 2) {
      // Aqui seria a lógica para verificar o código
      setStep(3);
    } else {
      // Aqui seria a lógica para atualizar a senha
      // Redirecionar para login após sucesso
    }
  };

  return (
    <main className="relative min-h-screen w-full font-sans">
      {/* Background image escurecida */}
      <div className="absolute inset-0 -z-10">
        <Image src="/main_impact.png" alt="Fundo" fill className="object-cover w-full h-full" priority />
        {/* Overlay roxo escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#a259cbaa] to-[#6d2c91aa]" />
        {/* Overlay preto para escurecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6">
        <Link href="/login" className="text-white mr-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-extrabold text-white tracking-tight font-sans">BeBaby</span>
        </div>
        <div className="w-8" /> {/* Espaçador para manter o título centralizado */}
      </header>

      {/* Conteúdo Principal */}
      <div className="flex flex-col items-center justify-center px-4 mt-10">
        <div className="w-full max-w-xs bg-black/70 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <h2 className="text-white text-xl font-bold text-center mb-2">
            {step === 1 && "Recuperar Senha"}
            {step === 2 && "Verificar Código"}
            {step === 3 && "Nova Senha"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 && (
              <>
                <p className="text-white/80 text-sm text-center mb-2">
                  Digite seu e-mail para receber um código de recuperação
                </p>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]"
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-white/80 text-sm text-center mb-2">
                  Digite o código enviado para seu e-mail
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-10 h-12 text-center rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]"
                      required
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                  onClick={() => setStep(1)}
                >
                  Reenviar código
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Nova senha"
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirmar nova senha"
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]"
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-[#a259cb] hover:bg-[#6d2c91] text-white rounded-md font-semibold text-base shadow-lg transition-colors"
            >
              {step === 1 && "Enviar código"}
              {step === 2 && "Verificar código"}
              {step === 3 && "Atualizar senha"}
            </button>
          </form>

          <Link
            href="/login"
            className="text-xs text-white/80 text-center underline hover:text-white/100 mt-2"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </main>
  );
} 