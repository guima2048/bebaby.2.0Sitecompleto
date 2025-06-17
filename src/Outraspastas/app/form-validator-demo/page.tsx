import FormValidatorExample from "../components/FormValidator";
import SeoHead from "../components/SeoHead";

export default function FormValidatorDemo() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#18122B] text-white font-sans">
      <SeoHead title="Demo Validação de Formulário" description="Demonstração de validação de formulário com feedback visual." />
      <h1 className="text-2xl font-bold mb-4">Validação de Formulário</h1>
      <FormValidatorExample />
    </main>
  );
} 