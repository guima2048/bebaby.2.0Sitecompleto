"use client";
import { useState } from "react";
import BackArrow from "../components/BackArrow";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
    setNome("");
    setEmail("");
    setMensagem("");
    setTimeout(() => setEnviado(false), 4000);
  }

  return (
    <main className="min-h-screen bg-[#18122B] text-white px-4 py-10 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <BackArrow className="mb-4" />
        <h1 className="text-3xl font-extrabold mb-4 text-center">Fale Conosco</h1>
        <p className="text-base text-gray-200 text-center mb-8">Tem dúvidas, sugestões ou quer compartilhar sua experiência? Preencha o formulário abaixo ou entre em contato pelos nossos canais. Nossa equipe está pronta para te ouvir!</p>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 bg-[#232042] p-6 rounded-2xl shadow-lg animate-fade-in">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#18122B] text-white placeholder-gray-400 border border-[#a259cb] focus:outline-none focus:ring-2 focus:ring-[#a259cb] text-lg"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#18122B] text-white placeholder-gray-400 border border-[#a259cb] focus:outline-none focus:ring-2 focus:ring-[#a259cb] text-lg"
            />
            <textarea
              placeholder="Mensagem"
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-[#18122B] text-white placeholder-gray-400 border border-[#a259cb] focus:outline-none focus:ring-2 focus:ring-[#a259cb] text-lg"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-bold shadow hover:brightness-110 transition text-lg mt-2"
            >
              Enviar mensagem
            </button>
            {enviado && (
              <div className="w-full text-center text-green-400 font-semibold mt-2 animate-fade-in">Mensagem enviada com sucesso!</div>
            )}
          </form>
          {/* Informações de contato */}
          <div className="flex-1 flex flex-col gap-6 items-center md:items-start mt-8 md:mt-0 animate-fade-in-slow">
            <div>
              <span className="block text-lg font-bold mb-1 text-[#a259cb]">E-mail</span>
              <a href="mailto:bebaby@bebaby.app" className="text-white underline">bebaby@bebaby.app</a>
            </div>
            <div>
              <span className="block text-lg font-bold mb-1 text-[#a259cb]">WhatsApp</span>
              <a href="https://wa.me/5511953323872" target="_blank" rel="noopener noreferrer" className="text-white underline">(11) 95332-3872</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 