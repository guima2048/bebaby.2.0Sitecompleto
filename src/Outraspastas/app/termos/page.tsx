"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BackArrow from "../components/BackArrow";

export default function TermosPage() {
  const [activeTab, setActiveTab] = useState<'termos' | 'privacidade'>('termos');

  return (
    <main className="min-h-screen bg-[#18122B] text-white px-4 py-10 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl">
        <BackArrow className="mb-4" />
        <h1 className="text-3xl font-extrabold mb-6 text-center">Termos de Uso</h1>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">1. Aceitação dos Termos</h2>
          <p className="text-base text-gray-200">Ao acessar e usar o BeBaby, você concorda em cumprir estes termos de uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">2. Uso do Serviço</h2>
          <p className="text-base text-gray-200">O BeBaby é uma plataforma de relacionamento para pais e cuidadores. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">3. Conta do Usuário</h2>
          <p className="text-base text-gray-200">Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram em sua conta.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">4. Conteúdo do Usuário</h2>
          <p className="text-base text-gray-200">Você mantém todos os direitos sobre o conteúdo que compartilha, mas concede ao BeBaby uma licença para usar, modificar e distribuir esse conteúdo.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">5. Conduta do Usuário</h2>
          <p className="text-base text-gray-200">Você concorda em não usar o serviço para:</p>
          <ul className="list-disc list-inside text-base text-gray-200 ml-4">
            <li>Publicar conteúdo ilegal ou ofensivo</li>
            <li>Assediar outros usuários</li>
            <li>Usar informações falsas</li>
            <li>Violar direitos de propriedade intelectual</li>
          </ul>
        </section>
      </div>
    </main>
  );
} 