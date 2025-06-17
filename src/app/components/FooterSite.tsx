export default function FooterSite() {
  return (
    <footer className="w-full bg-[#18122B] text-white py-6 px-4 mt-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
          <a href="/termos" className="hover:underline">Termos de Uso</a>
          <a href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</a>
          <a href="/ajuda" className="hover:underline">Ajuda/FAQ</a>
          <a href="/contato" className="hover:underline">Contato</a>
        </div>
        <div className="text-xs text-gray-400 text-center md:text-right mt-2 md:mt-0">
          © {new Date().getFullYear()} BeBaby. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
} 