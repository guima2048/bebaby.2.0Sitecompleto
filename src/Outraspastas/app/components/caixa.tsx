'use client'

import React, { useState, useEffect } from 'react'

interface Mensagem {
  id: string
  nome: string
  avatar: string
  mensagem: string
  hora: string
  lida: boolean
  verificado: boolean
  online: boolean
}

const mockMensagens: Mensagem[] = [
  {
    id: '1',
    nome: 'Rias Gremory',
    avatar: '/Usuário_1.png',
    mensagem: 'Olá! 😌 O que você gosta de fazer...',
    hora: '19:32',
    lida: false,
    verificado: true,
    online: true,
  },
  {
    id: '2',
    nome: 'Henrique',
    avatar: '/Usuário_12.png',
    mensagem: 'Adorei saber sobre você!',
    hora: '13:15',
    lida: true,
    verificado: false,
    online: false,
  },
  {
    id: '3',
    nome: 'Beatriz',
    avatar: '/Usuário_Teste.png',
    mensagem: 'Podemos marcar algo neste final...',
    hora: '16:20',
    lida: false,
    verificado: false,
    online: true,
  },
]

export default function CaixaDeMensagens() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([])

  useEffect(() => {
    const ordenadas = mockMensagens.sort((a, b) => {
      if (a.lida === b.lida) return 0
      return a.lida ? 1 : -1
    })
    setMensagens(ordenadas)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#18122B] to-[#393053] text-white px-2 py-4 flex flex-col max-w-md mx-auto">
      <header className="flex justify-between items-center mb-4 px-1">
        <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
        <button className="rounded-full p-2 bg-[#635985] active:bg-[#443C68] transition-colors shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </header>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pb-20">
        {mensagens.map((m) => (
          <button
            key={m.id}
            className={`flex items-center gap-3 w-full p-3 rounded-2xl shadow-sm transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-400 border ${
              m.lida ? 'bg-[#232144]/80 border-transparent' : 'bg-[#443C68]/90 border-pink-500 shadow-lg'
            }`}
            style={{ minHeight: 72 }}
          >
            <div className="relative">
              <img
                src={m.avatar}
                alt={m.nome}
                className="w-14 h-14 rounded-full border-2 border-pink-400 shadow-md object-cover"
              />
              {m.online && (
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-[#232144] rounded-full animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-semibold text-base truncate">
                  {m.nome}
                  {m.verificado && <span className="ml-1 text-blue-400 align-middle">✔️</span>}
                </span>
                {m.lida === false && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-pink-500 text-white">Novo</span>}
              </div>
              <p className={`text-sm truncate ${m.lida ? 'text-gray-300' : 'text-white font-medium'}`}>{m.mensagem}</p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-xs text-gray-400 mb-2">{m.hora}</span>
              {!m.lida && <span className="w-2 h-2 bg-pink-400 rounded-full mt-2" />}
            </div>
          </button>
        ))}
      </div>

      {/* Botão flutuante para nova mensagem */}
      <button className="fixed bottom-6 right-6 z-20 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg shadow-pink-500/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
} 