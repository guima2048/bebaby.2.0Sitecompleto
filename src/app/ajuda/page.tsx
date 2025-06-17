export default function Ajuda() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#18122B] to-[#393053] text-white font-sans px-4 py-8">
      <h1 className="text-2xl font-extrabold mb-4">Ajuda & FAQ</h1>
      <div className="w-full max-w-md flex flex-col gap-4 mb-8">
        <div>
          <h2 className="font-bold text-lg mb-1">Como recupero minha senha?</h2>
          <p className="text-sm text-gray-200">Use a opção "Recuperar Senha" na tela de login e siga as instruções enviadas para seu e-mail.</p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-1">Como editar meu perfil?</h2>
          <p className="text-sm text-gray-200">Acesse "Meu Perfil" e clique em "Editar perfil" para atualizar suas informações.</p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-1">Como denunciar um usuário?</h2>
          <p className="text-sm text-gray-200">No perfil do usuário, clique em "Denunciar" e preencha o motivo da denúncia.</p>
        </div>
      </div>
      <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white font-semibold shadow hover:brightness-110 transition">Entrar em contato</button>
    </main>
  );
} 