"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// Tipos dos blocos (copiar os tipos usados no editor de landing)
// ... (copiar tipos necessários aqui) ...

// Conteúdo inicial da página de cadastro
const initialCadastroBlocks = [
  {
    id: 1,
    type: "banner",
    background: "/main_impact.png",
    title: "BeBaby",
    subtitle: "Cadastro de usuário",
    buttons: []
  },
  {
    id: 2,
    type: "section-title",
    content: "Cadastro de usuário"
  },
  {
    id: 3,
    type: "section-text",
    content: "Preencha os campos abaixo para criar sua conta."
  },
  {
    id: 4,
    type: "institutional",
    blocks: [
      {
        title: "Formulário de Cadastro",
        items: [
          "Nome de usuário: [campo de texto]",
          "E-mail: [campo de email]",
          "Repita o E-mail: [campo de email]",
          "Qual a sua idade? [select de 18 a 99]",
          "Estou em busca de: [select: Homem maduro buscando mulher / Mulher buscando homem maduro]"
        ]
      }
    ]
  },
  {
    id: 5,
    type: "section-text",
    content: "Botão: Próximo passo"
  }
];

const initialCadastroSeo = {
  title: "Cadastro - BeBaby",
  description: "Crie sua conta no BeBaby e comece a encontrar conexões especiais. Cadastro rápido, seguro e gratuito."
};

export default function AdmEditCadastro() {
  const [blocks, setBlocks] = useState(initialCadastroBlocks);
  const [seo, setSeo] = useState(initialCadastroSeo);

  // Função para salvar alterações
  const save = () => {
    try {
      localStorage.setItem('bebaby_cadastro_blocks', JSON.stringify(blocks));
      localStorage.setItem('bebaby_cadastro_seo', JSON.stringify(seo));
      toast.success('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar alterações');
    }
  };

  // Carregar dados salvos
  useEffect(() => {
    try {
      const savedBlocks = localStorage.getItem('bebaby_cadastro_blocks');
      if (savedBlocks) setBlocks(JSON.parse(savedBlocks));
      const savedSeo = localStorage.getItem('bebaby_cadastro_seo');
      if (savedSeo) setSeo(JSON.parse(savedSeo));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados salvos');
    }
  }, []);

  // ... aqui vai o render dos blocos e do editor visual, igual ao editor de landing, mas só para os blocos de cadastro ...
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editor Visual - Página de Cadastro</h1>
      {/* Renderização dos blocos e campos de SEO aqui */}
      {/* Botão de salvar */}
      <button onClick={save} className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-lg">Salvar alterações</button>
    </div>
  );
} 