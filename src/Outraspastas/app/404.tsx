import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#18122B] to-[#393053] text-white font-sans px-4">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-lg mb-6 text-center">Ops! Página não encontrada.<br/>Talvez o link esteja errado ou a página foi removida.</p>
      <Link href="/" className="px-6 py-2 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-semibold shadow hover:brightness-110 transition">Voltar para Home</Link>
    </main>
  );
} 