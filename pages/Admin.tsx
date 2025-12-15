import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  MoreVertical, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Page } from '../types';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { ads, users, updateAdStatus, deleteAd } = useData();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'ads'>('dashboard');

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Доступ запрещен</h1>
          <p className="text-gray-600 mb-6">У вас нет прав администратора.</p>
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Всего пользователей</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{users.length}</h3>
            </div>
            <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-medium">+12%</span>
            <span className="text-gray-400 ml-1">за месяц</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Активных объявлений</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{ads.filter(a => a.status === 'active').length}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-medium">+5%</span>
            <span className="text-gray-400 ml-1">за неделю</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Ожидают модерации</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{ads.filter(a => a.status === 'pending').length}</h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Требуют внимания
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Жалобы</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-red-600 font-medium cursor-pointer hover:underline">
            Перейти к разбору
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Ads Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Последние объявления</h3>
            <button 
              onClick={() => setActiveTab('ads')} 
              className="text-primary-600 text-sm font-medium hover:underline flex items-center"
            >
              Все объявления <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-medium">Название</th>
                  <th className="pb-3 font-medium">Категория</th>
                  <th className="pb-3 font-medium">Автор</th>
                  <th className="pb-3 font-medium">Цена</th>
                  <th className="pb-3 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ads.slice(0, 5).map(ad => (
                  <tr key={ad.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 pr-4 font-medium text-gray-900">{ad.title}</td>
                    <td className="py-3 px-2 text-gray-500">{ad.category}</td>
                    <td className="py-3 px-2 text-gray-900">{ad.author}</td>
                    <td className="py-3 px-2 font-bold text-gray-900">{ad.price} {ad.currency}</td>
                    <td className="py-3 pl-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        ad.status === 'active' ? 'bg-green-100 text-green-700' : 
                        ad.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {ad.status === 'active' ? 'Активно' : ad.status === 'pending' ? 'Модерация' : 'Архив'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Управление пользователями</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Поиск по email или имени..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Пользователь</th>
              <th className="px-6 py-4">Роль</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4">Телефон</th>
              <th className="px-6 py-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold overflow-hidden">
                       {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover"/> : u.name[0]}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-gray-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {u.role === 'admin' ? 'Администратор' : 'Житель'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {u.isVerified ? (
                    <span className="inline-flex items-center text-green-600">
                      <ShieldCheck className="w-4 h-4 mr-1" /> Верифицирован
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-gray-400">
                      Не подтвержден
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">{u.phone}</td>
                <td className="px-6 py-4 text-right">
                   <button className="text-gray-400 hover:text-gray-600">
                     <MoreVertical className="w-5 h-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAds = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Управление объявлениями</h2>
        <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Все</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg">На модерации</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Объявление</th>
              <th className="px-6 py-4">Категория</th>
              <th className="px-6 py-4">Цена</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {ads.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-lg object-cover bg-gray-200" src={ad.image} alt="" />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{ad.title}</div>
                      <div className="text-xs text-gray-500">ID: {ad.id} • {ad.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{ad.category}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{ad.price} {ad.currency}</td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        ad.status === 'active' ? 'bg-green-100 text-green-700' : 
                        ad.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {ad.status === 'active' ? 'Активно' : ad.status === 'pending' ? 'Модерация' : 'Архив'}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => updateAdStatus(ad.id, 'active')}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-md" 
                        title="Одобрить"
                      >
                         <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteAd(ad.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md" 
                        title="Удалить"
                      >
                         <XCircle className="w-5 h-5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden lg:flex flex-col z-20">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary-600 flex items-center">
             Mirnito<span className="text-gray-900">.Admin</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Панель управления</p>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Дашборд
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'users' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Пользователи
          </button>
          
          <button 
            onClick={() => setActiveTab('ads')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'ads' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Объявления
          </button>

          <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
            <FileText className="w-5 h-5 mr-3" />
            Контент
          </button>
          
          <div className="pt-4 mt-4 border-t border-gray-100">
             <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
               <Settings className="w-5 h-5 mr-3" />
               Настройки
             </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
           <button 
             onClick={() => onNavigate(Page.HOME)}
             className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
           >
             <LogOut className="w-5 h-5 mr-3" />
             Вернуться на сайт
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 p-6 lg:p-10">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-bold text-gray-900">
             {activeTab === 'dashboard' && 'Обзор системы'}
             {activeTab === 'users' && 'Пользователи'}
             {activeTab === 'ads' && 'Все объявления'}
           </h1>
           <div className="flex items-center space-x-4">
             <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Система стабильна</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
               A
             </div>
           </div>
        </header>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'ads' && renderAds()}
      </main>
    </div>
  );
};