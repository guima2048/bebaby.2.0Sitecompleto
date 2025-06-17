import BackArrow from "../components/BackArrow";

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#18122B] text-white px-4 py-10 flex flex-col items-center font-sans">
      <BackArrow className="mb-4 self-start" />
      {/* Banner/Chamada */}
      <section className="w-full max-w-3xl mx-auto mb-10">
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-[#a259cb] to-[#6d2c91] flex flex-col items-center justify-center py-10 px-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">Sobre Nós</h1>
          <p className="text-lg md:text-xl font-semibold text-white text-center mb-2">Criando conexões reais com respeito e estilo</p>
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto flex flex-col gap-8 animate-fade-in-slow">
        {/* Missão */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-[#a259cb]">Nossa missão</h2>
          <p className="text-base text-gray-200">O BeBaby nasceu para transformar a forma como pessoas maduras e autênticas se conectam. Nossa missão é criar um ambiente seguro, elegante e acolhedor, onde cada usuário possa viver experiências únicas, com liberdade, respeito e privacidade.</p>
        </div>
        {/* Diferenciais */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-[#a259cb]">O que nos diferencia</h2>
          <ul className="list-disc list-inside text-base text-gray-200 space-y-1">
            <li>Design moderno, intuitivo e mobile first</li>
            <li>Perfis verificados e comunidade moderada</li>
            <li>Foco em conexões reais, sem julgamentos ou tabus</li>
            <li>Privacidade e segurança em cada detalhe</li>
          </ul>
        </div>
        {/* Proposta de valor */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-[#a259cb]">Para quem é o BeBaby?</h2>
          <p className="text-base text-gray-200 mb-2">Se você busca um relacionamento transparente, maduro e cheio de estilo, o BeBaby é para você.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="font-semibold text-[#a259cb] mb-1">Para quem busca novas experiências</h3>
              <p className="text-gray-200 text-sm">Encontre pessoas que valorizam sua autenticidade, buscam respeito e querem viver momentos marcantes, com liberdade e segurança.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="font-semibold text-[#a259cb] mb-1">Para quem valoriza companhia e bons momentos</h3>
              <p className="text-gray-200 text-sm">Conecte-se com pessoas maduras, generosas e prontas para compartilhar experiências, sempre com transparência e elegância.</p>
            </div>
          </div>
        </div>
        {/* Compromisso */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-[#a259cb]">Compromisso com privacidade, respeito e autenticidade</h2>
          <p className="text-base text-gray-200">No BeBaby, cada usuário é tratado com respeito e cuidado. Garantimos privacidade, proteção de dados e um ambiente livre de preconceitos. Aqui, autenticidade é celebrada e cada conexão é construída com confiança.</p>
        </div>
      </section>
    </main>
  );
} 