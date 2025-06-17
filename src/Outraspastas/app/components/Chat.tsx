"use client";
import { useState, useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  image?: string;
}

interface ChatProps {
  matchId: string;
  matchName: string;
  matchImage: string;
}

export default function Chat({ matchId, matchName, matchImage }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useNotifications();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simular recebimento de mensagens
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de receber uma mensagem
        const newMsg: Message = {
          id: Math.random().toString(36).substr(2, 9),
          sender: matchName,
          content: "Olá! Como você está?",
          timestamp: new Date(),
          image: matchImage
        };
        setMessages(prev => [...prev, newMsg]);

        // Adicionar notificação
        addNotification({
          type: 'message',
          title: `Nova mensagem de ${matchName}`,
          message: newMsg.content,
          image: matchImage,
          link: `/chat/${matchId}`
        });
      }
    }, 10000); // Verificar a cada 10 segundos

    return () => clearInterval(interval);
  }, [matchId, matchName, matchImage, addNotification]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'Você',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Cabeçalho do Chat */}
      <div className="flex items-center gap-3 p-4 border-b border-[#333]">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={matchImage}
            alt={matchName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-white">{matchName}</h3>
          <p className="text-sm text-gray-400">Online</p>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'Você' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'Você'
                  ? 'bg-[#a259cb] text-white'
                  : 'bg-[#333] text-white'
              }`}
            >
              {message.sender !== 'Você' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={message.image}
                      alt={message.sender}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{message.sender}</span>
                </div>
              )}
              <p>{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-[#333]">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-[#333] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a259cb]"
          />
          <button
            type="submit"
            className="bg-[#a259cb] text-white px-4 py-2 rounded-lg hover:bg-[#8a4ca8] transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
} 