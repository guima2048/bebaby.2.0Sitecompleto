import { useState } from "react";
import BotaoExemplo from "../components/exemplos/BotaoExemplo";
import InputExemplo from "../components/exemplos/InputExemplo";
import CardExemplo from "../components/exemplos/CardExemplo";
import SeoHead from "../components/SeoHead";

export default function ExemplosDemo() {
  const [valor, setValor] = useState("");
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#18122B] text-white font-sans gap-8">
      <SeoHead title="Demo Componentes Reutilizáveis" description="Demonstração de botão, input e card reutilizáveis." />
      <h1 className="text-2xl font-bold">Exemplos de Componentes</h1>
      <CardExemplo title="Card Exemplo">
        <InputExemplo value={valor} onChange={setValor} placeholder="Digite algo..." />
        <div className="mt-4">
          <BotaoExemplo onClick={() => alert(valor || "Nada digitado")}>Mostrar valor</BotaoExemplo>
        </div>
      </CardExemplo>
    </main>
  );
} 