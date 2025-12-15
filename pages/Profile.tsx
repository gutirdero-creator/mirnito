import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Ad } from '../types';
import { Trash2, Heart, Package, Settings, LogOut, MapPin, Eye } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  onAdClick: (ad: Ad) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onAdClick }) => {
  const { user, logout } = useAuth();
  const { ads, favorites, deleteAd } = useData();
  const [activeTab, setActiveTab] = useState<'my_ads' | 'favorites'>('my_ads');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Вы не авторизованы</h2>
        <p className="text-gray-600 mb-8">Войдите, чтобы видеть свой профиль</p>
      </div>
    );
  }

  // Filter ads
  const myAds = ads.filter(ad => ad.authorId === user.id);
  const favoriteAds = ads.filter(ad => favorites.has(ad.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Личный кабинет</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center mb-6">
            <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-primary-600 mb-4 overflow-hidden">
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name[0]}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.email}</p>
            {user.isVerified && (
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                Подтвержденный профиль
              </span>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setActiveTab('my_ads')}
              className={`w-full flex items-center px-6 py-4 transition-colors ${activeTab === 'my_ads' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Package className="w-5 h-5 mr-3" />
              Мои объявления
              <span className="ml-auto bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full">{myAds.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center px-6 py-4 transition-colors ${activeTab === 'favorites' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Heart className="w-5 h-5 mr-3" />
              Избранное
              <span className="ml-auto bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full">{favoriteAds.length}</span>
            </button>
            <button className="w-full flex items-center px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              Настройки
            </button>
            <div className="border-t border-gray-100 my-1"></div>
            <button 
              onClick={logout}
              className="w-full flex items-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Выйти
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {activeTab === 'my_ads' ? 'Мои объявления' : 'Избранное'}
            </h3>

            {/* My Ads List */}
            {activeTab === 'my_ads' && (
              <div className="space-y-4">
                {myAds.length > 0 ? (
                  myAds.map(ad => (
                    <div key={ad.id} className="flex flex-col sm:flex-row gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-md transition bg-white">
                      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={ad.image} className="w-full h-full object-cover" alt={ad.title} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-lg text-gray-900 mb-1">{ad.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {ad.status === 'active' ? 'Активно' : 'Архив'}
                          </span>
                        </div>
                        <p className="text-xl font-bold text-primary-600 mb-2">{ad.price} {ad.currency}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Eye className="w-4 h-4 mr-1" /> 128 просмотров
                          <span className="mx-2">•</span>
                          <MapPin className="w-4 h-4 mr-1" /> {ad.location}
                        </div>

                        <div className="flex gap-3">
                          <button className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                            Редактировать
                          </button>
                          <button 
                            onClick={() => deleteAd(ad.id)}
                            className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4">У вас пока нет активных объявлений.</p>
                    <button onClick={() => onNavigate('/post-ad')} className="text-primary-600 font-bold hover:underline">
                      Разместить первое объявление
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Favorites List */}
            {activeTab === 'favorites' && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {favoriteAds.length > 0 ? (
                   favoriteAds.map(ad => (
                     <div 
                        key={ad.id}
                        onClick={() => onAdClick(ad)}
                        className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer group"
                     >
                        <div className="h-40 bg-gray-200 overflow-hidden relative">
                           <img src={ad.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={ad.title} />
                           <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                             <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                           </div>
                        </div>
                        <div className="p-4">
                           <h4 className="font-bold text-gray-900 line-clamp-1 mb-1">{ad.title}</h4>
                           <p className="font-bold text-primary-600">{ad.price} {ad.currency}</p>
                           <p className="text-xs text-gray-500 mt-2">{ad.location}</p>
                        </div>
                     </div>
                   ))
                 ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Список избранного пуст.</p>
                      <button onClick={() => onNavigate('/browse')} className="text-primary-600 font-bold hover:underline mt-2">
                        Перейти к поиску
                      </button>
                    </div>
                 )}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};