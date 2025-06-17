import BackArrow from "../components/BackArrow";

export default function TermosDeUso() {
  return (
    <main className="min-h-screen bg-[#18122B] text-white px-4 py-10 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl">
        <BackArrow className="mb-4" href="/" />
        <h1 className="text-3xl font-extrabold mb-6 text-center">Termos de Uso</h1>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Regras de uso da plataforma</h2>
          <p className="text-base text-gray-200">O BeBaby é destinado a maiores de 18 anos. O usuário deve fornecer informações verdadeiras e manter o respeito nas interações. O uso da plataforma deve ser feito de acordo com as leis vigentes.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Responsabilidades do usuário</h2>
          <p className="text-base text-gray-200">O usuário é responsável por suas ações, pelo conteúdo que publica e pelas informações fornecidas. É proibido compartilhar dados de terceiros sem consentimento.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Limitações de responsabilidade da plataforma</h2>
          <p className="text-base text-gray-200">O BeBaby não se responsabiliza por condutas de usuários, encontros presenciais ou informações falsas fornecidas por terceiros. A plataforma atua como intermediária para conexões, mas não garante resultados.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Proibição de uso indevido</h2>
          <p className="text-base text-gray-200">É proibido usar o BeBaby para fins ilícitos, assédio, discriminação, spam, divulgação de conteúdo impróprio ou qualquer prática que viole direitos de outros usuários.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Suspensão ou banimento de contas</h2>
          <p className="text-base text-gray-200">O descumprimento das regras pode resultar em suspensão ou banimento da conta, sem aviso prévio. Casos graves podem ser comunicados às autoridades competentes.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Referência à política de privacidade</h2>
          <p className="text-base text-gray-200">O uso da plataforma implica concordância com nossa <a href="/politica-de-privacidade" className="underline">Política de Privacidade</a>. Recomendamos a leitura atenta desse documento.</p>
        </section>
        <section className="mb-6 text-sm text-gray-400 text-right">
          Última atualização: 10/06/2024
        </section>
      </div>
    </main>
  );
} 