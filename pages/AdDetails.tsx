import React from 'react';
import { Ad, Page } from '../types';
import { MapPin, Calendar, ArrowLeft, Phone, MessageCircle, Shield, Heart, Share2, Star, ShieldCheck, ChevronRight, Flag, Map, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AdDetailsProps {
  ad: Ad;
  onBack: () => void;
  onAdClick: (ad: Ad) => void;
  onSellerClick?: (name: string) => void;
}

export const AdDetailsPage: React.FC<AdDetailsProps> = ({ ad, onBack, onAdClick, onSellerClick }) => {
  const { ads, favorites, toggleFavorite, createChat } = useData();
  const isFavorite = favorites.has(ad.id);
  
  // Find similar ads (same category, excluding current)
  const similarAds = ads.filter(
    item => item.category === ad.category && item.id !== ad.id
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ad.title,
        text: `Посмотри это объявление на Mirnito.Ru: ${ad.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  const handleStartChat = () => {
    createChat(ad.id, ad.author);
    window.location.hash = Page.CHAT;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <button onClick={() => window.location.hash = Page.HOME} className="hover:text-primary-600 transition-colors">Главная</button>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
        <button onClick={() => window.location.hash = Page.BROWSE} className="hover:text-primary-600 transition-colors">Объявления</button>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
        <span className="text-gray-900 font-medium truncate">{ad.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 relative">
        
        {/* Left Column: Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Image Gallery Container */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden relative group h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Blurred Background for vertical images */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-50 scale-110"
              style={{ backgroundImage: `url(${ad.image})` }}
            ></div>
            
            {/* Main Image */}
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="relative max-w-full max-h-full object-contain z-10 shadow-sm" 
            />

            {/* Controls */}
            <div className="absolute top-4 right-4 z-20 flex space-x-2">
               <button onClick={handleShare} className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition text-gray-600">
                   <Share2 className="w-5 h-5" />
               </button>
               <button 
                 onClick={(e) => {
                     e.stopPropagation();
                     toggleFavorite(ad.id);
                 }}
                 className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition text-gray-500 hover:text-red-500"
               >
                 <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
               </button>
            </div>
          </div>
          
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
             <div className="flex items-center gap-4">
                <span>Опубликовано {ad.date}</span>
                <span>ID: {ad.id}12345</span>
             </div>
             <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> 142 просмотра
             </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
            <div className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">
              {ad.description}
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Расположение</h2>
             <div className="bg-gray-100 rounded-xl h-64 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200">
                {/* Abstract Map Background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="z-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                  <div className="bg-primary-600 p-2 rounded-full text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{ad.location}</div>
                    <div className="text-xs text-gray-500">ЖК Томилино Парк</div>
                  </div>
                </div>
                <button className="mt-6 z-10 text-primary-600 font-bold hover:underline text-sm flex items-center">
                  <Map className="w-4 h-4 mr-2" /> Показать на большой карте
                </button>
             </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar (4 cols) */}
        <div className="lg:col-span-4">
           <div className="sticky top-24 space-y-4">
             
             {/* Price Card */}
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
               <div className="mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{ad.title}</h1>
                  <p className="text-3xl font-bold text-gray-900">{ad.price} {ad.currency}</p>
                  {ad.goodPrice && (
                    <div className="mt-2 inline-flex items-center bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-md font-bold">
                      <ArrowLeft className="w-3 h-3 mr-1 rotate-90" /> Рыночная цена
                    </div>
                  )}
               </div>

               <button className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-200 mb-3 flex items-center justify-center text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Показать телефон
                </button>
                <button 
                  onClick={handleStartChat}
                  className="w-full bg-white border-2 border-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Написать
                </button>
             </div>

             {/* Seller Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div 
                  className="flex items-start mb-4 cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSellerClick && onSellerClick(ad.author)}
                >
                   <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-blue-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-2xl mr-4 flex-shrink-0 shadow-inner">
                     {ad.author[0]}
                   </div>
                   <div>
                     <div className="font-bold text-gray-900 text-lg hover:underline">{ad.author}</div>
                     <div className="text-sm text-gray-500">Частное лицо</div>
                     {ad.rating && (
                         <div className="flex items-center text-sm mt-1">
                           <span className="font-bold text-gray-900 mr-1">{ad.rating}</span>
                           <div className="flex text-yellow-400">
                             <Star className="w-3 h-3 fill-current" />
                             <Star className="w-3 h-3 fill-current" />
                             <Star className="w-3 h-3 fill-current" />
                             <Star className="w-3 h-3 fill-current" />
                             <Star className="w-3 h-3 fill-current" />
                           </div>
                           <span className="text-gray-400 ml-1">({ad.reviewCount})</span>
                         </div>
                     )}
                   </div>
                </div>

                {ad.sellerBadges && ad.sellerBadges.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      {ad.sellerBadges.map((badge, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <ShieldCheck className="w-4 h-4 text-green-500 mr-2" /> {badge}
                        </div>
                      ))}
                    </div>
                )}
             </div>

             {/* Safety & Report */}
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm">
                <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors w-full p-2 rounded-lg hover:bg-red-50">
                   <Flag className="w-4 h-4 mr-3" />
                   Пожаловаться на объявление
                </button>
             </div>

           </div>
        </div>
      </div>

      {/* Similar Ads */}
      {similarAds.length > 0 && (
        <div className="border-t border-gray-200 pt-12">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-900">Похожие объявления рядом</h2>
             <button onClick={() => window.location.hash = Page.BROWSE} className="text-primary-600 font-medium hover:underline">Смотреть все</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarAds.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onAdClick(item)}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer group"
              >
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs font-medium">
                    {item.price} {item.currency}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-auto">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};