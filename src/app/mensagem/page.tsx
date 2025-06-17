"use client";
import Image from "next/image";

const conversas = [
  {
    id: 1,
    nome: "Angelina Lutteford",
    status: "Online! Envie usando o Be baby",
    avatar: "/public/Usuário_1.png"
  },
  {
    id: 2,
    nome: "Angelina Lutteford",
    status: "Online! Envie usando o Be baby",
    avatar: "/public/Usuário_1.png"
  }
];

export default function CaixaDeMensagens() {
  return (
    <main className="min-h-screen bg-white w-full font-sans">
      {/* Header mobile first */}
      <header className="w-full flex items-center justify-between bg-black h-12 px-3">
        <button className="text-white" aria-label="Menu">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="currentColor"/>
            <rect y="11" width="24" height="2" rx="1" fill="currentColor"/>
            <rect y="17" width="24" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>
        <div className="flex-1 flex justify-end items-center gap-2">
          <span className="text-xs text-white/80 hidden sm:inline">Iniciar sessão</span>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-white"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/></svg>
        </div>
      </header>
      {/* Lista de conversas */}
      <section className="flex flex-col gap-3 px-2 pt-4">
        {conversas.map((c) => (
          <div key={c.id} className="flex items-center bg-gradient-to-r from-[#a259cb] to-[#6d2c91] rounded-xl px-3 py-2 shadow-sm">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mr-3 flex-shrink-0">
              <Image src={c.avatar} alt={c.nome} width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-base truncate">{c.nome}</div>
              <div className="text-white/80 text-xs truncate">{c.status}</div>
            </div>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white ml-2">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </section>
    </main>
  );
} 