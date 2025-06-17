"use client";
import { useState } from "react";
import Image from "next/image";

export default function Sucesso() {
  // Simulação do e-mail do usuário
  const [email] = useState("exemplo@dominio.com");

  return (
    <main className="relative min-h-screen w-full font-sans flex flex-col items-center justify-center">
      {/* Background escurecido igual landing */}
      <div className="absolute inset-0 -z-10">
        <Image src="/main_impact.png" alt="Fundo" fill className="object-cover w-full h-full" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#a259cbaa] to-[#6d2c91aa]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>
      {/* Header igual landing */}
      <header className="w-full flex justify-center pt-8 pb-2">
        <Image src="/logo-bebaby.png" alt="BeBaby" width={120} height={40} className="mx-auto" />
      </header>
      {/* Card de sucesso */}
      <div className="w-full max-w-md bg-black/80 rounded-xl shadow-lg mt-10 px-6 py-8 flex flex-col items-center border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-4">Cadastro realizado com sucesso!</h1>
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-2 text-green-400 text-base font-medium">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9.5 17 4 11.5"/></svg>
            <span>Seu cadastro foi concluído.</span>
          </div>
          <div className="flex items-center gap-2 text-white text-base mt-2">
            <svg width="22" height="22" fill="none" stroke="#22d3ee" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/><path d="M22 7l-10 7L2 7"/></svg>
            <span>Confirme seu e-mail para ativar sua conta.</span>
          </div>
          <div className="text-sm text-gray-300 mt-2 text-center">
            Enviamos um e-mail para <span className="font-semibold text-white">{email}</span>.<br/>
            Verifique sua caixa de entrada e também o spam/lixo eletrônico.<br/>
            Se estiver no spam, marque como &quot;Não é spam&quot;.
          </div>
        </div>
      </div>
      {/* Rodapé igual landing, fora do card */}
      <div className="w-full flex justify-center mt-8 mb-4">
        <span className="text-xs text-white/90">Ler termos de <a href="#" className="underline">Privacidade</a></span>
      </div>
    </main>
  );
} 