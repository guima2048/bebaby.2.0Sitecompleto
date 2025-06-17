// 🔒 Página de teste de cadastro de usuário para validação de senha forte
'use client';

import { useState } from 'react';

export default function CadastroTestePage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (senha: string) => {
    if (senha.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres.';
    }
    if (!/[A-Z]/.test(senha)) {
      return 'A senha deve conter ao menos uma letra maiúscula.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    const validation = validatePassword(password);
    if (validation) {
      setError(validation);
    } else {
      setError('');
      setSuccess('Senha válida! Cadastro pode prosseguir.');
    }
  };

  const requisitos = [
    {
      label: 'Mínimo de 8 caracteres',
      valid: password.length >= 8,
    },
    {
      label: 'Mínimo de 1 letra maiúscula',
      valid: /[A-Z]/.test(password),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Teste de Cadastro - Validação de Senha</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <ul className="mt-2 space-y-1 text-sm">
              {requisitos.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {req.valid ? (
                    <svg className="w-4 h-4 text-green-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>
                  )}
                  <span className={req.valid ? 'text-green-700 font-semibold transition-colors' : 'text-gray-700 transition-colors'}>{req.label}</span>
                </li>
              ))}
            </ul>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Testar Senha
          </button>
        </form>
      </div>
    </div>
  );
} 