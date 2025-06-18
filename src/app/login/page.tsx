import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full font-sans">
      {/* Background image escurecida */}
      <div className="absolute inset-0 -z-10">
        <Image src="/main_impact.webp" alt="Fundo" fill className="object-cover w-full h-full" priority />
        {/* Overlay preto para escurecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6">
        <button className="text-white mr-2" aria-label="Menu">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect y="5" width="24" height="2" rx="1" fill="currentColor"/><rect y="11" width="24" height="2" rx="1" fill="currentColor"/><rect y="17" width="24" height="2" rx="1" fill="currentColor"/></svg>
        </button>
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-extrabold text-white tracking-tight font-sans">BeBaby</span>
        </div>
        <button className="text-white ml-2" aria-label="Usuário">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
      </header>
      {/* Caixa de Login */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-xs bg-black/70 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 mt-20">
          <h2 className="text-white text-xl font-bold text-center mb-2">Entrar na sua conta</h2>
          <form className="flex flex-col gap-4">
            <input type="email" placeholder="E-mail" className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]" />
            <input type="password" placeholder="Senha" className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]" />
            <button type="submit" className="w-full py-3 mt-2 bg-[#a259cb] hover:bg-[#6d2c91] text-white rounded-md font-semibold text-base shadow-lg transition-colors">Entrar</button>
          </form>
          <Link href="/" className="text-xs text-white/80 text-center underline hover:text-white/100 mt-2">Voltar para a Home</Link>
        </div>
      </div>
    </main>
  );
} 