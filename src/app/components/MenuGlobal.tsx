import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/cadastro", label: "Cadastro" },
  { href: "/recuperar-senha", label: "Recuperar Senha" },
  { href: "/meuperfil", label: "Meu Perfil" },
  { href: "/usuario", label: "Perfil Usuário" },
  { href: "/notificacoes", label: "Notificações" },
  { href: "/configuracoes", label: "Configurações" },
  { href: "/chat", label: "Chat" },
  { href: "/mensagem", label: "Mensagens" },
  { href: "/caixa", label: "Caixa de Entrada" },
  { href: "/buscar", label: "Buscar" },
  { href: "/upgrade", label: "Upgrade" },
  { href: "/termos", label: "Termos de Uso" },
  { href: "/sucesso", label: "Sucesso" },
  { href: "/ajuda", label: "Ajuda" },
  { href: "/denuncia", label: "Denúncia" },
  { href: "/foto", label: "Foto Cheia" },
  { href: "/logout", label: "Logout" },
];

export default function MenuGlobal() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#18122B] border-t border-[#a259cb] flex flex-row flex-wrap justify-center gap-2 py-2 z-50 md:static md:w-auto md:bg-transparent md:border-none md:justify-start">
      {links.map(link => (
        <Link key={link.href} href={link.href} className="text-xs text-white px-2 py-1 rounded hover:bg-[#a259cb]/30 transition">
          {link.label}
        </Link>
      ))}
    </nav>
  );
} 