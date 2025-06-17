import MenuGlobal from "../components/MenuGlobal";
import SeoHead from "../components/SeoHead";

export default function MenuDemo() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#18122B] text-white font-sans">
      <SeoHead title="Demo Menu Global" description="Demonstração do menu global com links para todas as páginas." />
      <h1 className="text-2xl font-bold mb-4">Demonstração do Menu Global</h1>
      <p className="mb-8">O menu global aparece fixo no rodapé (mobile first).<br/>Inclua <code>{"<MenuGlobal />"}</code> no seu layout para usar.</p>
      <MenuGlobal />
    </main>
  );
} 