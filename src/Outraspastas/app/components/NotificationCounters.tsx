"use client";
import { useNotifications } from '../context/NotificationContext';

export default function NotificationCounters() {
  const { notificationCounts } = useNotifications();

  return (
    <div className="flex items-center gap-4">
      {/* Notificações Gerais */}
      <button className="relative text-white">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notificationCounts.total > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#a259cb] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCounts.total}
          </span>
        )}
      </button>

      {/* Mensagens */}
      <button className="relative text-white">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {notificationCounts.messages > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#a259cb] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCounts.messages}
          </span>
        )}
      </button>

      {/* Favoritos */}
      <button className="relative text-white">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {notificationCounts.favorites > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#a259cb] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCounts.favorites}
          </span>
        )}
      </button>

      {/* Visualizações */}
      <button className="relative text-white">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {notificationCounts.views > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#a259cb] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCounts.views}
          </span>
        )}
      </button>
    </div>
  );
} 