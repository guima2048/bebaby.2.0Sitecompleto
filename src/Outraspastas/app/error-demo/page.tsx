import { useState } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import SeoHead from "../components/SeoHead";

function BuggyComponent() {
  throw new Error("Erro proposital!");
}

export default function ErrorDemo() {
  const [crash, setCrash] = useState(false);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#18122B] text-white font-sans">
      <SeoHead title="Demo Error Boundary" description="Demonstração de tratamento de erro genérico." />
      <h1 className="text-2xl font-bold mb-4">Demonstração de Error Boundary</h1>
      <ErrorBoundary>
        <button onClick={() => setCrash(true)} className="px-4 py-2 rounded bg-red-600 mb-4">Disparar erro</button>
        {crash && <BuggyComponent />}
      </ErrorBoundary>
    </main>
  );
} 