import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, ArrowLeft, Check, CheckCheck, MessageCircle } from 'lucide-react';
import { Chat } from '../types';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const ChatPage: React.FC = () => {
  const { chats, messages, sendMessage } = useData();
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chats.length > 0 ? chats[0].id : null);
  const [inputText, setInputText] = useState('');

  const activeChat = chats.find(c => c.id === selectedChatId);
  const activeMessages = selectedChatId ? (messages[selectedChatId] || []) : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChatId) return;

    sendMessage(selectedChatId, inputText);
    setInputText('');
  };

  if (!user) {
     return (
        <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Пожалуйста, войдите, чтобы видеть сообщения.</p>
        </div>
     );
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-80px)] md:h-[600px] md:mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex animate-fade-in">
      
      {/* Sidebar List */}
      <div className={`w-full md:w-80 flex-shrink-0 border-r border-gray-200 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200">
           <h2 className="text-xl font-bold text-gray-900 mb-4">Сообщения</h2>
           <div className="relative">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
             <input type="text" placeholder="Поиск..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
           </div>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50 ${selectedChatId === chat.id ? 'bg-primary-50 hover:bg-primary-50' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <img src={chat.userAvatar} alt={chat.userName} className="w-12 h-12 rounded-full object-cover" />
                {chat.unreadCount > 0 && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className="font-bold text-gray-900 truncate">{chat.userName}</h3>
                   <span className="text-xs text-gray-400 whitespace-nowrap">{chat.time}</span>
                </div>
                <p className="text-xs text-primary-600 font-medium truncate mb-0.5">{chat.adTitle}</p>
                <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
          {chats.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">
                  У вас пока нет чатов. Напишите продавцу!
              </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-grow flex flex-col ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        {activeChat ? (
          <>
            {/* Header */}
            <div className="h-16 border-b border-gray-200 flex justify-between items-center px-4 bg-white">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedChatId(null)}
                  className="md:hidden mr-2 p-1 text-gray-500"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <img src={activeChat.userAvatar} className="w-10 h-10 rounded-full mr-3" alt={activeChat.userName} />
                <div>
                  <h3 className="font-bold text-gray-900">{activeChat.userName}</h3>
                  <div className="text-xs text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Онлайн
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-gray-500">
                 <button className="p-2 hover:bg-gray-100 rounded-full"><Phone className="w-5 h-5" /></button>
                 <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Ad Context Banner */}
            <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-3">
               <div className="w-10 h-10 bg-white rounded border border-gray-200 flex-shrink-0">
                 <img src={`https://picsum.photos/seed/${activeChat.id}/50/50`} className="w-full h-full object-cover rounded" alt="Ad" />
               </div>
               <div className="flex-grow min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{activeChat.adTitle}</div>
                  <div className="text-xs text-gray-500">Подробнее о товаре</div>
               </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white flex flex-col">
               {activeMessages.map(msg => (
                 <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${msg.sender === 'me' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-900 rounded-tl-none'}`}>
                       <p className="text-sm">{msg.text}</p>
                       <div className={`text-[10px] mt-1 flex items-center justify-end ${msg.sender === 'me' ? 'text-primary-100' : 'text-gray-400'}`}>
                         {msg.time}
                         {msg.sender === 'me' && (
                           <span className="ml-1">
                             {msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                           </span>
                         )}
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
               <div className="flex items-center gap-2">
                 <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                    <span className="text-xl">+</span>
                 </button>
                 <input 
                   type="text" 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   placeholder="Напишите сообщение..." 
                   className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-full p-3 focus:ring-primary-500 focus:border-primary-500 outline-none"
                 />
                 <button 
                   type="submit" 
                   disabled={!inputText.trim()}
                   className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                 >
                    <Send className="w-5 h-5 ml-0.5" />
                 </button>
               </div>
            </form>

          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-400 flex-col">
            <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
            <p>Выберите чат для начала общения</p>
          </div>
        )}
      </div>

    </div>
  );
};