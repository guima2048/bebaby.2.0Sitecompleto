import { useEffect, useRef } from "react";
import Image from "next/image";

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
}

export default function HamburgerMenu({ open, onClose, isLoggedIn = false }: HamburgerMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black/60 transition-opacity" aria-hidden="true" />
      {/* Menu lateral */}
      <aside
        ref={ref}
        className="relative bg-black w-full max-w-sm h-full shadow-2xl transition-transform duration-200 ease-in-out
          md:max-w-xs
          sm:w-[75vw] sm:max-w-[75vw] sm:h-full
          flex flex-col"
        style={{ minWidth: 260 }}
      >
        {/* Topo com logo, usuário e botão X */}
        <div className="flex flex-col gap-2 px-5 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-white tracking-tight font-sans">BeBaby</span>
            <button onClick={onClose} aria-label="Fechar menu" className="text-white p-1 ml-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          {/* Usuário */}
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D72638]">
              <Image src="/perfil-exemplo.png" alt="Foto do usuário" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">Rias Gremory</span>
              <span className="text-xs font-semibold" style={{ color: '#D72638' }}>Online • Premium</span>
            </div>
          </div>
        </div>
        {/* Itens do menu */}
        <nav className="flex-1 flex flex-col gap-2 px-5 py-6">
          {/* Ações rápidas */}
          <div className="mb-4">
            <span className="uppercase text-xs text-white/60 font-bold tracking-widest mb-2 block">Ações rápidas</span>
            <a href="/perfil/editar" className="flex items-center gap-3 text-white text-base py-3 hover:bg-[#D72638]/20 rounded-lg transition">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M16.862 5.487a2.06 2.06 0 0 1 2.915 2.914l-9.193 9.193-3.06.34.34-3.06 9.193-9.193Z" stroke="#D72638" strokeWidth="2"/><path d="M15 7 17 9" stroke="#D72638" strokeWidth="2" strokeLinecap="round"/></svg>
              Editar perfil
            </a>
            <a href="/perfil/fotos" className="flex items-center gap-3 text-white text-base py-3 hover:bg-[#D72638]/20 rounded-lg transition">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#D72638" strokeWidth="2"/><circle cx="8.5" cy="12.5" r="2.5" stroke="#D72638" strokeWidth="2"/><path d="M21 15.5 17.5 12l-4.5 4.5" stroke="#D72638" strokeWidth="2" strokeLinecap="round"/></svg>
              Alterar foto de perfil/banner
            </a>
            <a href="/configuracoes" className="flex items-center gap-3 text-white text-base py-3 hover:bg-[#D72638]/20 rounded-lg transition">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="#D72638" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15.4 9c.26.26.6.4.96.4.36 0 .7-.14.96-.4l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15Z" stroke="#D72638" strokeWidth="2"/></svg>
              Configurações de conta
            </a>
            <a href="/ajuda" className="flex items-center gap-3 text-white text-base py-3 hover:bg-[#D72638]/20 rounded-lg transition">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#D72638" strokeWidth="2"/><path d="M12 16v-2m0-6a2 2 0 0 1 2 2c0 1-1 2-2 2s-2 1-2 2" stroke="#D72638" strokeWidth="2" strokeLinecap="round"/></svg>
              Ajuda / Suporte
            </a>
          </div>
          {/* Informações do usuário */}
          <div className="mb-4">
            <span className="uppercase text-xs text-white/60 font-bold tracking-widest mb-2 block">Informações</span>
            <div className="flex flex-col gap-1 text-white/80 text-sm">
              <span>Status: <span className="font-semibold" style={{ color: '#D72638' }}>Online</span></span>
              <span>Plano: <span className="font-semibold" style={{ color: '#D72638' }}>Premium</span></span>
            </div>
          </div>
          {/* Outros */}
          <div className="mt-auto border-t border-white/10 pt-4">
            <a href="#privacidade" className="flex items-center gap-3 text-white text-base py-3 hover:bg-[#D72638]/20 rounded-lg transition">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 17a5 5 0 0 0 5-5V9a5 5 0 0 0-10 0v3a5 5 0 0 0 5 5Z" stroke="#D72638" strokeWidth="2"/><path d="M12 17v2" stroke="#D72638" strokeWidth="2" strokeLinecap="round"/></svg>
              Política de privacidade
            </a>
            <a href="#termos" className="flex items-center gap-3 text-white text-base py-3 hover:bg-[#D72638]/20 rounded-lg transition">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#D72638" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#D72638" strokeWidth="2"/></svg>
              Termos de uso
            </a>
          </div>
        </nav>
      </aside>
    </div>
  );
} 