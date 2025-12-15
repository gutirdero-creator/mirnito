import React, { useState } from 'react';
import { generateAdDescription } from '../services/geminiService';
import { Sparkles, Camera, MapPin, Loader2, X, Zap, Crown, Rocket } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Ad, Page } from '../types';

interface PostAdProps {
  onNavigate?: (page: string) => void;
}

export const PostAdPage: React.FC<PostAdProps> = ({ onNavigate }) => {
  const { addAd } = useData();
  const { user, openAuthModal } = useAuth();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [promotionPlan, setPromotionPlan] = useState<'free' | 'turbo' | 'vip'>('free');

  const handleGenerateDescription = async () => {
    if (!title || !category) {
      alert('Пожалуйста, укажите название и категорию перед генерацией.');
      return;
    }
    
    setIsGenerating(true);
    const generated = await generateAdDescription(title, category, title); 
    setDescription(generated);
    setIsGenerating(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
        openAuthModal();
        return;
    }

    if (!title || !price || !category) {
        alert("Заполните обязательные поля");
        return;
    }

    const newAd: Ad = {
        id: Date.now().toString(),
        title,
        price: parseInt(price),
        currency: '₽',
        description: description || 'Нет описания',
        location: 'ул. Крымская, 12 (по умолчанию)',
        category,
        image: images[0] || 'https://picsum.photos/400/300?random=99',
        date: 'Только что',
        author: user.name,
        authorId: user.id,
        status: 'active',
        isPromoted: promotionPlan !== 'free',
        isVip: promotionPlan === 'vip'
    };

    addAd(newAd);
    if (onNavigate) onNavigate(Page.HOME);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Разместить объявление</h1>
      <p className="text-gray-600 mb-8">Заполните форму, и соседи увидят ваше предложение.</p>

      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Main Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название объявления</label>
              <input 
                type="text" 
                required
                className="w-full border-gray-300 border rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Например, Велосипед детский"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <select 
                  required
                  className="w-full border-gray-300 border rounded-lg p-3 bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Выберите категорию</option>
                  <option value="Услуги">Услуги</option>
                  <option value="Стройматериалы">Стройматериалы</option>
                  <option value="Мебель">Мебель</option>
                  <option value="Аренда">Аренда</option>
                  <option value="Техника">Техника</option>
                  <option value="Детям">Детям</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽)</label>
                <input 
                  type="number"
                  required
                  className="w-full border-gray-300 border rounded-lg p-3"
                  placeholder="0"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Описание</label>
                <button 
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="text-xs flex items-center text-purple-600 hover:text-purple-700 font-medium bg-purple-50 px-2 py-1 rounded transition-colors"
                >
                  {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                  {isGenerating ? 'Пишу...' : 'Написать с AI'}
                </button>
              </div>
              <textarea 
                rows={5} 
                className="w-full border-gray-300 border rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Опишите товар или услугу..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Улица</label>
               <div className="relative">
                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                 <select className="w-full border-gray-300 border rounded-lg p-3 pl-10 bg-white">
                   <option>Выберите улицу</option>
                   <option>ул. Крымская</option>
                   <option>ул. Свободы</option>
                   <option>ул. Мира</option>
                   <option>Другая</option>
                 </select>
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Фотографии</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((src, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                     <img src={src} alt="Preview" className="w-full h-full object-cover" />
                     <button 
                       type="button"
                       onClick={() => removeImage(index)}
                       className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                     >
                       <X className="w-4 h-4" />
                     </button>
                  </div>
                ))}
                
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition">
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Добавить<br/>фото</span>
                    <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
            </div>
          </div>

          {/* Promotion Selection */}
          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ускорить продажу 🚀</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Free */}
              <div 
                onClick={() => setPromotionPlan('free')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${promotionPlan === 'free' ? 'border-gray-500 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900">Обычное</span>
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                      {promotionPlan === 'free' && <div className="w-3 h-3 rounded-full bg-gray-600"></div>}
                    </div>
                 </div>
                 <p className="text-sm text-gray-500 mb-2">Стандартное размещение на 30 дней.</p>
                 <div className="font-bold text-lg">0 ₽</div>
              </div>

              {/* Turbo */}
              <div 
                onClick={() => setPromotionPlan('turbo')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${promotionPlan === 'turbo' ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-primary-200'}`}
              >
                 <div className="absolute -top-3 left-4 bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">ХИТ</div>
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 flex items-center"><Rocket className="w-4 h-4 mr-1 text-primary-600"/> Турбо</span>
                    <div className="w-5 h-5 rounded-full border border-primary-400 flex items-center justify-center">
                      {promotionPlan === 'turbo' && <div className="w-3 h-3 rounded-full bg-primary-600"></div>}
                    </div>
                 </div>
                 <p className="text-sm text-gray-500 mb-2">Выделение цветом + поднятие в ленте 3 раза.</p>
                 <div className="font-bold text-lg text-primary-700">199 ₽</div>
              </div>

              {/* VIP */}
              <div 
                onClick={() => setPromotionPlan('vip')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${promotionPlan === 'vip' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 hover:border-yellow-200'}`}
              >
                 <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="font-bold text-gray-900 flex items-center"><Crown className="w-4 h-4 mr-1 text-yellow-600"/> Premium</span>
                    <div className="w-5 h-5 rounded-full border border-yellow-500 flex items-center justify-center">
                      {promotionPlan === 'vip' && <div className="w-3 h-3 rounded-full bg-yellow-500"></div>}
                    </div>
                 </div>
                 <p className="text-sm text-gray-600 mb-2 relative z-10">Закрепление в VIP блоке на 7 дней + всё из Турбо.</p>
                 <div className="font-bold text-lg text-yellow-700 relative z-10">499 ₽</div>
                 
                 {/* Shine effect */}
                 <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full blur-2xl opacity-50 -mr-6 -mt-6"></div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className={`w-full text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform active:scale-95 ${
              promotionPlan === 'vip' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-primary-600 hover:bg-primary-700'
            }`}>
              {promotionPlan === 'free' ? 'Опубликовать бесплатно' : `Оплатить и разместить (${promotionPlan === 'turbo' ? '199' : '499'} ₽)`}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
                {!user ? 'Требуется авторизация' : 'Ваше объявление сразу появится в ленте'}
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};