"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// Tipos de notificações
const TABS = [
  { key: "todas", label: "Todas" },
  { key: "curtidas", label: "Curtidas" },
  { key: "mensagens", label: "Mensagens" },
];

type NotificationType = "mensagem" | "match" | "like" | "sistema";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  image?: string;
}

export default function NotificacoesPage() {
  const [activeTab, setActiveTab] = useState("todas");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "match",
      title: "Novo Match!",
      message: "Você tem um novo match com Maria",
      time: "2 min atrás",
      read: false,
      image: "/perfil-exemplo.png",
    },
    {
      id: "2",
      type: "mensagem",
      title: "Nova Mensagem",
      message: "Ana enviou uma mensagem para você",
      time: "15 min atrás",
      read: false,
      image: "/perfil-exemplo.png",
    },
    {
      id: "3",
      type: "like",
      title: "Novo Like",
      message: "João curtiu seu perfil",
      time: "1 hora atrás",
      read: true,
      image: "/perfil-exemplo.png",
    },
    {
      id: "4",
      type: "sistema",
      title: "Atualização do Sistema",
      message: "Novas funcionalidades disponíveis!",
      time: "2 horas atrás",
      read: true,
    },
  ]);

  // refs para cada notificação
  const notificationRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  // timers para cada notificação
  const timers = useRef<{ [id: string]: NodeJS.Timeout }>({});

  // Marcar como lida
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Observa visibilidade das notificações
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (!id) return;
          if (entry.isIntersecting) {
            // Se já está lida, não faz nada
            const notification = notifications.find((n) => n.id === id);
            if (notification?.read) return;
            // Inicia timer de 5s
            timers.current[id] = setTimeout(() => {
              markAsRead(id);
            }, 5000);
          } else {
            // Saiu da tela, limpa timer
            if (timers.current[id]) {
              clearTimeout(timers.current[id]);
              delete timers.current[id];
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    // Observa todos os elementos
    Object.entries(notificationRefs.current).forEach(([id, el]) => {
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      Object.values(timers.current).forEach(clearTimeout);
    };
    // eslint-disable-next-line
  }, [notifications, activeTab]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "mensagem":
        return (
          <div className="w-10 h-10 rounded-full bg-[#a259cb]/20 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#a259cb">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        );
      case "match":
        return (
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#22c55e">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case "like":
        return (
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ec4899">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case "sistema":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#3b82f6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
    }
  };

  // Filtro das notificações por aba
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "todas") return true;
    if (activeTab === "curtidas") return n.type === "like";
    if (activeTab === "mensagens") return n.type === "mensagem";
    return true;
  });

  return (
    <main className="relative min-h-screen w-full font-sans">
      {/* Background image escurecida */}
      <div className="absolute inset-0 -z-10">
        <Image src="/main_impact.png" alt="Fundo" fill className="object-cover w-full h-full" priority />
        {/* Overlay roxo escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#a259cbaa] to-[#6d2c91aa]" />
        {/* Overlay preto para escurecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6">
        <Link href="/home" className="text-white mr-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-extrabold text-white tracking-tight font-sans">Notificações</span>
        </div>
        <div className="w-8" />
      </header>

      {/* Abas */}
      <div className="flex justify-center mt-6 px-4">
        <div className="bg-black/30 rounded-xl p-1 flex gap-2 w-full max-w-xs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[#a259cb] text-white shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Notificações */}
      <div className="max-w-2xl mx-auto space-y-4 mt-6 px-4 pb-24">
        {filteredNotifications.length === 0 ? (
          <div className="text-center text-white/70 py-12 text-base">Nenhuma notificação encontrada.</div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              data-id={notification.id}
              ref={el => { notificationRefs.current[notification.id] = el; }}
              className={`bg-black/70 rounded-2xl p-4 flex items-start gap-4 transition-colors relative shadow-lg ${
                !notification.read ? "border-l-4 border-[#a259cb]" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              {/* Ícone da Notificação */}
              {getNotificationIcon(notification.type)}

              {/* Conteúdo da Notificação */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">{notification.title}</h3>
                    <p className="text-white/80 text-sm leading-snug">{notification.message}</p>
                  </div>
                  <span className="text-white/60 text-xs whitespace-nowrap ml-2 mt-1">{notification.time}</span>
                </div>
              </div>

              {/* Imagem do Perfil (se houver) */}
              {notification.image && (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={notification.image}
                    alt="Perfil"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              {/* Badge de não lida */}
              {!notification.read && (
                <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#a259cb] border-2 border-white animate-pulse"></span>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
} 