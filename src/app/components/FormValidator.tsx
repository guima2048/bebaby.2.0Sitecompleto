import { useState } from "react";

export default function FormValidatorExample() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function validate(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("E-mail inválido");
      setSuccess(false);
    } else {
      setError("");
      setSuccess(true);
    }
  }

  return (
    <form onSubmit={validate} className="flex flex-col gap-2 max-w-xs mx-auto mt-8">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" className="px-3 py-2 rounded border" />
      {error && <span className="text-red-500 text-xs">{error}</span>}
      {success && <span className="text-green-600 text-xs">E-mail válido!</span>}
      <button type="submit" className="bg-[#a259cb] text-white rounded px-4 py-2 mt-2">Validar</button>
    </form>
  );
} 