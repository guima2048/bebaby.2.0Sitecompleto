import { useState } from "react";
import FeedbackToast from "../components/FeedbackToast";
import SeoHead from "../components/SeoHead";

export default function FeedbackDemo() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<"success" | "error">("success");
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#18122B] text-white font-sans">
      <SeoHead title="Demo Feedback Toast" description="Demonstração de feedback visual para sucesso e erro." />
      <h1 className="text-2xl font-bold mb-4">Demonstração de Feedback Toast</h1>
      <div className="flex gap-4 mb-8">
        <button onClick={() => { setType("success"); setShow(true); }} className="px-4 py-2 rounded bg-green-600">Sucesso</button>
        <button onClick={() => { setType("error"); setShow(true); }} className="px-4 py-2 rounded bg-red-600">Erro</button>
      </div>
      <FeedbackToast show={show} type={type} message={type === "success" ? "Ação realizada com sucesso!" : "Ocorreu um erro."} onClose={() => setShow(false)} />
    </main>
  );
} 