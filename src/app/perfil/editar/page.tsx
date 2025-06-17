"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const user = {
  nome: "Rias Gremory",
  idade: 25,
  status: "Solteira",
  cidade: "São Luiz, MA",
  profissao: "Empreendedora",
  biografia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget tellus non metus gravida suscipit. Curabitur elementum non sapien non porttitor. Nullam at neque sit amet elit mattis efficitur. Nam molestie urna eu nisi iaculis, quis consectetur neque sagittis.",
  interesses: "Gosto de Viajar e viver novas experiências.",
  hobbies: "Praias, Clubes",
  escolaridade: "Ensino médio",
  filhos: "Não tenho",
  corpo: "Magra",
  etnia: "Branca",
  jaFoiBaby: "Sim, já fui"
};

export default function EditarPerfil() {
  const router = useRouter();
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Implementar salvamento real
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação de delay
      setSuccess("Perfil atualizado com sucesso!");
      setTimeout(() => router.push("/perfil"), 1500);
    } catch (err) {
      setError("Erro ao salvar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center relative overflow-x-hidden">
      {/* Container principal */}
      <div className="relative w-full md:max-w-[480px] mx-auto flex flex-col items-center py-8 px-4">
        <div className="w-full bg-[#18181b] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-400">Editar Perfil</h1>
            <button
              onClick={() => router.push("/perfil")}
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-500/20 text-green-200 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-400">Informações Básicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Idade</label>
                  <input
                    type="number"
                    name="idade"
                    value={formData.idade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Profissão</label>
                  <input
                    type="text"
                    name="profissao"
                    value={formData.profissao}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  />
                </div>
              </div>
            </div>

            {/* Biografia */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-400">O que Busca</h2>
              <div>
                <textarea
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                />
              </div>
            </div>

            {/* Interesses */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-400">Sobre Mim</h2>
              <div>
                <textarea
                  name="interesses"
                  value={formData.interesses}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                />
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-400">Informações Adicionais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Hobbies</label>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Escolaridade</label>
                  <select
                    name="escolaridade"
                    value={formData.escolaridade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  >
                    <option value="Ensino médio">Ensino médio</option>
                    <option value="Superior incompleto">Superior incompleto</option>
                    <option value="Superior completo">Superior completo</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Filhos</label>
                  <select
                    name="filhos"
                    value={formData.filhos}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  >
                    <option value="Não tenho">Não tenho</option>
                    <option value="Tenho">Tenho</option>
                    <option value="Não quero">Não quero</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Corpo</label>
                  <select
                    name="corpo"
                    value={formData.corpo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#FF2800]"
                  >
                    <option value="Magra">Magra</option>
                    <option value="Média">Média</option>
                    <option value="Atlética">Atlética</option>
                    <option value="Acima do peso">Acima do peso</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Etnia</label>
                  <select
                    name="etnia"
                    value={formData.etnia}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#a259cb]"
                  >
                    <option value="Branca">Branca</option>
                    <option value="Negra">Negra</option>
                    <option value="Parda">Parda</option>
                    <option value="Asiática">Asiática</option>
                    <option value="Indígena">Indígena</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color:'#B8B8D1'}}>Já foi baby?</label>
                  <select
                    name="jaFoiBaby"
                    value={formData.jaFoiBaby}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#a259cb]"
                  >
                    <option value="Sim, já fui">Sim, já fui</option>
                    <option value="Não, nunca fui">Não, nunca fui</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/perfil")}
                className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full py-3 rounded-full text-white font-bold text-lg shadow-md hover:brightness-110 transition-all duration-200"
                style={{ background: '#FF2800' }}
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 