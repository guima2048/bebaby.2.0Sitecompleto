export default function Denuncia() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#18122B] to-[#393053] text-white font-sans px-4 py-8">
      <h1 className="text-2xl font-extrabold mb-4">Denunciar Usuário</h1>
      <form className="w-full max-w-md flex flex-col gap-4 bg-white/10 p-6 rounded-2xl shadow-lg">
        <label className="text-sm font-semibold">Nome do usuário
          <input type="text" className="mt-1 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]" placeholder="Usuário a ser denunciado" />
        </label>
        <label className="text-sm font-semibold">Motivo
          <select className="mt-1 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb]">
            <option>Comportamento inadequado</option>
            <option>Perfil falso</option>
            <option>Conteúdo impróprio</option>
            <option>Outro</option>
          </select>
        </label>
        <label className="text-sm font-semibold">Descrição
          <textarea className="mt-1 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]" rows={4} placeholder="Descreva o ocorrido"></textarea>
        </label>
        <button type="button" className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-semibold shadow hover:brightness-110 transition">Enviar denúncia</button>
      </form>
    </main>
  );
} 