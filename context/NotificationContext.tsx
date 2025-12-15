import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, AppNotification } from '../types';

interface NotificationContextType {
  toasts: Toast[];
  notifications: AppNotification[];
  unreadCount: number;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  markAllRead: () => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'read' | 'time'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock initial notifications
const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: '1', title: 'Добро пожаловать!', text: 'Спасибо за регистрацию на Mirnito.Ru', time: '1 ч. назад', read: false, type: 'system' },
  { id: '2', title: 'Снижение цены', text: 'Цена на "Детская коляска" снизилась на 500₽', time: '2 ч. назад', read: false, type: 'price' },
  { id: '3', title: 'Модерация', text: 'Ваше объявление "Велосипед" опубликовано', time: 'Вчера', read: true, type: 'success' },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const addNotification = useCallback((data: Omit<AppNotification, 'id' | 'read' | 'time'>) => {
    const newNotif: AppNotification = {
      id: Date.now().toString(),
      ...data,
      read: false,
      time: 'Только что'
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ 
      toasts, 
      notifications, 
      unreadCount, 
      showToast, 
      markAllRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};