import Link from "next/link";

export default function Logout() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#18122B] to-[#393053] text-white font-sans px-4">
      <h1 className="text-2xl font-extrabold mb-4">Sessão encerrada</h1>
      <p className="text-lg mb-6 text-center">Você saiu da sua conta com sucesso.</p>
      <Link href="/login" className="px-6 py-2 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-semibold shadow hover:brightness-110 transition">Voltar para Login</Link>
    </main>
  );
} 