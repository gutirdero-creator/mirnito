import React, { useState, useEffect } from 'react';
import { Page, Review, Ad, Story, Event } from '../types';
import { Search, MapPin, Briefcase, Sofa, Car, Wrench, User, Star, ArrowRight, Heart, Zap, Clock, Calendar, Users, PenTool, Scissors, Truck } from 'lucide-react';
import { MOCK_STORIES, MOCK_EVENTS } from '../data/mockAds';
import { useData } from '../context/DataContext';

interface HomeProps {
  onNavigate: (page: string) => void;
  onAdClick?: (ad: Ad) => void;
}

const BANNERS = [
  { id: 1, title: 'Скидка 20% в кофейне "У Дома"', subtitle: 'Для жителей по промокоду "СОСЕД"', color: 'from-orange-400 to-red-500', btn: 'Получить код' },
  { id: 2, title: 'Открытие фитнес-клуба', subtitle: 'Первое занятие бесплатно для ЖК Томилино', color: 'from-blue-500 to-indigo-600', btn: 'Записаться' },
  { id: 3, title: 'Субботник 25 октября', subtitle: 'Делаем наш двор чище вместе. Инвентарь выдадим.', color: 'from-green-500 to-emerald-600', btn: 'Участвовать' },
];

export const HomePage: React.FC<HomeProps> = ({ onNavigate, onAdClick }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { ads, favorites, toggleFavorite } = useData();
  
  // Filter only active ads for display
  const activeAds = ads.filter(ad => ad.status !== 'archived' && ad.status !== 'banned');
  
  const vipAds = activeAds.filter(ad => ad.isVip);
  const promotedAds = activeAds.filter(ad => ad.isPromoted && !ad.isVip);
  const freshAds = activeAds.filter(ad => !ad.isVip && !ad.isPromoted).slice(0, 8);

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const AdCard = ({ ad, isVip = false }: { ad: Ad, isVip?: boolean }) => {
    const isFavorite = favorites.has(ad.id);
    return (
      <div 
        onClick={() => onAdClick && onAdClick(ad)}
        className={`bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border flex flex-col h-full cursor-pointer transform hover:-translate-y-1 group relative flex-shrink-0 w-64 md:w-auto ${
          isVip ? 'border-yellow-400 shadow-md ring-1 ring-yellow-200' : 'border-gray-100 shadow-sm'
        }`}
      >
        <div className="h-40 overflow-hidden bg-gray-200 relative">
          <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            {isVip && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center"><Zap className="w-3 h-3 mr-1"/> VIP</span>}
            {ad.isUrgent && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center"><Clock className="w-3 h-3 mr-1"/> Срочно</span>}
          </div>

          <button 
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(ad.id);
            }}
            className="absolute top-2 left-2 p-1.5 bg-white/50 hover:bg-white rounded-full transition-colors text-white hover:text-red-500"
          >
             <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
          </button>
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1 line-clamp-2">{ad.title}</h3>
          <p className="text-lg font-bold text-primary-600 mb-1">{ad.price} {ad.currency}</p>
          <div className="mt-auto flex items-center text-xs text-gray-400">
            <span className="truncate">{ad.date}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-gray-50 pb-20">
      
      {/* 1. Stories Section */}
      <section className="bg-white pt-4 pb-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex space-x-4 min-w-max">
          {/* Add Story Button */}
          <div className="flex flex-col items-center cursor-pointer group">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 p-0.5 mb-1 group-hover:border-primary-500 transition relative">
               <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                 <span className="text-2xl">+</span>
               </div>
               <div className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-1 border-2 border-white">
                 <Users className="w-2 h-2 text-white" />
               </div>
            </div>
            <span className="text-xs text-gray-600 truncate max-w-[70px]">Ваша история</span>
          </div>

          {MOCK_STORIES.map(story => (
            <div key={story.id} className="flex flex-col items-center cursor-pointer">
              <div className={`w-16 h-16 rounded-full p-0.5 mb-1 ${story.viewed ? 'border border-gray-300' : 'bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]'}`}>
                 <img src={story.image} className="w-full h-full object-cover rounded-full border-2 border-white" alt="Story" />
              </div>
              <span className="text-xs text-gray-600 truncate max-w-[70px]">{story.user}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Hero Banners (Carousel) */}
      <section className="max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
           {BANNERS.map((banner, idx) => (
             <div 
               key={banner.id}
               className={`absolute inset-0 bg-gradient-to-r ${banner.color} transition-opacity duration-700 flex items-center px-8 md:px-16 ${idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             >
                <div className="text-white max-w-xl animate-fade-in-up">
                   <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                   <p className="text-white/90 text-sm md:text-lg mb-6">{banner.subtitle}</p>
                   <button className="bg-white text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition shadow-md text-sm md:text-base">
                     {banner.btn}
                   </button>
                </div>
                {/* Decorative circles */}
                <div className="absolute right-[-50px] top-[-50px] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
             </div>
           ))}
           {/* Dots */}
           <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-2 z-20">
             {BANNERS.map((_, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setCurrentBanner(idx)}
                 className={`w-2 h-2 rounded-full transition-all ${idx === currentBanner ? 'bg-white w-6' : 'bg-white/50'}`}
               />
             ))}
           </div>
        </div>
        
        {/* Neighbors Online Counter */}
        <div className="flex justify-between items-center mt-3 px-2 text-xs text-gray-500">
           <div className="flex items-center">
             <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
             543 соседа сейчас онлайн
           </div>
           <div className="flex items-center text-primary-600 font-medium cursor-pointer hover:underline">
             Погода в ЖК: +18°C ☀️
           </div>
        </div>
      </section>

      {/* 2.5 Quick Service Access - NEW */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
         <h2 className="text-xl font-bold text-gray-900 mb-4">Найти мастера</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition">
               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Wrench className="w-5 h-5"/></div>
               <span className="font-medium">Сантехники</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition">
               <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><Scissors className="w-5 h-5"/></div>
               <span className="font-medium">Красота</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition">
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Truck className="w-5 h-5"/></div>
               <span className="font-medium">Переезды</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition">
               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><PenTool className="w-5 h-5"/></div>
               <span className="font-medium">Ремонт</span>
            </div>
         </div>
      </section>

      {/* 3. VIP / Promoted Section (Horizontal Scroll) */}
      {vipAds.length > 0 && (
        <section className="py-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-y border-yellow-100">
          <div className="max-w-7xl mx-auto px-4">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold text-gray-900 flex items-center">
                 <Zap className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" /> 
                 VIP Объявления
               </h2>
               <button onClick={() => onNavigate(Page.BROWSE)} className="text-sm text-yellow-700 font-medium hover:underline">Все VIP</button>
             </div>
             
             <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
               {vipAds.map(ad => (
                 <div key={ad.id} className="snap-center">
                   <AdCard ad={ad} isVip={true} />
                 </div>
               ))}
               {promotedAds.map(ad => (
                 <div key={ad.id} className="snap-center">
                   <AdCard ad={ad} isVip={true} />
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* 4. Visual Categories (Grid) */}
      <section className="py-8 max-w-7xl mx-auto px-4 w-full">
         <h2 className="text-xl font-bold text-gray-900 mb-4">Категории товаров</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Услуги', img: 'https://images.unsplash.com/photo-1581578731117-10d52143b0e8?auto=format&fit=crop&w=200&h=200', count: 124 },
              { name: 'Детям', img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&h=200', count: 85 },
              { name: 'Мебель', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&h=200', count: 203 },
              { name: 'Техника', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&h=200', count: 56 },
            ].map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => onNavigate(Page.BROWSE)}
                className="relative h-24 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition"
              >
                <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={cat.name} />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
                   <span className="text-white font-bold">{cat.name}</span>
                   <span className="text-white/80 text-xs">{cat.count} объявлений</span>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* 5. In-feed Advertising Banner */}
      <section className="max-w-7xl mx-auto px-4 my-4">
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
           <div className="z-10">
              <h3 className="text-xl font-bold mb-2">Реклама вашего бизнеса здесь</h3>
              <p className="text-gray-300 text-sm mb-4">Ваши соседи увидят это объявление первыми.</p>
              <button className="bg-white text-gray-900 text-sm font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition">
                Разместить рекламу
              </button>
           </div>
           <div className="mt-4 md:mt-0 z-10">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                 <Briefcase className="w-8 h-8 text-white" />
              </div>
           </div>
           {/* Abstract bg */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>

      {/* 6. Fresh Ads Feed */}
      <section className="py-6 max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-6">
             <h2 className="text-xl font-bold text-gray-900">Свежее в ленте</h2>
             <button onClick={() => onNavigate(Page.BROWSE)} className="text-primary-600 font-medium hover:text-primary-700 flex items-center text-sm">
               Смотреть все <ArrowRight className="w-4 h-4 ml-1" />
             </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {freshAds.map((ad) => (
              <div key={ad.id} className="h-full">
                <AdCard ad={ad} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
             <button onClick={() => onNavigate(Page.BROWSE)} className="bg-white border border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-full hover:bg-gray-50 transition w-full md:w-auto shadow-sm">
               Показать еще объявления
             </button>
          </div>
      </section>

      {/* 7. Community Events */}
      <section className="py-12 bg-white mt-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Жизнь района</h2>
           <div className="grid md:grid-cols-2 gap-6">
             {MOCK_EVENTS.map(evt => (
               <div key={evt.id} className="flex bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition cursor-pointer">
                  <div className="w-1/3 bg-gray-200">
                    <img src={evt.image} className="w-full h-full object-cover" alt={evt.title} />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                     <span className="text-primary-600 font-bold text-xs uppercase tracking-wide mb-1">{evt.date}</span>
                     <h3 className="font-bold text-gray-900 mb-1">{evt.title}</h3>
                     <p className="text-gray-500 text-sm flex items-center">
                       <MapPin className="w-3 h-3 mr-1" /> {evt.location}
                     </p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 8. SEO / Bottom Text */}
      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
           <p className="text-gray-400 text-sm">
             Mirnito.Ru — это главная доска объявлений ЖК Томилино Парк. 
             Здесь вы можете купить и продать вещи, найти мастеров по ремонту, 
             арендовать жилье или паркинг без посредников. Присоединяйтесь к сообществу соседей!
           </p>
        </div>
      </section>
    </div>
  );
};