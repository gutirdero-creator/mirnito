import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ad, Chat, Message, User, Review } from '../types';
import { MOCK_ADS, MOCK_STORIES, MOCK_EVENTS } from '../data/mockAds';
import { useNotification } from './NotificationContext';

interface DataContextType {
  ads: Ad[];
  chats: Chat[];
  messages: Record<string, Message[]>; // Map chatID -> Messages
  users: User[];
  favorites: Set<string>;
  
  // Actions
  addAd: (ad: Ad) => void;
  updateAdStatus: (id: string, status: Ad['status']) => void;
  deleteAd: (id: string) => void;
  toggleFavorite: (id: string) => void;
  
  // Chat Actions
  sendMessage: (chatId: string, text: string) => void;
  createChat: (adId: string, sellerName: string) => string;
  
  // User Actions
  registerUser: (user: User) => void;
  getAllUsers: () => User[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Mock Users (simulating DB)
const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Алексей (Админ)', email: 'admin@mirnito.ru', role: 'admin', isVerified: true, phone: '+7 999 000-00-00', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: 'u2', name: 'Анна', email: 'anna@mail.ru', role: 'user', isVerified: true, phone: '+7 999 111-22-33', avatar: 'https://i.pravatar.cc/150?u=10' },
  { id: 'u3', name: 'Игорь', email: 'igor@mail.ru', role: 'user', isVerified: false, phone: '+7 999 444-55-66', avatar: 'https://i.pravatar.cc/150?u=11' },
];

const INITIAL_CHATS: Chat[] = [
  { id: 'c1', userName: 'Анна', userAvatar: 'https://i.pravatar.cc/150?u=10', lastMessage: 'Коляска еще продается?', unreadCount: 0, adTitle: 'Детская коляска Yoya', time: '10:30' },
  { id: 'c2', userName: 'Игорь', userAvatar: 'https://i.pravatar.cc/150?u=11', lastMessage: 'Да, лифт работает.', unreadCount: 2, adTitle: 'Остатки ламината', time: 'Вчера' },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', text: 'Здравствуйте! Коляска еще в наличии?', sender: 'me', time: '10:00', read: true },
    { id: 'm2', text: 'Добрый день! Да, еще не продала.', sender: 'other', time: '10:05', read: true },
  ],
  'c2': [
    { id: 'm3', text: 'Лифт работает?', sender: 'me', time: '12:00', read: true },
    { id: 'm4', text: 'Да, лифт работает.', sender: 'other', time: '12:05', read: false },
  ]
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const { showToast, addNotification } = useNotification();

  // --- Ad Logic ---
  const addAd = (newAd: Ad) => {
    setAds(prev => [newAd, ...prev]);
    showToast('Объявление успешно опубликовано!');
    // Simulate moderation notification
    setTimeout(() => {
        addNotification({
            title: 'Модерация пройдена',
            text: `Ваше объявление "${newAd.title}" теперь видно всем соседям.`,
            type: 'success'
        });
    }, 3000);
  };

  const updateAdStatus = (id: string, status: Ad['status']) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status } : ad));
    showToast(`Статус объявления изменен на: ${status}`, 'info');
  };

  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
    showToast('Объявление удалено', 'error');
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
        showToast('Удалено из избранного', 'info');
      } else {
        newFavs.add(id);
        showToast('Добавлено в избранное');
      }
      return newFavs;
    });
  };

  // --- User Logic ---
  const registerUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const getAllUsers = () => users;

  // --- Chat Logic ---
  const createChat = (adId: string, sellerName: string) => {
    const existingChat = chats.find(c => c.userName === sellerName);
    if (existingChat) return existingChat.id;

    const newChatId = Date.now().toString();
    const ad = ads.find(a => a.id === adId);
    
    const newChat: Chat = {
        id: newChatId,
        userName: sellerName,
        userAvatar: `https://ui-avatars.com/api/?name=${sellerName}&background=random`,
        lastMessage: 'Начат диалог',
        unreadCount: 0,
        adTitle: ad?.title || 'Объявление',
        time: 'Сейчас'
    };

    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({ ...prev, [newChatId]: [] }));
    
    return newChatId;
  };

  const sendMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update chat list preview
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, lastMessage: text, time: 'Сейчас' } : c));

    // Simulate Reply
    setTimeout(() => {
        const reply: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Спасибо за сообщение! Я сейчас занят, отвечу чуть позже.',
            sender: 'other',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true
        };
        
        setMessages(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), reply]
        }));
        
        setChats(prev => prev.map(c => c.id === chatId ? { ...c, lastMessage: reply.text, unreadCount: (c.unreadCount || 0) + 1 } : c));
        
        addNotification({
            title: 'Новое сообщение',
            text: `Вам ответили в чате #${chatId}`,
            type: 'message'
        });
        showToast('Получен ответ от продавца', 'info');

    }, 2000);
  };

  return (
    <DataContext.Provider value={{ 
      ads, chats, messages, users, favorites,
      addAd, updateAdStatus, deleteAd, toggleFavorite,
      sendMessage, createChat,
      registerUser, getAllUsers
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};