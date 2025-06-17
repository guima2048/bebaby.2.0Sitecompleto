import Image from "next/image";
import Link from "next/link";

export default function Foto() {
  // Exemplo de imagem fixa, depois pode ser dinâmico via query
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans px-4 relative">
      <Link href="/meuperfil" className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 text-white font-semibold shadow hover:brightness-110 transition">Voltar</Link>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Image src="/perfil-exemplo.png" alt="Foto em tela cheia" width={400} height={400} className="rounded-2xl shadow-2xl object-contain max-h-[80vh]" />
      </div>
    </main>
  );
} 