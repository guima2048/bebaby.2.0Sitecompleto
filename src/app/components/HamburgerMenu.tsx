import { useEffect, useRef } from "react";

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
        {/* Topo com logo e botão X */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-white/10">
          <span className="text-2xl font-extrabold text-white tracking-tight font-sans">BeBaby</span>
          <button onClick={onClose} aria-label="Fechar menu" className="text-white p-1 ml-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        {/* Itens do menu */}
        <nav className="flex-1 flex flex-col gap-2 px-5 py-6">
          <a href="#permissoes" className="flex items-center gap-3 text-white text-base py-3 hover:bg-white/10 rounded-lg transition">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/></svg>
            Permissões
          </a>
          <a href="#termos" className="flex items-center gap-3 text-white text-base py-3 hover:bg-white/10 rounded-lg transition">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2"/></svg>
            Termos de uso
          </a>
          <a href="#privacidade" className="flex items-center gap-3 text-white text-base py-3 hover:bg-white/10 rounded-lg transition">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 17a5 5 0 0 0 5-5V9a5 5 0 0 0-10 0v3a5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2"/><path d="M12 17v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Política de privacidade
          </a>
          <button className="flex items-center gap-3 text-white text-base py-3 hover:bg-white/10 rounded-lg transition text-left">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3" stroke="currentColor" strokeWidth="2"/><path d="M22 2v6m0 0h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Alterar para modo escuro
          </button>
          {/* Área condicional para login */}
          {!isLoggedIn && (
            <a href="/login" className="flex items-center gap-3 text-white text-base py-3 hover:bg-white/10 rounded-lg transition mt-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M16 17v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="2"/><path d="M21 12h-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 15l3-3-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Iniciar sessão
            </a>
          )}
        </nav>
      </aside>
    </div>
  );
} 