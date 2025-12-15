import React, { useState } from 'react';
import { Search, MapPin, Heart, LayoutGrid, List, Star, ShieldCheck, Truck, MessageCircle, Phone, ArrowUpDown } from 'lucide-react';
import { Ad } from '../types';
import { useData } from '../context/DataContext';

interface BrowsePageProps {
  onAdClick?: (ad: Ad) => void;
}

const CATEGORIES = ['Все', 'Услуги', 'Стройматериалы', 'Мебель', 'Аренда', 'Техника', 'Детям', 'Спорт'];

export const BrowsePage: React.FC<BrowsePageProps> = ({ onAdClick }) => {
  const { ads, favorites, toggleFavorite } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Все улицы');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortOption, setSortOption] = useState('newest'); // 'newest', 'price_asc', 'price_desc'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Filter ads (only show active)
  const activeAds = ads.filter(ad => ad.status !== 'archived' && ad.status !== 'banned');

  const filteredAds = activeAds.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'Все улицы' || ad.location.includes(selectedLocation);
    const matchesCategory = selectedCategory === 'Все' || ad.category === selectedCategory;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Sort
  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortOption === 'price_asc') {
      return a.price - b.price;
    }
    if (sortOption === 'price_desc') {
      return b.price - a.price;
    }
    // Default 'newest' uses original array order (mock data assumes newest first)
    return 0; 
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Объявления в ЖК Томилино Парк</h1>
        
        {/* Search & Location Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по объявлениям..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative min-w-[200px]">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white cursor-pointer"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>Все улицы</option>
              <option>ул. Крымская</option>
              <option>ул. Свободы</option>
              <option>ул. Мира</option>
              <option>ул. Академика Северина</option>
            </select>
          </div>
        </div>

        {/* Filters and View Toggle Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto order-1 md:order-2 justify-between md:justify-end">
             {/* Sort Dropdown */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <select
                className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary-500 cursor-pointer appearance-none hover:border-gray-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Сначала новые</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                title="Список"
              >
                <List className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                title="Плитка"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={`animate-fade-in ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
        {sortedAds.map((ad) => {
          const isFavorite = favorites.has(ad.id);
          
          // GRID VIEW CARD
          if (viewMode === 'grid') {
            return (
              <div 
                key={ad.id} 
                onClick={() => onAdClick && onAdClick(ad)}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer transform hover:-translate-y-1 group relative"
              >
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                  <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <div className="bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-800">
                      {ad.category}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(ad.id);
                    }}
                    className="absolute top-2 left-2 p-1.5 bg-white/50 hover:bg-white rounded-full transition-colors text-white hover:text-red-500"
                  >
                     <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-primary-600 transition-colors mb-2">{ad.title}</h3>
                  <p className="text-xl font-bold text-gray-900 mb-2">{ad.price} {ad.currency}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ad.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {ad.location}
                    </div>
                    <span>{ad.date}</span>
                  </div>
                </div>
              </div>
            );
          }

          // LIST VIEW CARD (Avito Style)
          return (
            <div 
              key={ad.id} 
              onClick={() => onAdClick && onAdClick(ad)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-4 flex flex-col md:flex-row gap-6 cursor-pointer group"
            >
              {/* Left: Image */}
              <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(ad.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/70 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-red-500"
                  >
                     <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                {ad.delivery && (
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Truck className="w-3 h-3 mr-1" /> Доставка
                  </div>
                )}
              </div>

              {/* Middle: Info */}
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                   <h3 className="text-xl font-medium text-primary-600 group-hover:text-primary-700 hover:underline mb-2 line-clamp-2 leading-snug">
                     {ad.title}
                   </h3>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-gray-900">{ad.price} {ad.currency}</span>
                  {ad.goodPrice && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
                      Цена ниже рыночной
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                  {ad.description}
                </p>

                <div className="text-sm text-gray-400 mt-auto flex flex-col gap-1">
                   <span className="text-gray-500 font-medium">{ad.location}</span>
                   <span>{ad.date}</span>
                </div>
              </div>

              {/* Right: Seller & Actions */}
              <div className="w-full md:w-56 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                     {ad.author[0]}
                   </div>
                   <div>
                     <div className="font-bold text-gray-900 text-sm hover:underline">{ad.author}</div>
                     {ad.rating && (
                       <div className="flex items-center text-xs">
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
                  <div className="mb-4 flex flex-wrap gap-2">
                    {ad.sellerBadges.map((badge, idx) => (
                      <div key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" /> {badge}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto space-y-2">
                   <button 
                     onClick={(e) => e.stopPropagation()}
                     className="w-full bg-primary-600 text-white font-medium py-2 rounded-lg hover:bg-primary-700 transition flex items-center justify-center text-sm"
                   >
                     <Phone className="w-4 h-4 mr-2" /> Показать телефон
                   </button>
                   <button 
                     onClick={(e) => e.stopPropagation()}
                     className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-sm"
                   >
                     <MessageCircle className="w-4 h-4 mr-2" /> Написать
                   </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sortedAds.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg mb-2">По вашему запросу ничего не найдено.</p>
          <button 
            className="mt-6 px-6 py-2 bg-primary-50 text-primary-600 font-medium rounded-lg hover:bg-primary-100 transition-colors"
            onClick={() => {
              setSearchTerm(''); 
              setSelectedLocation('Все улицы');
              setSelectedCategory('Все');
            }}
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
};