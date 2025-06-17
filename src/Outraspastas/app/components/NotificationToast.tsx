"use client";
import { useEffect } from 'react';
import { useNotifications, NotificationType } from '../context/NotificationContext';
import Image from 'next/image';

export default function NotificationToast() {
  const { notifications, removeNotification, markAsRead } = useNotifications();

  useEffect(() => {
    // Remove notificações após 5 segundos
    const timers = notifications.map(notification => {
      if (!notification.read) {
        return setTimeout(() => {
          removeNotification(notification.id);
        }, 5000);
      }
      return null;
    });

    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'favorite':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'view':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return 'bg-blue-500';
      case 'favorite':
        return 'bg-pink-500';
      case 'view':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification-toast flex items-start gap-3 bg-[#1a1a1a] text-white p-4 rounded-lg shadow-lg min-w-[300px] max-w-[400px] border border-[#333]`}
          onClick={() => {
            markAsRead(notification.id);
            if (notification.link) {
              window.location.href = notification.link;
            }
          }}
        >
          <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold">{notification.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
          </div>
          {notification.image && (
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={notification.image}
                alt={notification.title}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 