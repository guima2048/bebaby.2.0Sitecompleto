'use client'

import React, { useRef, useEffect, useState } from 'react'

interface MensagemChat {
  id: string
  texto: string
  hora: string
  autor: 'user' | 'contato'
  status?: 'enviado' | 'recebido' | 'lido'
  replyTo?: MensagemChat
  autodestruir?: boolean
  imagem?: string
  visualizacaoUnica?: boolean
}

interface MensagemSistema {
  id: string
  texto: string
  tipo: 'sistema'
}

const contato = {
  nome: 'Rias Gremory',
  avatar: '/avatar.png',
  online: true,
  verificado: true,
}

const mensagensMock: MensagemChat[] = [
  { id: '1', texto: 'Oi! Tudo bem?', hora: '19:32', autor: 'contato', status: 'lido' },
  { id: '2', texto: 'Oi! Tudo sim, e você?', hora: '19:33', autor: 'user', status: 'lido' },
  { id: '3', texto: 'Estou ótima! O que vai fazer no fim de semana?', hora: '19:34', autor: 'contato', status: 'lido' },
  { id: '4', texto: 'Ainda não sei, alguma sugestão?', hora: '19:35', autor: 'user', status: 'recebido' },
]

const timerOptions = [
  { label: 'Desabilitado', value: 0 },
  { label: '30 seg', value: 30 },
  { label: '1 min', value: 60 },
  { label: '5 min', value: 300 },
  { label: '10 min', value: 600 },
]

const EMOJIS = ['😀','😂','😍','😎','😭','😡','👍','🙏','👏','🎉','❤️','🔥','😅','😉','😜','😱','🤔','😇','🥰','😏','😬','😴','🤩','😢','😋','😆','😃','😁','😄','😚','😘','😗','😙','😐','😶','😑','😒','🙄','😳','😤','😩','😰','😨','😱','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥳','😵','🤯','😲','😯','😦','😧','😮','😲','🥺','😳','😬','🤥','🤫','🤭','🧐','🤓','😎','🥸','🤠','😺','😸','😹','😻','😼','��','🙀','😿','😾']

const REACOES = ['👍','❤️','😂','😮','😢','🙏']

export default function Chat() {
  const [mensagens, setMensagens] = useState<MensagemChat[]>(mensagensMock)
  const [input, setInput] = useState('')
  const [replyTo, setReplyTo] = useState<MensagemChat | null>(null)
  const [autodestruir, setAutodestruir] = useState(false)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)
  const [showTimerMenu, setShowTimerMenu] = useState(false)
  const timerMenuRef = useRef<HTMLDivElement>(null)
  const [anexos, setAnexos] = useState<{ url: string, type: string, file: File }[]>([])
  const [showEmoji, setShowEmoji] = useState(false)
  const emojiRef = useRef<HTMLDivElement>(null)
  const mensagensRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [digitando, setDigitando] = useState(false)
  const digitandoTimeout = useRef<NodeJS.Timeout | null>(null)
  const [reagindoId, setReagindoId] = useState<string | null>(null)
  const [reacoes, setReacoes] = useState<{ [msgId: string]: string }>({})
  const [modalMidia, setModalMidia] = useState<{ url: string, type: string } | null>(null)
  const [visualizacaoUnica, setVisualizacaoUnica] = useState(false)
  const [midiasVisualizadas, setMidiasVisualizadas] = useState<string[]>([])
  const [visualizadasUnicas, setVisualizadasUnicas] = useState<string[]>([])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  // Timer countdown
  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer((t) => t - 1)
      }, 1000)
    } else if (timerActive && timer === 0) {
      setTimerActive(false)
      // Deleta todas as mensagens lidas
      setMensagens((msgs) => msgs.filter((m) => m.status !== 'lido'))
      adicionarMensagemSistema('Todas as mensagens lidas foram deletadas.')
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timer, timerActive])

  // Mensagem de sistema ao ativar/desativar timer
  useEffect(() => {
    if (timer === 0) {
      adicionarMensagemSistema('Você desativou o timer de autodestruição.')
    } else if (timer > 0) {
      let label = timerOptions.find(opt => opt.value === timer)?.label || `${timer}s`
      adicionarMensagemSistema(`Você ativou o timer de autodestruição para ${label}.`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  // Quando todas as mensagens forem lidas, inicia o timer se for maior que zero
  useEffect(() => {
    if (
      mensagens.length > 0 &&
      mensagens.every((m) => m.status === 'lido') &&
      timer > 0 &&
      !timerActive
    ) {
      setTimerActive(true)
    }
  }, [mensagens, timer, timerActive])

  // Simula leitura da última mensagem após 2s
  useEffect(() => {
    const last = mensagens[mensagens.length - 1]
    if (last && last.autor === 'user' && last.status !== 'lido') {
      const timer = setTimeout(() => {
        setMensagens((msgs) =>
          msgs.map((m, i) =>
            i === msgs.length - 1 ? { ...m, status: 'lido' } : m
          )
        )
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [mensagens])

  // Remove mensagem autodestrutiva após ser lida
  useEffect(() => {
    const last = mensagens[mensagens.length - 1]
    if (last && last.autor === 'user' && last.status === 'lido' && last.autodestruir) {
      const timer = setTimeout(() => {
        setMensagens((msgs) => msgs.filter((m) => m.id !== last.id))
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [mensagens])

  // Fecha o menu ao clicar fora
  useEffect(() => {
    if (!showTimerMenu) return;
    function handleClick(e: MouseEvent) {
      if (timerMenuRef.current && !timerMenuRef.current.contains(e.target as Node)) {
        setShowTimerMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showTimerMenu])

  // Fecha o painel de emoji ao clicar fora
  useEffect(() => {
    if (!showEmoji) return;
    function handleClick(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showEmoji])

  // Scroll inteligente
  useEffect(() => {
    if (autoScroll) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [mensagens, autoScroll])

  function handleScrollMensagens() {
    const el = mensagensRef.current
    if (!el) return
    // Se está a menos de 60px do fim, ativa autoScroll
    setAutoScroll(el.scrollHeight - el.scrollTop - el.clientHeight < 60)
  }

  function enviarMensagem(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() && anexos.length === 0) return
    let novasMsgs: MensagemChat[] = []
    if (anexos.length > 0) {
      anexos.forEach(anexo => {
        novasMsgs.push({
          id: String(Date.now()) + Math.random(),
          texto: '',
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          autor: 'user',
          status: 'enviado',
          replyTo: replyTo || undefined,
          autodestruir: autodestruir || undefined,
          imagem: anexo.url,
          visualizacaoUnica: visualizacaoUnica || undefined,
        })
      })
    }
    if (input.trim()) {
      let novaMensagem: MensagemChat = {
        id: String(Date.now()),
        texto: input,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        autor: 'user',
        status: 'enviado',
        replyTo: replyTo || undefined,
        autodestruir: autodestruir || undefined,
      }
      if (input.trim() === 'exemplo1') {
        novaMensagem.imagem = '/exemplo1.png'
        novaMensagem.texto = ''
      }
      novasMsgs.push(novaMensagem)
    }
    setMensagens((msgs) => [
      ...msgs,
      ...novasMsgs,
    ])
    setInput('')
    setReplyTo(null)
    setAutodestruir(false)
    setAnexos([])
    setVisualizacaoUnica(false)
  }

  function enviarAnexo(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const novos = files.map(file => ({ url: URL.createObjectURL(file), type: file.type, file }))
    setAnexos((prev) => [...prev, ...novos])
    e.target.value = '' // permite selecionar o mesmo arquivo novamente
  }

  function removerAnexo(idx: number) {
    setAnexos(anexos => anexos.filter((_, i) => i !== idx))
  }

  // Swipe para responder mensagem (mobile e desktop)
  function handleTouchStart(e: React.TouchEvent, id: string) {
    dragStartX.current = e.touches[0].clientX
    setDraggedId(id)
  }
  function handleTouchMove(e: React.TouchEvent, id: string) {
    if (dragStartX.current !== null) {
      const offset = e.touches[0].clientX - dragStartX.current
      setDragOffset(offset > 0 ? offset : 0)
    }
  }
  function handleTouchEnd(e: React.TouchEvent, m: MensagemChat) {
    if (dragOffset > 60) {
      setReplyTo(m)
    }
    setDraggedId(null)
    setDragOffset(0)
    dragStartX.current = null
  }
  // Mouse (desktop)
  function handleMouseDown(e: React.MouseEvent, id: string) {
    dragStartX.current = e.clientX
    setDraggedId(id)
  }
  function handleMouseMove(e: React.MouseEvent, id: string) {
    if (dragStartX.current !== null && draggedId === id && e.buttons === 1) {
      const offset = e.clientX - dragStartX.current
      setDragOffset(offset > 0 ? offset : 0)
    }
  }
  function handleMouseUp(e: React.MouseEvent, m: MensagemChat) {
    if (dragOffset > 60) {
      setReplyTo(m)
    }
    setDraggedId(null)
    setDragOffset(0)
    dragStartX.current = null
  }

  function inserirEmoji(emoji: string) {
    setInput((prev) => prev + emoji)
    setShowEmoji(false)
  }

  function adicionarMensagemSistema(texto: string) {
    setMensagens((msgs) => [
      ...msgs,
      { id: 'sys-' + Date.now(), texto, tipo: 'sistema' } as any
    ])
  }

  function reagir(msgId: string, emoji: string) {
    setReacoes((r) => ({ ...r, [msgId]: r[msgId] === emoji ? '' : emoji }))
    setReagindoId(null)
  }

  // Exemplo de mensagem recebida com visualização única
  useEffect(() => {
    if (!mensagens.some(m => m.id === 'exemplo-visualizacao-unica')) {
      setMensagens(msgs => [
        ...msgs,
        {
          id: 'exemplo-visualizacao-unica',
          texto: '',
          hora: '19:40',
          autor: 'contato',
          status: 'lido',
          imagem: '/exemplo8.png',
          visualizacaoUnica: true,
        }
      ])
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-[#18122B] to-[#393053] flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-3 py-3 bg-[#232144]/90 sticky top-0 z-10 shadow-sm relative">
        <img src={contato.avatar} alt={contato.nome} className="w-12 h-12 rounded-full border-2 border-pink-400 object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-base">{contato.nome}</span>
            {contato.verificado && <span className="text-blue-400">✔️</span>}
            {contato.online && <span className="ml-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
          </div>
          <span className="text-xs text-gray-300">Online agora</span>
        </div>
        {/* Timer Button */}
        <div className="relative flex items-center">
          <button
            type="button"
            className={`p-2 rounded-full hover:bg-[#393053]/60 transition-colors ${timer > 0 ? 'bg-pink-500/20' : ''}`}
            onClick={() => setShowTimerMenu((v) => !v)}
            title="Definir timer de autodeleção"
          >
            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
          </button>
          {/* Dropdown */}
          {showTimerMenu && (
            <div
              ref={timerMenuRef}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 bg-[#232144] border border-pink-400 rounded-lg shadow-lg z-50 flex flex-col p-1"
              style={{ minWidth: 150 }}
            >
              {timerOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`px-4 py-2 text-left hover:bg-pink-400/20 text-white rounded ${timer === opt.value ? 'bg-pink-500/30 font-bold' : ''}`}
                  onClick={() => {
                    setTimer(opt.value)
                    setShowTimerMenu(false)
                    setTimerActive(false)
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="p-2 rounded-full hover:bg-[#393053]/60 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </header>

      {/* Mensagens */}
      <div
        ref={mensagensRef}
        onScroll={handleScrollMensagens}
        className="flex-1 flex flex-col gap-2 px-2 py-3 overflow-y-auto bg-transparent"
      >
        {mensagens.map((m) => {
          if ((m as any).tipo === 'sistema') {
            return (
              <div key={m.id} className="text-xs text-gray-300 bg-[#232144] rounded-full px-4 py-1 mx-auto my-2 text-center opacity-80 max-w-xs">
                {m.texto}
              </div>
            )
          }
          const isDragging = draggedId === m.id
          const offset = isDragging ? dragOffset : 0
          // Remove mídia de visualização única após visualizada
          if (m.visualizacaoUnica && midiasVisualizadas.includes(m.id)) {
            setTimeout(() => setMensagens(msgs => msgs.filter(msg => msg.id !== m.id)), 500)
            return null
          }
          // Balão WhatsApp para visualização única
          if (m.visualizacaoUnica) {
            const foiVisualizada = visualizadasUnicas.includes(m.id)
            return (
              <div key={m.id} className={`flex ${m.autor === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end max-w-[75%]`}>
                  {m.autor === 'contato' && (
                    <img src={contato.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2 self-end border border-pink-400 object-cover" />
                  )}
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md bg-[#232144] border-l-4 border-pink-400 focus:outline-none active:scale-95 transition-all`}
                    onClick={() => {
                      if (!foiVisualizada) {
                        setModalMidia({ url: m.imagem!, type: 'image' })
                        setVisualizadasUnicas((prev) => [...prev, m.id])
                      }
                    }}
                    title={foiVisualizada ? 'Visualizado' : 'Visualizar mídia única'}
                    disabled={foiVisualizada}
                  >
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="4" fill="#232144" stroke="#D946EF" strokeWidth="2" />
                      <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#D946EF" fontWeight="bold">1x</text>
                    </svg>
                    <span className="text-pink-300 font-semibold text-sm">
                      {foiVisualizada ? 'Visualizado' : '1x Visualização'}
                    </span>
                  </button>
                  <span className="text-[10px] text-gray-300 ml-2 self-end">{m.hora}</span>
                </div>
              </div>
            )
          }
          return (
            <div
              key={m.id}
              className={`flex ${m.autor === 'user' ? 'justify-end' : 'justify-start'}`}
              onMouseEnter={() => setReagindoId(m.id)}
              onMouseLeave={() => setReagindoId(null)}
              onTouchStart={(e) => handleTouchStart(e, m.id)}
              onTouchEnd={(e) => handleTouchEnd(e, m)}
              onMouseDown={(e) => handleMouseDown(e, m.id)}
              onMouseMove={(e) => handleMouseMove(e, m.id)}
              onMouseUp={(e) => handleMouseUp(e, m)}
            >
              {m.autor === 'contato' && (
                <img src={contato.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2 self-end border border-pink-400 object-cover" />
              )}
              <div
                className="relative flex flex-col max-w-[75%]"
                style={{ transform: `translateX(${offset}px)`, transition: isDragging ? 'none' : 'transform 0.2s' }}
                onTouchStart={(e) => handleTouchStart(e, m.id)}
                onTouchMove={(e) => handleTouchMove(e, m.id)}
                onTouchEnd={(e) => handleTouchEnd(e, m)}
                onMouseDown={(e) => handleMouseDown(e, m.id)}
                onMouseMove={(e) => handleMouseMove(e, m.id)}
                onMouseUp={(e) => handleMouseUp(e, m)}
              >
                {reagindoId === m.id && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#232144] border border-pink-400 rounded-full shadow-lg flex gap-1 px-2 py-1 z-40 animate-fade-in">
                    {REACOES.map((emoji) => (
                      <button
                        key={emoji}
                        className="text-xl hover:scale-125 transition-transform"
                        onClick={() => reagir(m.id, emoji)}
                        type="button"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
                {m.replyTo && (
                  <div className="text-xs text-pink-300 bg-[#232144] rounded-t-xl rounded-b-md px-3 py-1 mb-1 border-l-4 border-pink-400">
                    <span className="font-semibold">{m.replyTo.autor === 'user' ? 'Você' : contato.nome}:</span> {m.replyTo.texto}
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
                    m.autor === 'user'
                      ? 'bg-pink-500 text-white rounded-br-sm'
                      : 'bg-[#232144] text-gray-100 rounded-bl-sm'
                  }`}
                >
                  {m.imagem && m.imagem.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={m.imagem}
                      controls
                      className="rounded-lg max-w-[200px] mb-2 cursor-pointer border border-[1px] border-pink-200/60 shadow-none"
                      onClick={() => {
                        if (m.visualizacaoUnica && !midiasVisualizadas.includes(m.id)) {
                          setModalMidia({ url: m.imagem!, type: 'video' })
                          setMidiasVisualizadas((prev) => [...prev, m.id])
                        } else if (!m.visualizacaoUnica) {
                          setModalMidia({ url: m.imagem!, type: 'video' })
                        }
                      }}
                    />
                  ) : m.imagem ? (
                    <img
                      src={m.imagem}
                      alt="imagem enviada"
                      className="rounded-lg max-w-[200px] mb-2 cursor-pointer border border-[1px] border-pink-200/60 shadow-none"
                      onClick={() => {
                        if (m.visualizacaoUnica && !midiasVisualizadas.includes(m.id)) {
                          setModalMidia({ url: m.imagem!, type: 'image' })
                          setMidiasVisualizadas((prev) => [...prev, m.id])
                        } else if (!m.visualizacaoUnica) {
                          setModalMidia({ url: m.imagem!, type: 'image' })
                        }
                      }}
                    />
                  ) : null}
                  {m.texto}
                  {/* Reação rápida */}
                  {reacoes[m.id] && (
                    <div className="mt-1 flex justify-end">
                      <span className="text-xl select-none">{reacoes[m.id]}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-300">{m.hora}</span>
                    {/* Status de leitura */}
                    {m.autor === 'user' && (
                      <span className="ml-1">
                        {m.status === 'enviado' && (
                          <svg className="inline w-4 h-4 text-gray-400" viewBox="0 0 20 20"><path fill="currentColor" d="M7.629 13.29l-3.3-3.3a1 1 0 111.414-1.415l2.3 2.3 5.3-5.3a1 1 0 111.415 1.415l-6 6a1 1 0 01-1.415 0z"/></svg>
                        )}
                        {m.status === 'recebido' && (
                          <span className="inline-flex relative w-5 h-4 align-middle">
                            <svg className="absolute left-0 top-0 w-4 h-4 text-gray-400" viewBox="0 0 20 20"><path fill="currentColor" d="M7.629 13.29l-3.3-3.3a1 1 0 111.414-1.415l2.3 2.3 5.3-5.3a1 1 0 111.415 1.415l-6 6a1 1 0 01-1.415 0z"/></svg>
                            <svg className="absolute left-1 top-0 w-4 h-4 text-gray-400" style={{zIndex:1}} viewBox="0 0 20 20"><path fill="currentColor" d="M7.629 13.29l-3.3-3.3a1 1 0 111.414-1.415l2.3 2.3 5.3-5.3a1 1 0 111.415 1.415l-6 6a1 1 0 01-1.415 0z"/></svg>
                          </span>
                        )}
                        {m.status === 'lido' && (
                          <span className="inline-flex relative w-5 h-4 align-middle">
                            <svg className="absolute left-0 top-0 w-4 h-4 text-blue-500" viewBox="0 0 20 20"><path fill="currentColor" d="M7.629 13.29l-3.3-3.3a1 1 0 111.414-1.415l2.3 2.3 5.3-5.3a1 1 0 111.415 1.415l-6 6a1 1 0 01-1.415 0z"/></svg>
                            <svg className="absolute left-1 top-0 w-4 h-4 text-blue-500" style={{zIndex:1}} viewBox="0 0 20 20"><path fill="currentColor" d="M7.629 13.29l-3.3-3.3a1 1 0 111.414-1.415l2.3 2.3 5.3-5.3a1 1 0 111.415 1.415l-6 6a1 1 0 01-1.415 0z"/></svg>
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      {/* Campo de digitação */}
      {anexos.length > 0 && (
        <div className="w-full max-w-full flex gap-3 mb-2 items-end pb-2 px-1 box-border" style={{overflowX: anexos.length > 2 ? 'auto' : 'hidden'}}>
          {anexos.map((anexo, idx) => (
            <div key={anexo.url} className="relative group flex-shrink-0" style={{maxWidth: '110px'}}>
              {anexo.type.startsWith('image/') ? (
                <img
                  src={anexo.url}
                  alt="preview"
                  className="w-full h-28 object-cover rounded-xl border-2 border-pink-400 cursor-pointer max-w-[110px]"
                  onClick={() => setModalMidia({ url: anexo.url, type: 'image' })}
                />
              ) : anexo.type.startsWith('video/') ? (
                <video
                  src={anexo.url}
                  className="w-full h-28 object-cover rounded-xl border-2 border-pink-400 cursor-pointer max-w-[110px]"
                  onClick={() => setModalMidia({ url: anexo.url, type: 'video' })}
                />
              ) : null}
              <button type="button" onClick={() => removerAnexo(idx)} className="absolute -top-3 -right-3 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-pink-700 transition-all opacity-90 group-hover:opacity-100 z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          {/* Visualização única */}
          <button
            type="button"
            className={`ml-2 flex items-center justify-center w-10 h-10 rounded-full border-2 ${visualizacaoUnica ? 'border-pink-400 bg-pink-500/20' : 'border-[#393053] bg-[#232144]'} text-pink-300 transition-all`}
            title="Visualização única"
            onClick={() => setVisualizacaoUnica(v => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="ml-1 text-xs font-bold">1x</span>
          </button>
        </div>
      )}
      <form
        onSubmit={enviarMensagem}
        className="flex flex-col gap-1 px-2 py-1 bg-[#232144]/95 sticky bottom-0 z-20"
      >
        {/* Responder mensagem */}
        {replyTo && (
          <div className="flex items-center gap-2 mb-1 px-2 py-1 bg-pink-100/20 rounded-lg border-l-4 border-pink-400">
            <span className="text-xs text-pink-300 font-semibold">Respondendo: {replyTo.autor === 'user' ? 'Você' : contato.nome}</span>
            <span className="text-xs text-gray-200 truncate max-w-[120px]">{replyTo.texto}</span>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="ml-2 p-1 rounded-full hover:bg-pink-200 transition-colors"
              title="Cancelar resposta"
            >
              <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex items-center gap-1">
          {/* Botão de anexo */}
          <label className="p-0.5 rounded-full bg-[#393053] hover:bg-pink-500/20 cursor-pointer transition-colors">
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              multiple
              onChange={enviarAnexo}
            />
            <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15V6.5A4.5 4.5 0 0016.5 2h-9A4.5 4.5 0 003 6.5v11A4.5 4.5 0 007.5 22h9a4.5 4.5 0 004.5-4.5V9" />
            </svg>
          </label>
          {/* Botão de emoji */}
          <div className="relative">
            <button
              type="button"
              className="p-0.5 rounded-full bg-[#393053] hover:bg-pink-500/20 transition-colors"
              onClick={() => setShowEmoji((v) => !v)}
              title="Inserir emoji"
            >
              <span role="img" aria-label="emoji" className="text-base">😊</span>
            </button>
            {showEmoji && (
              <div ref={emojiRef} className="absolute bottom-12 left-0 z-50 bg-[#232144] border border-pink-400 rounded-lg shadow-lg p-2 w-72 max-h-60 overflow-y-auto flex flex-wrap gap-1">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="text-2xl p-1 hover:bg-pink-400/30 rounded"
                    onClick={() => inserirEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 rounded-full px-2 py-1 bg-[#393053] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm min-h-[28px]"
            maxLength={300}
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-1.5 shadow-md active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </form>

      {/* Modal de mídia em tela cheia */}
      {modalMidia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button onClick={() => {
            setModalMidia(null)
          }} className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2 shadow-lg hover:bg-pink-700 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {modalMidia.type === 'image' ? (
            <img src={modalMidia.url} alt="visualização" className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl" />
          ) : (
            <video src={modalMidia.url} controls autoPlay className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl" />
          )}
        </div>
      )}
    </div>
  )
} 