import React, { useState } from 'react';
import { MOCK_ADS } from '../data/mockAds';
import { Ad, Page, Review } from '../types';
import { Star, MapPin, ShieldCheck, Phone, MessageCircle, Calendar, UserCheck } from 'lucide-react';

interface SellerProfileProps {
  sellerName: string; // In a real app, this would be sellerId
  onAdClick: (ad: Ad) => void;
  onNavigate: (page: string) => void;
}

// Mock reviews for the seller
const SELLER_REVIEWS: Review[] = [
  { id: '101', author: 'Виктория', role: 'Соседка', district: 'Крымская 12', rating: 5, text: 'Очень приятная девушка, коляска в идеальном состоянии, как и было заявлено.', avatar: 'https://i.pravatar.cc/150?u=1', date: '2 дня назад' },
  { id: '102', author: 'Михаил', role: 'Покупатель', district: 'Свободы 4', rating: 5, text: 'Договорились быстро, встретились у подъезда. Рекомендую!', avatar: 'https://i.pravatar.cc/150?u=2', date: '1 неделю назад' },
  { id: '103', author: 'Елена', role: 'Житель', district: 'Мира', rating: 4, text: 'Все хорошо, спасибо.', avatar: 'https://i.pravatar.cc/150?u=3', date: '1 месяц назад' },
];

export const SellerProfilePage: React.FC<SellerProfileProps> = ({ sellerName, onAdClick, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'reviews'>('ads');

  // Filter ads by this seller name (mocking ID lookup)
  const sellerAds = MOCK_ADS.filter(ad => ad.author === sellerName);

  // Derive stats
  const totalReviews = 14;
  const averageRating = 4.9;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Seller Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-100 to-blue-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-4xl shadow-inner">
              {sellerName[0]}
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-4 border-white" title="Online">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{sellerName}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center text-yellow-500 font-bold">
                 <span className="text-xl mr-1">{averageRating}</span>
                 <div className="flex">
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                 </div>
                 <span className="text-gray-400 ml-1 font-normal">({totalReviews} отзывов)</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                На сайте с октября 2023
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                ЖК Томилино Парк
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
               <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center border border-blue-100">
                 <ShieldCheck className="w-3 h-3 mr-1" /> Документы проверены
               </span>
               <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center border border-blue-100">
                 <Phone className="w-3 h-3 mr-1" /> Телефон подтвержден
               </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[200px]">
            <button 
              onClick={() => onNavigate(Page.CHAT)}
              className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-200 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Написать
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">
              Подписаться
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button 
          onClick={() => setActiveTab('ads')}
          className={`pb-4 text-lg font-medium transition-colors relative ${activeTab === 'ads' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Активные объявления
          <span className="ml-2 text-gray-400 text-sm">{sellerAds.length}</span>
          {activeTab === 'ads' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 text-lg font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Отзывы
          <span className="ml-2 text-gray-400 text-sm">{totalReviews}</span>
          {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></span>}
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'ads' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellerAds.map((ad) => (
            <div 
              key={ad.id} 
              onClick={() => onAdClick(ad)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-gray-100 cursor-pointer group"
            >
              <div className="h-48 overflow-hidden bg-gray-200 relative">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs font-medium">
                  {ad.price} {ad.currency}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{ad.title}</h3>
                <div className="text-xs text-gray-500">{ad.category} • {ad.date}</div>
              </div>
            </div>
          ))}
          {sellerAds.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              У продавца нет активных объявлений.
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-3xl space-y-6">
          {SELLER_REVIEWS.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center">
                    <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                       <div className="font-bold text-gray-900">{review.author}</div>
                       <div className="text-xs text-gray-500">{review.date} • {review.district}</div>
                    </div>
                 </div>
                 <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                 </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};