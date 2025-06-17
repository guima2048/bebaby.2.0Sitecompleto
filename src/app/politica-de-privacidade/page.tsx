import BackArrow from "../components/BackArrow";

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-[#18122B] text-white px-4 py-10 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl">
        <BackArrow className="mb-4" />
        <h1 className="text-3xl font-extrabold mb-6 text-center">Política de Privacidade</h1>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Quais dados coletamos</h2>
          <p className="text-base text-gray-200">Coletamos informações que você fornece ao criar sua conta, como nome, e-mail, idade, cidade, fotos e preferências. Também coletamos dados de uso do site, como páginas visitadas e interações.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Como usamos esses dados</h2>
          <p className="text-base text-gray-200">Usamos seus dados para criar e personalizar seu perfil, sugerir conexões, melhorar a experiência no site e garantir a segurança da comunidade.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Com quem compartilhamos</h2>
          <p className="text-base text-gray-200">Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins comerciais. Seus dados só são compartilhados quando necessário para funcionamento do site ou por obrigação legal.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Como protegemos os dados</h2>
          <p className="text-base text-gray-200">Adotamos medidas de segurança como criptografia, controle de acesso e monitoramento para proteger suas informações contra acessos não autorizados.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Seus direitos segundo a LGPD</h2>
          <p className="text-base text-gray-200">Você pode acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Também pode solicitar informações sobre o uso dos seus dados e revogar consentimentos.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Como entrar em contato</h2>
          <p className="text-base text-gray-200">Em caso de dúvidas sobre privacidade, envie um e-mail para <a href="mailto:privacidade@bebaby.com" className="underline">privacidade@bebaby.com</a>.</p>
        </section>
      </div>
    </main>
  );
} 