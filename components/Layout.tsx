import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { Menu, X, MapPin, Search, PlusCircle, Home, Grid, Shield, Info, Phone, User, LogIn, Heart, Bell, Settings, CheckCircle, AlertCircle, Info as InfoIcon, X as XIcon, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { AuthModal } from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { toasts, notifications, unreadCount, markAllRead } = useNotification();
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      onNavigate(Page.PROFILE);
    } else {
      openAuthModal();
    }
  };

  const handleNotifClick = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen && unreadCount > 0) {
      markAllRead();
    }
  };

  const navLinkClass = (page: string) => 
    `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPage === page 
        ? 'text-primary-600 bg-primary-50' 
        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
    }`;

  const mobileNavLinkClass = (page: string) =>
    `flex flex-col items-center justify-center w-full py-2 text-xs font-medium transition-colors ${
       currentPage === page ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthModal />
      
      {/* TOASTS CONTAINER - Fixed Overlay */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 border border-gray-100 min-w-[300px] animate-fade-in pointer-events-auto"
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            {toast.type === 'info' && <InfoIcon className="w-5 h-5 text-blue-500" />}
            <span className="text-sm font-medium text-gray-800">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
              <div className="bg-primary-600 p-2 rounded-lg mr-2">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">Mirnito<span className="text-primary-600">.</span>Ru</h1>
                <p className="text-xs text-gray-500">ЖК Томилино Парк</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4">
              <button onClick={() => onNavigate(Page.HOME)} className={navLinkClass(Page.HOME)}>Главная</button>
              <button onClick={() => onNavigate(Page.BROWSE)} className={navLinkClass(Page.BROWSE)}>Объявления</button>
              <button onClick={() => onNavigate(Page.ABOUT)} className={navLinkClass(Page.ABOUT)}>О нас</button>
              {user?.role === 'admin' && (
                 <button onClick={() => onNavigate(Page.ADMIN)} className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors text-purple-600 hover:bg-purple-50 flex items-center">
                   <Settings className="w-4 h-4 mr-1" /> Админка
                 </button>
              )}
            </nav>

            {/* Desktop CTA & User */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={handleNotifClick}
                  className="text-gray-400 hover:text-gray-600 relative p-1 outline-none"
                >
                   <Bell className="w-5 h-5" />
                   {unreadCount > 0 && (
                     <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500 animate-pulse"></span>
                   )}
                </button>

                {/* Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                    <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Уведомления</span>
                      <button onClick={() => setIsNotifOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                             <div className="flex items-start gap-3">
                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                                <div>
                                   <div className="text-sm font-bold text-gray-900">{notif.title}</div>
                                   <p className="text-xs text-gray-600 mt-0.5">{notif.text}</p>
                                   <div className="text-[10px] text-gray-400 mt-1">{notif.time}</div>
                                </div>
                             </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-400 text-sm">
                          Нет новых уведомлений
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <button 
                  onClick={() => onNavigate(Page.PROFILE)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                    {user?.name[0]}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
              ) : (
                <button 
                  onClick={openAuthModal}
                  className="text-gray-600 hover:text-primary-600 font-medium text-sm flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Войти
                </button>
              )}

              <button 
                onClick={() => onNavigate(Page.POST_AD)}
                className="bg-primary-600 text-white px-5 py-2 rounded-full font-medium hover:bg-primary-700 transition shadow-sm flex items-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Разместить
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               <button onClick={handleNotifClick} className="text-gray-500 hover:text-gray-700 p-2 mr-2 relative">
                 <Bell className="w-6 h-6" />
                 {unreadCount > 0 && (
                   <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
                 )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700 p-2">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Notifications (Simple Redirect or Modal logic could be here, reusing desktop dropdown for now logic via ref) */}
        {isNotifOpen && (
           <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-xl border-b border-gray-200 z-40 animate-fade-in max-h-[50vh] overflow-y-auto">
              <div className="p-3 bg-gray-50 font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                <span>Уведомления ({unreadCount})</span>
                <button onClick={() => setIsNotifOpen(false)}><XIcon className="w-5 h-5 text-gray-500"/></button>
              </div>
              {notifications.map(notif => (
                  <div key={notif.id} className="p-4 border-b border-gray-100">
                      <div className="text-sm font-bold text-gray-900">{notif.title}</div>
                      <p className="text-sm text-gray-600 mt-1">{notif.text}</p>
                      <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                  </div>
              ))}
           </div>
        )}

        {/* Mobile Slide-down Menu (Secondary links) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 shadow-lg absolute w-full">
            <div className="space-y-1">
              {!isAuthenticated && (
                <button onClick={() => {openAuthModal(); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-bold text-primary-600 hover:bg-gray-50 rounded-md">
                   Войти / Регистрация
                </button>
              )}
              <button onClick={() => {onNavigate(Page.ABOUT); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">О платформе</button>
              <button onClick={() => {onNavigate(Page.SAFETY); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Безопасность</button>
              <button onClick={() => {onNavigate(Page.CONTACTS); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Контакты</button>
              {isAuthenticated && (
                 <button onClick={() => {onNavigate(Page.PROFILE); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Мой профиль</button>
              )}
              {user?.role === 'admin' && (
                 <button onClick={() => {onNavigate(Page.ADMIN); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-bold text-purple-600 hover:bg-purple-50 rounded-md">Панель администратора</button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-20 md:pb-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Mirnito.Ru</h3>
            <p className="text-gray-400 text-sm">Ваша локальная доска объявлений в ЖК Томилино Парк. Всё для комфортной жизни в нашем районе.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate(Page.ABOUT)} className="hover:text-white">О платформе</button></li>
              <li><button onClick={() => onNavigate(Page.SAFETY)} className="hover:text-white">Безопасность</button></li>
              <li><button onClick={() => onNavigate(Page.TERMS)} className="hover:text-white">Условия использования</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Помощь</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate(Page.POST_AD)} className="hover:text-white">Как разместить объявление</button></li>
              <li><button onClick={() => onNavigate(Page.BROWSE)} className="hover:text-white">Поиск по улицам</button></li>
              <li><button onClick={() => onNavigate(Page.CONTACTS)} className="hover:text-white">Служба поддержки</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@mirnito.ru</li>
              <li>Люберцы, ЖК Томилино Парк</li>
              <li className="flex space-x-4 mt-4">
                <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">VK</span>
                <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">TG</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mirnito.Ru. Все права защищены.
        </div>
      </footer>

      {/* Mobile Bottom Sticky Nav */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 md:hidden z-40 flex justify-between items-center px-2 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate(Page.HOME)} className={mobileNavLinkClass(Page.HOME)}>
          <Home className="w-6 h-6 mb-1" />
          <span>Главная</span>
        </button>
        <button onClick={() => onNavigate(Page.BROWSE)} className={mobileNavLinkClass(Page.BROWSE)}>
          <Search className="w-6 h-6 mb-1" />
          <span>Поиск</span>
        </button>
        
        {/* Raised Post Button */}
        <button onClick={() => onNavigate(Page.POST_AD)} className="flex flex-col items-center justify-center w-full -mt-6">
          <div className="bg-primary-600 rounded-full p-3 shadow-lg text-white hover:scale-105 transition transform active:scale-95">
            <PlusCircle className="w-7 h-7" />
          </div>
          <span className="text-xs font-medium text-primary-600 mt-1">Подать</span>
        </button>
        
        <button onClick={() => onNavigate(Page.SAFETY)} className={mobileNavLinkClass(Page.SAFETY)}>
          <Shield className="w-6 h-6 mb-1" />
          <span>Защита</span>
        </button>
        
        {/* Profile/Auth Button */}
        <button onClick={handleProfileClick} className={mobileNavLinkClass(Page.PROFILE)}>
          {isAuthenticated ? (
             <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold mb-1 border border-primary-200">
               {user?.name[0]}
             </div>
          ) : (
            <User className="w-6 h-6 mb-1" />
          )}
          <span>{isAuthenticated ? 'Профиль' : 'Войти'}</span>
        </button>
      </div>
    </div>
  );
};